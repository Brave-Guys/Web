import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Tab from '../components/Tab';
import PostItem from '../components/PostItem';
import { getPosts } from '../apis/getPosts';
import CustomButton from '../components/CustomButton';
import Box from '../components/Box.js'
import '../styles/Board.css';

const Board = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                console.error(err);
                alert('게시글을 불러오지 못했습니다.');
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className='boardContent'>

            {/* ✅ 상단 제목 + 글쓰기 버튼 */}
            <div className="board-header">
                <PageTitle
                    title="커뮤니티"
                    description="회원들과 운동 이야기를 나누어 보세요"
                    showBackArrow={true}
                />
                <div style={{ flexGrow: '1' }}></div>
                <CustomButton
                    label="글작성"
                    size="small"
                    color="gray"
                    onClick={() => navigate('/writepost')}
                    style={{ maxWidth: '120px' }}
                />
            </div>

            <Tab
                tabs={['잡담', '식단', '루틴', '공지', '내 게시글']}
                activeIndex={activeTab}
                onTabClick={(index) => setActiveTab(index)}
            />

            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 2 }}>
                    {posts
                        .filter(post => {
                            const category = ['잡담', '식단', '루틴', '공지'][activeTab];
                            if (activeTab === 4) {
                                const user = JSON.parse(localStorage.getItem('user'));
                                return post.uid === user._id;
                            }
                            return post.category === category;
                        })
                        .map((post) => (
                            <PostItem
                                key={post._id}
                                postId={post._id}
                                title={post.name}
                                content={post.content}
                                trail={`${post.nickname} | ${new Date(post.createDate).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}`}
                                likeCount={post.like || 0}
                                commentCount={post.comment || 0}
                            />
                        ))}
                </div>
                <div style={{ flexGrow: 1, margin: '20px' }}>
                    <Box type={2} title='인기글' showArrow={true} />
                    <div style={{ margin: '10px' }}></div>
                    <Box type={2} title='공지' showArrow={true} />
                </div>

            </div>
        </div>
    );
};

export default Board;
