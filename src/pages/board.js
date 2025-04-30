// Board.js - 무한 스크롤 적용
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Tab from '../components/Tab';
import PostItem from '../components/PostItem';
import CustomButton from '../components/CustomButton';
import Box from '../components/Box';
import '../styles/Board.css';
import { ThumbsUp } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPostsByPage } from '../apis/getPosts';

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
        mm: '%d분',
        h: '1시간',
        hh: '%d시간',
        d: '1일',
        dd: '%d일',
        M: '1개월',
        MM: '%d개월',
        y: '1년',
        yy: '%d년'
    }
});

const Board = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const loadMorePosts = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await getPostsByPage(page);
            if (res.posts.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prev => [...prev, ...res.posts]);
                setPage(prev => prev + 1);
            }
        } catch (err) {
            console.error('게시글 로딩 실패', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadMorePosts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if (bottom) loadMorePosts();
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    const popularPosts = [...posts]
        .filter(post => post.category !== '공지')
        .sort((a, b) => (b.like || 0) - (a.like || 0))
        .slice(0, 3);

    const filteredPosts = posts.filter(post => {
        const category = ['잡담', '식단', '루틴', '공지'][activeTab];
        if (activeTab === 4) {
            const user = JSON.parse(localStorage.getItem('user'));
            return post.writerId === user?._id;
        }
        return post.category === category;
    });

    return (
        <div className='boardContent'>
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

            <div className="tab-search-row">
                <Tab
                    tabs={['잡담', '식단', '루틴', '공지', '내 게시글']}
                    activeIndex={activeTab}
                    onTabClick={(index) => setActiveTab(index)}
                />
                <input
                    type="text"
                    placeholder="게시글 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchTerm.trim()) {
                            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
                        }
                    }}
                    className="search-input"
                />
            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 2 }}>
                    {filteredPosts.map(post => (
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
                    {loading && <div style={{ textAlign: 'center', padding: '20px' }}>불러오는 중...</div>}
                </div>
                <div style={{ flexGrow: 1, margin: '20px' }}>
                    <Box type={2} title='인기글' showArrow={false} to='/popular'>
                        <div className="popular-preview">
                            {popularPosts.map(post => (
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
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default Board;
