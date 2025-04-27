import React, { useState, useEffect } from 'react';
import { saveWorkoutLog } from '../apis/saveWorkoutLog';
import { cardioOptions, weightOptionsByPart } from '../constants/exerciseOptions';
import '../styles/WorkoutLogModalContent.css';

const WorkoutLogModalContent = ({ selectedDate, initialLogs = [] }) => {
    const [logs, setLogs] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const [exerciseType, setExerciseType] = useState('');
    const [selectedPart, setSelectedPart] = useState('');
    const [exerciseName, setExerciseName] = useState('');

    const [duration, setDuration] = useState('');
    const [distance, setDistance] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [sets, setSets] = useState('');

    useEffect(() => {
        setLogs(initialLogs);
    }, [initialLogs]);

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleSave = async () => {
        if (!exerciseType || !exerciseName) {
            alert('운동 종류와 운동 이름을 모두 선택해주세요.');
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const payload = {
                userId: user._id,
                name: exerciseName,
                date: selectedDate,
            };

            if (exerciseType === '유산소') {
                payload.duration = duration || null;
                payload.distance = distance || null;
                payload.reps = reps || null;
            } else {
                payload.sets = sets || null;
                payload.reps = reps || null;
                payload.weight = weight || null;
            }

            await saveWorkoutLog(payload);

            setLogs(prevLogs => [...prevLogs, payload]);

            setExerciseType('');
            setSelectedPart('');
            setExerciseName('');
            setDuration('');
            setDistance('');
            setReps('');
            setWeight('');
            setSets('');
            setIsAdding(false);
        } catch (err) {
            console.error('운동 기록 저장 실패', err);
        }
    };

    return (
        <div>
            <ul className="workout-log-list">
                {logs.map((log, index) => (
                    <li key={index} className="workout-log-item">
                        {log.name} {log.duration ? `(${log.duration}분)` : ''}
                        {log.sets ? ` - ${log.sets}세트 ${log.reps}회 ${log.weight}kg` : ''}
                    </li>
                ))}
            </ul>

            {isAdding ? (
                <div className="workout-log-form">
                    <select
                        value={exerciseType}
                        onChange={(e) => {
                            setExerciseType(e.target.value);
                            setSelectedPart('');
                            setExerciseName('');
                        }}
                    >
                        <option value="">운동 종류 선택</option>
                        <option value="유산소">유산소</option>
                        <option value="웨이트">웨이트</option>
                    </select>

                    {exerciseType === '웨이트' && (
                        <select
                            value={selectedPart}
                            onChange={(e) => {
                                setSelectedPart(e.target.value);
                                setExerciseName('');
                            }}
                        >
                            <option value="">부위 선택</option>
                            {Object.keys(weightOptionsByPart).map((part, idx) => (
                                <option key={idx} value={part}>{part}</option>
                            ))}
                        </select>
                    )}

                    {(exerciseType === '유산소' || selectedPart) && (
                        <select
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        >
                            <option value="">운동 이름 선택</option>
                            {(exerciseType === '유산소'
                                ? cardioOptions
                                : weightOptionsByPart[selectedPart] || []).map((option, idx) => (
                                    <option key={idx} value={option}>{option}</option>
                                ))}
                        </select>
                    )}

                    {exerciseType === '유산소' && (
                        <>
                            <input
                                type="number"
                                placeholder="시간 (분)"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="거리 (km)"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="횟수 (회)"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                            />
                        </>
                    )}

                    {exerciseType === '웨이트' && (
                        <>
                            <input
                                type="number"
                                placeholder="세트 수"
                                value={sets}
                                onChange={(e) => setSets(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="1세트당 반복 수"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="중량 (kg)"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
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
