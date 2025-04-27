import React, { useState, useEffect } from 'react';
import { saveWorkoutLog } from '../apis/saveWorkoutLog';
import { deleteWorkoutLog } from '../apis/deleteWorkoutLog';
import { updateWorkoutLog } from '../apis/updateWorkoutLog';
import { cardioOptions, weightOptions } from '../constants/exerciseOptions';
import { calculateTotalScore } from '../utils/calculateTotalScore';
import '../styles/WorkoutLogModalContent.css';

const WorkoutLogModalContent = ({ selectedDate, initialLogs = [], onLogSaved }) => {
    const [logs, setLogs] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [editLog, setEditLog] = useState(null);

    const [exerciseType, setExerciseType] = useState('');
    const [exercisePart, setExercisePart] = useState('');
    const [exerciseName, setExerciseName] = useState('');

    const [duration, setDuration] = useState('');
    const [distance, setDistance] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    useEffect(() => {
        setLogs(initialLogs);
    }, [initialLogs]);

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleConfirmDelete = async () => {
        if (!confirmDeleteId) return;

        try {
            await deleteWorkoutLog(confirmDeleteId);
            setLogs(prevLogs => prevLogs.filter(l => l._id !== confirmDeleteId));
            setConfirmDeleteId(null); // 모달 끄기
            if (onLogSaved) onLogSaved(); // 부모 갱신
        } catch (err) {
            console.error('운동 기록 삭제 실패', err);
        }
    };

    const handleSave = async () => {

        if (!exerciseType || !exerciseName) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));

            const logData = {
                userId: user._id,
                name: exerciseName,
                part: exercisePart,
                exerciseType,
                date: selectedDate instanceof Date ? selectedDate.toISOString() : selectedDate,
                duration: duration ? Number(duration) : 0, // ✨ null 대신 0
                distance: distance ? Number(distance) : 0,
                sets: sets ? Number(sets) : 0,
                reps: reps ? Number(reps) : 0,
                weight: weight ? Number(weight) : 0,
            };


            if (editLog) {
                await updateWorkoutLog(editLog._id, logData);
            } else {
                await saveWorkoutLog(logData);
            }

            if (onLogSaved) {
                onLogSaved();
            }

            setLogs(prevLogs => [...prevLogs, logData]);

            setExerciseType('');
            setExercisePart('');
            setExerciseName('');
            setDuration('');
            setDistance('');
            setSets('');
            setReps('');
            setWeight('');
            setIsAdding(false);
        } catch (err) {
            console.error('운동 기록 저장 실패', err);
        }
    };

    const getFieldsForExercise = (exerciseName) => {
        if (["트레드 밀", "걷기", "조깅 및 러닝 머신", "사이클 머신", "로잉 머신"].includes(exerciseName)) {
            return ["duration", "distance"];
        }
        if (exerciseName === "스텝 밀") {
            return ["duration", "reps"];
        }
        if (exerciseName === "줄넘기") {
            return ["duration"];
        }
        if (exerciseName === "버피") {
            return ["sets", "reps"];
        }
        const absExercises = [
            "크런치", "케이블 크런치", "시티드 니업", "플랭크",
            "행잉 레그레이즈", "리버스 크런치", "바이시클 크런치", "러시안 트위스트", "사이드 밴드"
        ];
        if (absExercises.includes(exerciseName)) {
            return ["sets", "reps"];
        }
        return ["sets", "reps", "weight"];
    };

    return (
        <div>
            {logs.length > 0 && (
                <div className="workout-log-total-score">
                    오늘의 운동 점수: <strong>{calculateTotalScore(logs).toFixed(1)}</strong>점
                </div>
            )}

            <ul className="workout-log-list">
                {logs.map((log, index) => {
                    const details = [];

                    if (log.duration > 0) details.push(`${log.duration}분`);
                    if (log.distance > 0) details.push(`${log.distance}km`);
                    if (log.sets > 0) details.push(`${log.sets}세트`);
                    if (log.reps > 0) details.push(`${log.reps}회`);
                    if (log.weight > 0) details.push(`${log.weight}kg`);

                    return (
                        <li key={index} className="workout-log-item">
                            <span className="log-name">{log.name}</span>
                            {details.length > 0 && (
                                <div className="log-details">
                                    {details.join(' | ')}
                                </div>
                            )}

                            <button
                                className="edit-button"
                                onClick={() => {
                                    setEditLog(log);
                                    setExerciseType(log.exerciseType);
                                    setExercisePart(log.part || '');
                                    setExerciseName(log.name);
                                    setDuration(log.duration ?? '');
                                    setDistance(log.distance ?? '');
                                    setSets(log.sets ?? '');
                                    setReps(log.reps ?? '');
                                    setWeight(log.weight ?? '');
                                    setIsAdding(true); // ✨ 폼 열어주기
                                }}
                            >
                                ✏️
                            </button>

                            <button
                                className="delete-button"
                                onClick={() => setConfirmDeleteId(log._id)}
                            >
                                🗑️
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* ✨ 삭제 확인 모달 */}
            {confirmDeleteId && (
                <div className="confirm-modal-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
                        <p>정말 삭제하시겠습니까?</p>
                        <div className="confirm-buttons">
                            <button onClick={() => setConfirmDeleteId(null)}>취소</button>
                            <button onClick={handleConfirmDelete}>삭제</button>
                        </div>
                    </div>
                </div>
            )}

            {isAdding ? (
                <div className="workout-log-form">
                    <select
                        value={exerciseType}
                        onChange={(e) => {
                            setExerciseType(e.target.value);
                            setExercisePart('');
                            setExerciseName('');
                        }}
                    >
                        <option value="">운동 종류 선택</option>
                        <option value="유산소">유산소</option>
                        <option value="웨이트">웨이트</option>
                    </select>

                    {exerciseType === '유산소' && (
                        <select
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        >
                            <option value="">운동 이름 선택</option>
                            {cardioOptions.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                    )}

                    {exerciseType === '웨이트' && (
                        <>
                            <select
                                value={exercisePart}
                                onChange={(e) => {
                                    setExercisePart(e.target.value);
                                    setExerciseName('');
                                }}
                            >
                                <option value="">부위 선택</option>
                                {Object.keys(weightOptions).map((part, idx) => (
                                    <option key={idx} value={part}>{part}</option>
                                ))}
                            </select>

                            {exercisePart && (
                                <select
                                    value={exerciseName}
                                    onChange={(e) => setExerciseName(e.target.value)}
                                >
                                    <option value="">운동 이름 선택</option>
                                    {weightOptions[exercisePart].map((exercise, idx) => (
                                        <option key={idx} value={exercise}>{exercise}</option>
                                    ))}
                                </select>
                            )}
                        </>
                    )}

                    {exerciseName && (
                        <>
                            {getFieldsForExercise(exerciseName).includes("duration") && (
                                <input
                                    type="number"
                                    placeholder="운동 시간 (분)"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    min={1}
                                />
                            )}
                            {getFieldsForExercise(exerciseName).includes("distance") && (
                                <input
                                    type="number"
                                    placeholder="거리 (km)"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                    min={0}
                                    step={0.1}
                                />
                            )}
                            {getFieldsForExercise(exerciseName).includes("sets") && (
                                <input
                                    type="number"
                                    placeholder="세트 수"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                    min={1}
                                />
                            )}
                            {getFieldsForExercise(exerciseName).includes("reps") && (
                                <input
                                    type="number"
                                    placeholder="반복 횟수"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                    min={1}
                                />
                            )}
                            {getFieldsForExercise(exerciseName).includes("weight") && (
                                <input
                                    type="number"
                                    placeholder="중량 (kg)"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    min={0}
                                />
                            )}
                        </>
                    )}

                    <div className="workout-log-form-buttons">
                        <button onClick={() => setIsAdding(false)}>취소</button>
                        <button onClick={handleSave}>저장</button>
                    </div>
                </div>
            ) : (
                <div className="add-button">
                    <button onClick={handleAddClick}>+ 추가</button>
                </div>
            )}
        </div>
    );
};

export default WorkoutLogModalContent;
