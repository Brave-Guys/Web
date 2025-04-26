import React, { useState, useEffect } from 'react';
import { saveWorkoutLog } from '../apis/saveWorkoutLog';

const WorkoutLogModalContent = ({ selectedDate, initialLogs = [], onClose }) => {
    const [logs, setLogs] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');
    const [intensity, setIntensity] = useState('');

    useEffect(() => {
        setLogs(initialLogs);
    }, [initialLogs]);

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleSave = async () => {
        if (name.trim() && intensity) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));

                await saveWorkoutLog({
                    userId: user._id,
                    name: name.trim(),
                    intensity: parseInt(intensity),
                    date: selectedDate,
                });

                setLogs(prevLogs => [
                    ...prevLogs,
                    { name: name.trim(), intensity: parseInt(intensity), date: selectedDate }
                ]);

                setName('');
                setIntensity('');
                setIsAdding(false);
            } catch (err) {
                console.error('운동 기록 저장 실패', err);
            }
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
                <>
                    <input
                        type="text"
                        style={{ width: '100%', marginBottom: '8px' }}
                        placeholder="운동 이름을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        style={{ width: '100%', marginBottom: '12px' }}
                        placeholder="강도 (숫자만 입력)"
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                    />
                    <div style={{ textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button onClick={() => setIsAdding(false)}>취소</button>
                        <button onClick={handleSave}>저장</button>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'right' }}>
                    <button onClick={handleAddClick}>+ 추가</button>
                </div>
            )}
        </div>
    );
};

export default WorkoutLogModalContent;
