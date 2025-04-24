import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Tab from '../components/Tab';
import PostItem from '../components/PostItem';
import { getPosts } from '../apis/getPosts';
import '../styles/Board.css';

const Board = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data); // 서버에서 받은 게시글 배열
            } catch (err) {
                console.error(err);
                alert('게시글을 불러오지 못했습니다.');
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className='boardContent'>
            <PageTitle title="커뮤니티" description="회원들과 운동 이야기를 나누어 보세요" showBackArrow={true} />

            <Tab
                tabs={['잡담', '식단', '루틴', '공지', '내 게시글']}
                activeIndex={activeTab}
                onTabClick={(index) => setActiveTab(index)}
            />

            <button onClick={() => navigate('/writepost')}>글작성</button>

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
                        title={post.name}
                        content={post.content}
                        trail={`${post.category} | ${new Date(post.createDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                        likeCount={post.likeCount || 0}
                        commentCount={post.commentCount || 0}
                    />
                ))}
        </div>
    );
};

export default Board;
