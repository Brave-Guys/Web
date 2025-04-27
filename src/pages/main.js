import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../components/Box';
import PageTitle from '../components/PageTitle.js';
import { getWorkoutLogsByDateRange } from '../apis/getWorkoutLogs';
import { getPosts } from '../apis/getPosts';
import '../styles/main.css';

const Main = () => {
    const [user, setUser] = useState(null);
    const [latestPosts, setLatestPosts] = useState([]);
    const [monthLogs, setMonthLogs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const fetchPosts = async () => {
            try {
                const allPosts = await getPosts();
                setLatestPosts(allPosts.slice(0, 3));
            } catch (err) {
                console.error('게시글을 불러오는 데 실패했습니다.', err);
            }
        };

        const fetchMonthLogs = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const now = new Date();
                const start = new Date(now.getFullYear(), now.getMonth(), 1);
                const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

                const logs = await getWorkoutLogsByDateRange(user._id, start.toISOString(), end.toISOString());
                setMonthLogs(logs);
            } catch (err) {
                console.error('월별 기록 조회 실패', err);
            }
        };

        fetchPosts();
        fetchMonthLogs();
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const renderMiniCalendar = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();

        const scoresByDay = {};

        monthLogs.forEach(log => {
            const logDate = new Date(log.date);
            const logDay = logDate.getDate();
            if (!scoresByDay[logDay]) scoresByDay[logDay] = 0;
            scoresByDay[logDay] += 1;
        });

        const cells = [];

        const totalDaysIncludingStart = startDay + daysInMonth;
        const totalCells = totalDaysIncludingStart <= 35 ? 35 : 42;

        for (let i = 0; i < startDay; i++) {
            cells.push(
                <div key={`empty-start-${i}`} className="mini-calendar-cell empty" />
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const score = scoresByDay[day] || 0;
            let bgColor = '#D9D9D9';

            if (score >= 1 && score <= 60) bgColor = '#B3E6B3';
            if (score >= 61 && score <= 100) bgColor = '#80D480';
            if (score >= 101 && score <= 140) bgColor = '#4DC34D';
            if (score >= 141) bgColor = '#00AA00';

            cells.push(
                <div
                    key={`day-${day}`}
                    className="mini-calendar-cell"
                    style={{ backgroundColor: bgColor }}
                />
            );
        }

        while (cells.length < totalCells) {
            cells.push(
                <div key={`empty-end-${cells.length}`} className="mini-calendar-cell empty" />
            );
        }

        return (
            <div className="mini-calendar-grid">
                {cells}
            </div>
        );
    };

    return (
        <div className="main-page">
            <div className="welcome-text">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <PageTitle
                        title={`${user?.name ?? '사용자'}님 반가워요!`}
                        description="내 운동을 관리해보세요."
                    />
                    <h2 className="pro-badge">{user?.userPlanType ?? '사용자'}</h2>
                </div>
            </div>

            <div className="card-grid">
                <Box type={2} showArrow={true} title='기록' to='/workoutlog'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {renderMiniCalendar()}
                    </div>
                </Box>

                <Box type={2} showArrow={true} title='Share+' to='/share-plus' />
                <Box type={2} showArrow={true} title='금주의 운동' to='/weekly-workout' />
                <Box type={2} showArrow={true} title='기본 운동 설명서' to='/exercise-tip' />

                <Box type={2} showArrow={true} title='게시판' to='/board'>
                    <div className="preview-posts">
                        {latestPosts.map((post) => (
                            <div
                                key={post._id}
                                className="preview-post"
                                onClick={() => handlePostClick(post._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="preview-title">{post.name}</span>
                                <span className="preview-meta">
                                    {post.category} | {post.nickname} | {new Date(post.createDate).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default Main;
