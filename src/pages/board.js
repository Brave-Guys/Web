import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Tab from '../components/Tab';
import PostItem from '../components/PostItem';
import { getPosts } from '../apis/getPosts';
import CustomButton from '../components/CustomButton';
import Box from '../components/Box.js'
import '../styles/Board.css'; import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ThumbsUp } from 'lucide-react'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.locale('ko', {
    ...dayjs.Ls.ko,
    relativeTime: {
        future: '%s 후',
        past: '%s 전',
        s: '방금 전',
        m: '1분 전',
        mm: '%d분 ',
        h: '1시간 ',         // <- 기본값은 '한 시간 전'
        hh: '%d시간 전',
        d: '1일 전',           // <- 기본값은 '하루 전'
        dd: '%d일 전',
        M: '1개월 전',
        MM: '%d개월 전',
        y: '1년 전',
        yy: '%d년 전'
    }
});

const Board = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [posts, setPosts] = useState([]);
    const [noticePosts, setNoticePosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
                setNoticePosts(data.filter(post => post.category === '공지'));
            } catch (err) {
                console.error(err);
                alert('게시글을 불러오지 못했습니다.');
            }
        };
        fetchPosts();
    }, []);

    const popularPosts = [...posts]
        .filter(post => post.category !== '공지') // 공지는 제외
        .sort((a, b) => (b.like || 0) - (a.like || 0))
        .slice(0, 3); // 상위 3개만 미리보기

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
                                return post.writerId === user._id;
                            }
                            return post.category === category;
                        })
                        .map((post) => (
                            <PostItem
                                key={post._id}
                                postId={post._id}
                                title={post.name}
                                content={post.content}
                                trail={`${post.nickname} | ${dayjs.utc(post.createDate).tz('Asia/Seoul').fromNow()}`}
                                likeCount={post.like || 0}
                                commentCount={post.comment || 0}
                            />
                        ))}
                </div>
                <div style={{ flexGrow: 1, margin: '20px' }}>
                    <Box type={2} title='인기글' showArrow={false} to='/popular'>
                        <div className="popular-preview">
                            {popularPosts.map((post) => (
                                <div
                                    key={post._id}
                                    className="popular-item"
                                    onClick={() => navigate(`/post/${post._id}`)}
                                >
                                    <div className="popular-title">{post.name}</div>
                                    <div className="popular-like">
                                        <ThumbsUp size={16} />
                                        <span>{post.like ?? 0}</span>
                                    </div>
                                </div>
                            ))}
                            {popularPosts.length === 0 && (
                                <div style={{ fontSize: '12px', color: 'gray' }}>인기글이 없습니다.</div>
                            )}
                        </div>
                    </Box>
                    <div style={{ margin: '10px' }}></div>
                    <Box type={2} title='공지' showArrow={false} to='/notice'>
                        <div className="notice-preview">
                            {noticePosts.slice(0, 3).map((post) => (  // 최대 3개만 미리보기로
                                <div key={post._id} style={{ marginBottom: '8px', cursor: 'pointer' }} onClick={() => navigate(`/post/${post._id}`)}>
                                    <div style={{ fontSize: '16px' }}>{post.name}</div>
                                </div>
                            ))}
                            {noticePosts.length === 0 && (
                                <div style={{ fontSize: '16px', color: 'gray' }}>등록된 공지사항이 없습니다.</div>
                            )}
                        </div>
                    </Box>
                </div>

            </div>
        </div>
    );
};

export default Board;
