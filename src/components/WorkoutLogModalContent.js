import React, { useState, useEffect } from 'react';
import { saveWorkoutLog } from '../apis/saveWorkoutLog';

const WorkoutLogModalContent = ({ selectedDate, initialLogs = [], onClose }) => {
    const [logs, setLogs] = useState([]);

    const [isAdding, setIsAdding] = useState(false);
    const [newEntry, setNewEntry] = useState('');

    // ✨ initialLogs를 초기 세팅해주는 useEffect 추가
    useEffect(() => {
        setLogs(initialLogs);
    }, [initialLogs]);

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleSave = async () => {
        if (newEntry.trim()) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));

                await saveWorkoutLog({
                    userId: user._id,
                    content: newEntry.trim(),
                    date: selectedDate,
                });

                setLogs(prevLogs => [
                    ...prevLogs,
                    { content: newEntry.trim(), date: selectedDate } // ✅ 객체 형태로 추가
                ]);
                setNewEntry('');
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
                        {log?.content ?? '내용 없음'}
                    </li>
                ))}
            </ul>

            {isAdding ? (
                <>
                    <textarea
                        rows={4}
                        style={{ width: '100%', marginBottom: '12px' }}
                        placeholder="오늘 운동한 내용을 기록하세요!"
                        value={newEntry}
                        onChange={(e) => setNewEntry(e.target.value)}
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
