import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Tab from '../components/Tab';
import PostItem from '../components/PostItem';
import '../styles/Board.css';

const Board = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className='boardContent'>
            <PageTitle title="커뮤니티" description="회원들과 운동 이야기를 나누어 보세요" showBackArrow={true} />
            <Tab
                tabs={['잡담', '식단', '루틴', '공지', '내 게시글']}
                activeIndex={activeTab}
                onTabClick={(index) => setActiveTab(index)}
            />

            <button onClick={() => navigate('/writepost')}>글작성</button>

            <PostItem
                title="오늘 운동 갔다가 헬스장 강아지 봄ㅋㅋ"
                content="오늘 갔다가 트레이너분이 강아지 데려오셨던데 완전 귀엽더라ㅋㅋㅋ 운동하다..."
                trail="잡담 | 5분 전"
                likeCount={12}
                commentCount={3}
            />
        </div>
    );
};


export default Board;
