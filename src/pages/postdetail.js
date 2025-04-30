import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import CommentItem from '../components/CommentItem';
import PageTitle from '../components/PageTitle';
import ConfirmModal from '../components/ConfirmModal';
import Box from '../components/Box';
import { getPosts } from '../apis/getPosts';
import { getPostDetail } from '../apis/getPostDetail';
import { getComments, postComment } from '../apis/getComments';
import { deletePost } from '../apis/deletePost';
import { toggleLike, checkLikeStatus } from '../apis/toggleLike';
import '../styles/PostDetail.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

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
        mm: '%d분 ',
        h: '1시간 ',
        hh: '%d시간 ',
        d: '1일 전',
        dd: '%d일 ',
        M: '1개월 ',
        MM: '%d개월 ',
        y: '1년 ',
        yy: '%d년 '
    }
});

const PostDetail = () => {
    const navigate = useNavigate();

    const { id: postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [liked, setLiked] = useState(false);
    const [noticePosts, setNoticePosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    const fetchPopularPosts = async () => {
        try {
            const all = await getPosts();
            const sorted = all
                .filter(p => p.like > 0)
                .sort((a, b) => b.like - a.like)
                .slice(0, 5); // 상위 5개만
            setPopularPosts(sorted);
        } catch (err) {
            console.error('인기글 불러오기 실패', err);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setCurrentUserId(user._id);
        fetchPostAndComments();
        fetchLikeStatus();
        fetchNoticePosts();
        fetchPopularPosts();
    }, [postId]);

    const fetchNoticePosts = async () => {
        try {
            const allPosts = await getPosts();
            const filtered = allPosts.filter(post => post.category === '공지');
            setNoticePosts(filtered);
        } catch (err) {
            console.error('공지글 불러오기 실패', err);
        }
    };

    const fetchLikeStatus = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const result = await checkLikeStatus({
                userId: user._id,
                postId,
                postType: 'community',
                postOrComment: 'post'
            });
            setLiked(result ? true : false);
        } catch (err) {
            console.error('좋아요 상태 확인 실패', err);
        }
    };

    const handleToggleLike = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const result = await toggleLike({
                userId: user._id,
                postId: postId,
                postType: 'community',
                postOrComment: 'post',
            });
            setLiked(result.liked);
            setPost((prev) => ({
                ...prev,
                like: result.liked ? prev.like + 1 : prev.like - 1,
            }));
        } catch (err) {
            alert('좋아요 처리 중 오류 발생');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(postId);
            navigate(-1);
        } catch (err) {
            alert('게시글 삭제 실패');
            console.error(err);
        }
    };

    const fetchPostAndComments = async () => {
        try {
            const postData = await getPostDetail(postId);
            const commentData = await getComments(postId);
            const nested = nestComments(commentData);
            setPost(postData);
            console.log(commentData);
            console.log(nested);
            setComments(nested);
        } catch (err) {
            alert('게시글 또는 댓글을 불러오는 데 실패했습니다.');
            console.error(err);
        }
    };

    const nestComments = (comments) => {
        const map = {};
        const roots = [];
        comments.forEach((c) => {
            c.replies = [];
            map[c._id] = c;
        });
        comments.forEach((c) => {
            if (c.parentId) {
                if (map[c.parentId]) map[c.parentId].replies.push(c);
            } else {
                roots.push(c);
            }
        });
        return roots;
    };

    const submitReply = async (postId, parentId, text) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await postComment({ postId, parentId, writerId: user._id, content: text });
            await fetchPostAndComments();
        } catch (err) {
            alert('댓글 등록에 실패했습니다.');
            console.error(err);
        }
    };

    const handleRootCommentSubmit = async () => {
        if (!commentText.trim()) return;
        await submitReply(postId, null, commentText);
        setCommentText('');
    };

    const countAllComments = (comments) => {
        let count = 0;
        const traverse = (list) => {
            for (const comment of list) {
                count++;
                if (comment.replies && comment.replies.length > 0) {
                    traverse(comment.replies);
                }
            }
        };
        traverse(comments);
        return count;
    };

    if (!post) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <ClipLoader size={50} color="#4F46E5" />
            </div>
        );
    }


    return (
        <div className="post-detail-container">
            <div style={{ margin: '50px 0' }}>
                <PageTitle title={post.name} showBackArrow={true} />
            </div>

            {/* 본문 + 공지 flex 배치 */}
            <div style={{ display: 'flex', gap: '40px' }}>

                {/* 왼쪽: 게시글 본문 */}
                <div style={{ flex: 2 }}>
                    <div className="post-detail-wrapper">
                        <div className="profile-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div className="profile-icon"></div>
                            <div>
                                <div className="nickname" style={{ fontWeight: 'bold' }}>{post.nickname}</div>
                                <div className="post-time" style={{ fontSize: '12px', color: 'gray' }}>
                                    {dayjs.utc(post.createDate).tz('Asia/Seoul').fromNow()}
                                </div>
                            </div>
                            {currentUserId === post.writerId && (
                                <div className="post-actions" style={{ marginLeft: 'auto', fontSize: '14px', cursor: 'pointer' }}>
                                    <span onClick={() => navigate(`/editpost/${post._id}`)}>수정</span>
                                    <span style={{ margin: '0 5px' }}>|</span>
                                    <span onClick={() => setShowDeleteModal(true)}>삭제</span>
                                </div>
                            )}
                        </div>

                        <ConfirmModal
                            open={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            onConfirm={handleDelete}
                            title="정말 삭제하시겠습니까?"
                            description="삭제하면 복구할 수 없습니다."
                            confirmText="삭제"
                            cancelText="취소"
                        />

                        <div className="post-content" style={{ marginBottom: '30px' }}>{post.content}</div>

                        <div className="post-footer" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <div className="reaction" onClick={handleToggleLike} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                                {liked ? <ThumbsUp fill="red" size={20} /> : <ThumbsUp size={20} color="red" />}
                                <span>{post.like || 0}</span>
                            </div>
                            <div className="reaction" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <MessageCircle size={20} color="blue" />
                                <span>{countAllComments(comments)}</span>
                            </div>
                        </div>

                        {/* 댓글 입력창 */}
                        <div className="comment-input-wrapper">
                            <input
                                type="text"
                                placeholder="댓글을 작성하세요!"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button onClick={handleRootCommentSubmit}>등록</button>
                        </div>

                        {/* 댓글 리스트 */}
                        {comments.map((comment) => (
                            <CommentItem
                                commentId={comment._id}
                                name={comment.nickname}
                                time={comment.writeDate}
                                content={comment.content}
                                likes={comment.likes || 0}
                                replies={comment.replies || []}
                                onReplySubmit={(text, parentId = comment._id) =>
                                    submitReply(postId, parentId, text)
                                }
                                currentUserId={currentUserId}
                                writerId={comment.writerId}
                                onDeleteSuccess={fetchPostAndComments}
                                onEditSuccess={fetchPostAndComments}
                            />
                        ))}
                    </div>
                </div>

                {/* 오른쪽: 공지사항 */}
                <div style={{ flex: 1 }}>
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
                                <div style={{ fontSize: '12px', color: 'gray' }}>등록된 공지사항이 없습니다.</div>
                            )}
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
