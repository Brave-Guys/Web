import React from 'react';
import PageTitle from '../components/PageTitle';
import '../styles/Board.css';

const Board = () => {
    return (
        <div className='boardContent'>
            <PageTitle title="커뮤니티" description="회원들과 운동 이야기를 나누어 보세요" showBackArrow={true} />
        </div>
    );
};


export default Board;
