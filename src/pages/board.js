import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Tab from '../components/Tab';
import '../styles/Board.css';

const Board = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className='boardContent'>
            <PageTitle title="커뮤니티" description="회원들과 운동 이야기를 나누어 보세요" showBackArrow={true} />
            <Tab
                tabs={['잡담', '식단', '루틴', '공지']}
                activeIndex={activeTab}
                onTabClick={(index) => setActiveTab(index)}
            />
        </div>
    );
};


export default Board;
