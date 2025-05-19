import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../components/Box';
import PageTitle from '../components/PageTitle.js';
import exerciseTips from '../constants/exerciseTips';
import DefaultAvatar from '../assets/person.png';
import { getWorkoutLogsByDateRange } from '../apis/getWorkoutLogs';
import { getMyShareRequests } from '../apis/getSharePlus.js';
import { getPosts } from '../apis/getPosts';
import { calculateCardioScore } from '../utils/calculateCardioScore';
import { calculateWeightScore } from '../utils/calculateWeightscore';
import { format } from 'date-fns';
import '../styles/main.css';

const Main = () => {
    const [user, setUser] = useState(null);
    const [latestPosts, setLatestPosts] = useState([]);
    const [monthLogs, setMonthLogs] = useState([]);
    const [randomTip, setRandomTip] = useState(null);
    const [myRequests, setMyRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const fetchPosts = async () => {
            try {
                const allPosts = await getPosts();
                setLatestPosts(allPosts.reverse().slice(0, 5));
            } catch (err) {
                console.error('게시글을 불러오는 데 실패했습니다.', err);
            }
        };

        const fetchMyRequests = async () => {
            try {
                const requests = await getMyShareRequests();
                setMyRequests(requests);
            } catch (err) {
                console.error('나의 Share+ 신청서 불러오기 실패:', err);
            }
        };

        const fetchMonthLogs = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const now = new Date();
                const start = new Date(now.getFullYear(), now.getMonth(), 1);
                const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

                const logs = await getWorkoutLogsByDateRange(
                    user.id,
                    format(start, 'yyyy-MM-dd'),
                    format(end, 'yyyy-MM-dd')
                );
                setMonthLogs(logs);
            } catch (err) {
                console.error('월별 기록 조회 실패', err);
            }
        };

        const randomIndex = Math.floor(Math.random() * exerciseTips.length);

        setRandomTip(exerciseTips[randomIndex]);
        fetchPosts();
        fetchMonthLogs();
        fetchMyRequests();
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
            const day = logDate.getDate();

            let score = 0;
            if (log.exerciseType === '유산소') {
                score = calculateCardioScore(log);
            } else if (log.exerciseType === '웨이트') {
                score = calculateWeightScore(log);
            }

            if (!scoresByDay[day]) scoresByDay[day] = 0;
            scoresByDay[day] += score; // ✨ 점수 누적
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

                {user?.role === 'ADMIN' && (
                    <button className="role-room-button" onClick={() => navigate('/admin')}>
                        관리자의 방
                    </button>
                )}
                {user?.role === 'SENIOR' && (
                    <button className="role-room-button" onClick={() => navigate('/senior')}>
                        상급자의 방
                    </button>
                )}
            </div>

            <div className="card-grid">
                <Box type={2} showArrow={true} title='이번 달 운동 기록' to='/workoutlog'>
                    <div style={{ display: 'flex' }}>
                        <div>{renderMiniCalendar()}</div>

                        <div className="score-legend-box desktop" style={{ marginLeft: '10px', flex: '1', width: '100%', height: '200px' }}>
                            <h3>운동 강도</h3>
                            <ul className="score-legend-list">
                                <li style={{ margin: '0' }}>
                                    <span style={{ height: '10px', backgroundColor: '#D9D9D9' }} />
                                    <div className="legend-text">
                                        <span style={{ fontSize: '12px' }} className="label">운동 기록 없음</span>
                                        <span style={{ fontSize: '12px' }} className="score">0점</span>
                                    </div>
                                </li>
                                <li style={{ margin: '0' }}>
                                    <span style={{ height: '10px', backgroundColor: '#B3E6B3' }} />
                                    <div className="legend-text">
                                        <span style={{ fontSize: '12px' }} className="label">가벼운 운동</span>
                                        <span style={{ fontSize: '12px' }} className="score">1 ~ 60점</span>
                                    </div>
                                </li>
                                <li style={{ margin: '0' }}>
                                    <span style={{ height: '10px', backgroundColor: '#80D480' }} />
                                    <div className="legend-text">
                                        <span style={{ fontSize: '12px' }} className="label">평균</span>
                                        <span style={{ fontSize: '12px' }} className="score">61 ~ 100점</span>
                                    </div>
                                </li>
                                <li style={{ margin: '0' }}>
                                    <span style={{ height: '10px', backgroundColor: '#4DC34D' }} />
                                    <div className="legend-text">
                                        <span style={{ fontSize: '12px' }} className="label">열심히 운동</span>
                                        <span style={{ fontSize: '12px' }} className="score">101 ~ 140점</span>
                                    </div>
                                </li>
                                <li style={{ margin: '0' }}>
                                    <span style={{ height: '10px', backgroundColor: '#00AA00' }} />
                                    <div className="legend-text">
                                        <span style={{ fontSize: '12px' }} className="label">최고의 운동</span>
                                        <span style={{ fontSize: '12px' }} className="score">141점 이상</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Box>

                <Box type={2} showArrow={true} title='Share+' to='/share-plus'>
                    <div className="my-request-mini-list">
                        {myRequests.length === 0 ? (
                            <p className="empty-text">신청 내역 없음</p>
                        ) : (
                            <div className="my-request-mini-scroll">
                                {myRequests.map((req) => (
                                    <div key={req.id} className="mini-profile">
                                        <img
                                            src={req.profileImgUrl || DefaultAvatar}
                                            alt={req.nickname}
                                            className="mini-profile-img"
                                        />
                                        <span className="mini-profile-name">{req.nickname}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Box>
                <Box type={2} showArrow={true} title='금주의 운동' to='/weekly-workout' />
                {randomTip && (
                    <Box type={2} showArrow={true} title='기본 운동 설명서' to='/exercise-tip'>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div class='desktop' style={{ padding: '0px 20px' }}>
                                    <img src={randomTip.img} alt={randomTip.title} style={{ width: '80px', height: '80px', marginBottom: '10px' }} />
                                </div>
                                <div style={{ padding: '0px 20px' }}>
                                    <h3 style={{ marginBottom: '5px' }}>{randomTip.title}</h3>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {randomTip.tips.map((tip, index) => (
                                            <li class='tips' key={index} style={{ marginBottom: '5px' }}>• {tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Box>
                )}

                <Box type={2} showArrow={true} title='게시판' to='/board'>
                    <div className="preview-posts">
                        {latestPosts.map((post) => (
                            <div
                                key={post.id}
                                className="preview-post"
                                onClick={() => handlePostClick(post.id)}
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
