import React from 'react';

const WorkoutLogModalContent = () => {
    return (
        <div>            
            <p>운동 기록 또는 메모를 작성할 수 있습니다.</p>
            <textarea rows={5} style={{ width: '100%', marginBottom: '12px' }} placeholder="오늘 운동한 내용을 기록하세요!" />
            <div style={{ textAlign: 'right' }}>
            </div>
        </div>
    );
};

export default WorkoutLogModalContent;
