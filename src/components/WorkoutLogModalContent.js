import React, { useState, useEffect } from 'react';
import { saveWorkoutLog } from '../apis/saveWorkoutLog';
import { cardioOptions, weightOptions } from '../constants/exerciseOptions';
import '../styles/WorkoutLogModalContent.css';

const WorkoutLogModalContent = ({ selectedDate, initialLogs = [], onClose }) => {
    const [logs, setLogs] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const [exerciseType, setExerciseType] = useState('');
    const [exerciseName, setExerciseName] = useState('');
    const [intensity, setIntensity] = useState('');

    const [newEntry, setNewEntry] = useState('');

    useEffect(() => {
        setLogs(initialLogs);
    }, [initialLogs]);

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleSave = async () => {
        if (!exerciseType || !exerciseName || !intensity) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));

            await saveWorkoutLog({
                userId: user._id,
                name: exerciseName,
                intensity,
                date: selectedDate,
            });

            setLogs(prevLogs => [
                ...prevLogs,
                { name: exerciseName, intensity }
            ]);

            // 초기화
            setExerciseType('');
            setExerciseName('');
            setIntensity('');
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
                        {log.name}
                        <span>강도 {log.intensity}</span>
                    </li>
                ))}
            </ul>

            {isAdding ? (
                <div className="workout-log-form">
                    <select
                        value={exerciseType}
                        onChange={(e) => { setExerciseType(e.target.value); setExerciseName(''); }}
                    >
                        <option value="">운동 종류 선택</option>
                        <option value="유산소">유산소</option>
                        <option value="웨이트">웨이트</option>
                    </select>

                    {exerciseType && (
                        <select
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        >
                            <option value="">운동 이름 선택</option>
                            {(exerciseType === '유산소' ? cardioOptions : weightOptions).map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                    )}

                    <input
                        type="number"
                        placeholder="강도 (1~10)"
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                        min={1}
                        max={10}
                    />

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
