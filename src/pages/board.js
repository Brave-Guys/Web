import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Tab from '../components/Tab';
import PostItem from '../components/PostItem';
import CustomButton from '../components/CustomButton';
import FloatingInput from '../components/FloatingInput';
import PopularPostSlider from '../components/PopularPostSlider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPostsByPage, getPopularPosts } from '../apis/getPosts';
import { ClipLoader } from 'react-spinners';
import '../styles/Board.css';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.locale('ko', {
    ...dayjs.Ls.ko,
    relativeTime: {
        future: '%s ',
        past: '%s ',
        s: '방금 ',
        m: '1분 ',
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
    const [searchTerm, setSearchTerm] = useState('');
    const [popularPosts, setPopularPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const POSTS_PER_PAGE = 15;
    const fetchPosts = async (pageNum = 1, categoryIndex = 0) => {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const categoryList = ['잡담', '식단', '루틴', '공지'];

        const category = categoryIndex < 4 ? categoryList[categoryIndex] : null;
        const userId = categoryIndex === 4 ? user?.id : null;

        try {
            const res = await getPostsByPage(pageNum, category, userId);
            setPosts(res.posts);
            setHasMore(res.posts.length === POSTS_PER_PAGE);
        } catch (err) {
            console.error('게시글 로딩 실패', err);
        } finally {
            setIsLoading(false);
        }
    };


    const handleTabChange = async (index) => {
        const categoryList = ['잡담', '식단', '루틴', '공지'];
        setActiveTab(index);
        const category = index < 4 ? categoryList[index] : null;
        setPage(1);
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = index === 4 ? user?.id : null;
        try {
            const res = await getPostsByPage(1, category, userId);
            setPosts(res.posts);
            setHasMore(res.posts.length === POSTS_PER_PAGE);
        } catch (err) {
            console.error('탭 변경 후 게시글 로딩 실패', err);
        }
    };

    const fetchPopularPosts = async () => {
        try {
            const data = await getPopularPosts();
            setPopularPosts(data);
        } catch (err) {
            console.error('인기글 불러오기 실패', err);
        }
    };

    useEffect(() => {
        fetchPosts(page, activeTab);
    }, [page]);

    useEffect(() => {
        fetchPopularPosts();
    }, []);

    const filteredPosts = posts.filter(post => {
        const category = ['잡담', '식단', '루틴', '공지'][activeTab];
        if (activeTab === 4) {
            const user = JSON.parse(localStorage.getItem('user'));
            return post.writerId === user?.id;
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
                <div className='write-button'>
                    <CustomButton
                        label="글작성"
                        size="small"
                        color="gray"
                        onClick={() => navigate('/writepost')}
                        style={{ maxWidth: '120px' }}
                    />
                </div>
            </div>

            <div className="tab-search-row">
                <div className="tab-popular-group">
                    <Tab
                        tabs={['잡담', '식단', '루틴', '공지', '내 게시글']}
                        activeIndex={activeTab}
                        onTabClick={handleTabChange}
                    />
                    <div className="popular-post-slider-wrapper">
                        <PopularPostSlider />
                    </div>
                </div>
                <div className="search-wrapper">
                    <FloatingInput
                        id="search"
                        label="🔍 게시글 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && searchTerm.trim()) {
                                navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
                            }
                        }}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            <div>
                <div className="post-grid" style={{ flexGrow: 2 }}>
                    {isLoading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '300px',
                            width: '500%'
                        }}>
                            <ClipLoader size={48} color="#333" />
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="no-posts">게시글이 없습니다.</div>
                    ) : (
                        filteredPosts.map(post => (
                            <PostItem
                                key={post.id}
                                postId={post.id}
                                title={post.name}
                                trail={`${post.nickname} | ${dayjs.utc(post.createDate).tz('Asia/Seoul').fromNow()}`}
                                likeCount={post.likes || 0}
                                commentCount={post.commentCount || 0}
                                profileImgUrl={post.profileImgUrl}
                            />
                        ))
                    )}
                </div>
                <div className="pagination-local">
                    <CustomButton
                        label="이전"
                        size="small"
                        color="gray"
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        style={{ marginRight: '8px' }}
                        disabled={page === 1}
                    />
                    <CustomButton
                        label="다음"
                        size="small"
                        color="gray"
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={!hasMore}
                    />
                </div>
            </div>
        </div>
    );
};

export default Board;
