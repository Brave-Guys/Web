import React, { useState, useEffect } from 'react';
import { saveWorkoutLog } from '../apis/saveWorkoutLog';
import { deleteWorkoutLog } from '../apis/deleteWorkoutLog';
import { updateWorkoutLog } from '../apis/updateWorkoutLog';
import { cardioOptions, weightOptions } from '../constants/exerciseOptions';
import { calculateTotalScore } from '../utils/calculateTotalScore';
import { format } from 'date-fns';
import CustomButton from './CustomButton';
import ConfirmModal from './ConfirmModal';
import FloatingInput from './FloatingInput';
import CustomSelect from './CustomSelect';
import editIcon from '../assets/edit-icon.png';
import deleteIcon from '../assets/delete-icon.png';
import addIcon from '../assets/plus.png';
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
        console.log(initialLogs);
    }, [initialLogs]);

    const resetForm = () => {
        setExerciseType('');
        setExercisePart('');
        setExerciseName('');
        setDuration('');
        setDistance('');
        setSets('');
        setReps('');
        setWeight('');
        setEditLog(null);
        setIsAdding(false);
    };

    const handleAddClick = () => {
        resetForm();
        setIsAdding(true);
    };

    const handleConfirmDelete = async () => {
        if (!confirmDeleteId) return;
        try {
            await deleteWorkoutLog(confirmDeleteId);
            setLogs(prevLogs => prevLogs.filter(l => l.id !== confirmDeleteId));
            setConfirmDeleteId(null);
            if (onLogSaved) onLogSaved();
        } catch (err) {
            console.error('운동 기록 삭제 실패', err);
        }
    };

    const handleSave = async () => {
        if (!exerciseType || !exerciseName) {
            console.error('모든 항목을 입력해주세요.');
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));

            const logData = {
                userId: user.id,
                name: exerciseName,
                part: exercisePart === '' ? '유산소' : exercisePart,
                exerciseType,
                date: format(selectedDate, 'yyyy-MM-dd'),
                duration: duration ? Number(duration) : 0,
                distance: distance ? Number(distance) : 0,
                sets: sets ? Number(sets) : 0,
                reps: reps ? Number(reps) : 0,
                weight: weight ? Number(weight) : 0,
            };

            if (editLog) {
                await updateWorkoutLog(editLog.id, logData);
                setLogs(prevLogs =>
                    prevLogs.map(log =>
                        log.id === editLog.id
                            ? { ...log, ...logData, id: editLog.id }
                            : log
                    )
                );
            } else {
                const savedLog = await saveWorkoutLog(logData);
                setLogs(prevLogs => [...prevLogs, savedLog]);
            }

            resetForm();
            if (onLogSaved) onLogSaved();
        } catch (err) {
            console.error('운동 기록 저장 실패', err);
        }
    };

    const getFieldsForExercise = (exerciseName) => {
        if (["트레드 밀", "걷기", "조깅 및 러닝 머신", "사이클 머신", "로잉 머신"].includes(exerciseName)) {
            return ["duration", "distance"];
        }
        if (exerciseName === "스텝 밀") return ["duration", "reps"];
        if (exerciseName === "줄넘기") return ["duration"];
        if (exerciseName === "버피") return ["sets", "reps"];
        const absExercises = ["크런치", "케이블 크런치", "시티드 니업", "플랭크", "행잉 레그레이즈", "리버스 크런치", "바이시클 크런치", "러시안 트위스트", "사이드 밴드"];
        if (absExercises.includes(exerciseName)) return ["sets", "reps"];
        return ["sets", "reps", "weight"];
    };

    const numberInputProps = (value, setValue, label) => ({
        id: label,
        label,
        type: 'text',
        value,
        onChange: (e) => {
            if (/^\d*(\.\d*)?$/.test(e.target.value)) {
                setValue(e.target.value);
            }
        },
    });

    return (
        <div>
            {logs.length > 0 && (
                <div className="workout-log-total-score">
                    운동 점수: <strong>{calculateTotalScore(logs).toFixed(0)}</strong>점
                </div>
            )}

            <ul className="workout-log-list">
                {logs.map((log, index) => {
                    const details = [];
                    if (log.weight > 0) details.push(`${log.weight}kg`);
                    if (log.sets > 0) details.push(`${log.sets}세트`);
                    if (log.reps > 0) details.push(`${log.reps}개`);
                    if (log.duration > 0) details.push(`${log.duration}분`);
                    if (log.distance > 0) details.push(`${log.distance}km`);

                    return (
                        <li key={index} className="workout-log-item">
                            <div className="log-texts">
                                <div className="log-name">{log.name} - {log.part ?? '유산소'}</div>
                                <div className="log-details">{details.join(' | ')}</div>
                            </div>
                            <div className="log-actions">
                                <img src={editIcon} alt="수정" className="log-action-icon" onClick={() => {
                                    setEditLog(log);
                                    setExerciseType(log.exerciseType);
                                    setExercisePart(log.part || '');
                                    setExerciseName(log.name);
                                    setDuration(log.duration ?? '');
                                    setDistance(log.distance ?? '');
                                    setSets(log.sets ?? '');
                                    setReps(log.reps ?? '');
                                    setWeight(log.weight ?? '');
                                    setIsAdding(true);
                                }} />
                                <img src={deleteIcon} alt="삭제" className="log-action-icon" onClick={() => setConfirmDeleteId(log.id)} />
                            </div>
                        </li>
                    );
                })}
            </ul>

            {confirmDeleteId && (
                <ConfirmModal open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)} onConfirm={handleConfirmDelete} title="정말 삭제하시겠습니까?" description="삭제하면 복구할 수 없습니다." confirmText="삭제" cancelText="취소" />
            )}

            {isAdding ? (
                <div className="workout-log-form">
                    <CustomSelect
                        value={exerciseType}
                        onChange={(val) => {
                            setExerciseType(val);
                            setExercisePart('');
                            setExerciseName('');
                        }}
                        options={['유산소', '웨이트']}
                        placeholder="운동 종류 선택"
                    />

                    {exerciseType === '유산소' && (
                        <CustomSelect
                            value={exerciseName}
                            onChange={setExerciseName}
                            options={cardioOptions}
                            placeholder="운동 이름 선택"
                        />
                    )}

                    {exerciseType === '웨이트' && (
                        <>
                            <CustomSelect
                                value={exercisePart}
                                onChange={(val) => {
                                    setExercisePart(val);
                                    setExerciseName('');
                                }}
                                options={Object.keys(weightOptions)}
                                placeholder="부위 선택"
                            />
                            {exercisePart && (
                                <CustomSelect
                                    value={exerciseName}
                                    onChange={setExerciseName}
                                    options={weightOptions[exercisePart]}
                                    placeholder="운동 이름 선택"
                                />
                            )}
                        </>
                    )}


                    {exerciseName && (
                        <>
                            {getFieldsForExercise(exerciseName).includes("duration") && (
                                <FloatingInput {...numberInputProps(duration, setDuration, "운동 시간 (분)")} />
                            )}
                            {getFieldsForExercise(exerciseName).includes("distance") && (
                                <FloatingInput {...numberInputProps(distance, setDistance, "거리 (km)")} />
                            )}
                            {getFieldsForExercise(exerciseName).includes("sets") && (
                                <FloatingInput {...numberInputProps(sets, setSets, "세트 수")} />
                            )}
                            {getFieldsForExercise(exerciseName).includes("reps") && (
                                <FloatingInput {...numberInputProps(reps, setReps, "반복 횟수")} />
                            )}
                            {getFieldsForExercise(exerciseName).includes("weight") && (
                                <FloatingInput {...numberInputProps(weight, setWeight, "중량 (kg)")} />
                            )}
                        </>
                    )}

                    <div className="workout-log-form-buttons">
                        <CustomButton size='small' label='취소' onClick={resetForm} rounded='pill' style={{ color: 'black', maxWidth: '100px' }} />
                        <CustomButton size='small' label={editLog ? "수정" : "저장"} onClick={handleSave} rounded='pill' style={{ maxWidth: '100px' }} />
                    </div>
                </div>
            ) : (
                <div className="add-button">
                    <img src={addIcon} alt="삭제" className="log-action-icon" style={{ width: '60px', height: '60px' }} onClick={handleAddClick} />
                </div>
            )}
        </div>
    );
};

export default WorkoutLogModalContent;
