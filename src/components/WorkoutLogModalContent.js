import React, { useState, useEffect } from 'react';
import { saveWorkoutLog } from '../apis/saveWorkoutLog';

const WorkoutLogModalContent = ({ selectedDate, initialLogs = [], onClose }) => {
    const [logs, setLogs] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');
    const [intensity, setIntensity] = useState('');
    const [exerciseType, setExerciseType] = useState('');  // 유산소 or 웨이트
    const [exerciseName, setExerciseName] = useState('');    

    const cardioOptions = ['런닝', '싸이클', '로잉', '수영', '줄넘기'];
    const weightOptions = ['벤치프레스', '스쿼트', '데드리프트', '오버헤드프레스', '바벨로우'];

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
                name: exerciseName,  // 입력 대신 드롭다운 선택값
                intensity: intensity,
                date: selectedDate,
            });

            setLogs(prev => [...prev, { name: exerciseName, intensity }]);
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
            <ul style={{ padding: 0, listStyle: 'none', marginBottom: '12px' }}>
                {logs.map((log, index) => (
                    <li key={index} style={{
                        background: '#f9f9f9',
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        border: '1px solid #eee'
                    }}>
                        {log?.name ?? '운동 없음'} - 강도: {log?.intensity ?? 'N/A'}
                    </li>
                ))}
            </ul>

            {isAdding ? (
                <div>
                    <select value={exerciseType} onChange={(e) => { setExerciseType(e.target.value); setExerciseName(''); }}>
                        <option value="">운동 종류 선택</option>
                        <option value="유산소">유산소</option>
                        <option value="웨이트">웨이트</option>
                    </select>

                    {exerciseType && (
                        <select value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}>
                            <option value="">운동 이름 선택</option>
                            {(exerciseType === '유산소' ? cardioOptions : weightOptions).map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                    )}

                    <input
                        type="number"
                        placeholder="강도(1~10)"
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                        min={1}
                        max={10}
                    />

                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <button onClick={() => setIsAdding(false)}>취소</button>
                        <button onClick={handleSave}>저장</button>
                    </div>
                </div>

            ) : (
                <div style={{ textAlign: 'right' }}>
                    <button onClick={handleAddClick}>+ 추가</button>
                </div>
            )}
        </div>
    );
};

export default WorkoutLogModalContent;
