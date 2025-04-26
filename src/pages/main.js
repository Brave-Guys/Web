import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✨ 추가
import Box from '../components/Box';
import PageTitle from '../components/PageTitle.js';
import { getPosts } from '../apis/getPosts';
import '../styles/main.css';

const Main = () => {
    const [user, setUser] = useState(null);
    const [latestPosts, setLatestPosts] = useState([]);
    const navigate = useNavigate(); // ✨ 추가

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const fetchPosts = async () => {
            try {
                const allPosts = await getPosts();
                setLatestPosts(allPosts.slice(0, 3)); // 최신 3개만 추출
            } catch (err) {
                console.error('게시글을 불러오는 데 실패했습니다.', err);
            }
        };

        fetchPosts();
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`); // ✨ 게시글 상세페이지로 이동
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
                <Box type={2} showArrow={true} title='기록' to='/workoutlog' />
                <Box type={2} showArrow={true} title='Share+' to='/share-plus' />
                <Box type={2} showArrow={true} title='금주의 운동' to='/weekly-workout' />
                <Box type={2} showArrow={true} title='기본 운동 설명서' to='/exercise-tip' />

                <Box type={2} showArrow={true} title='게시판' to='/board'>
                    <div className="preview-posts">
                        {latestPosts.map((post) => (
                            <div
                                key={post._id}
                                className="preview-post"
                                onClick={() => handlePostClick(post._id)} // ✨ 여기 클릭 추가
                                style={{ cursor: 'pointer' }} // ✨ 커서 모양 바꾸기
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
