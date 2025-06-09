import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import CommentItem from '../components/CommentItem';
import PageTitle from '../components/PageTitle';
import ConfirmModal from '../components/ConfirmModal';
import Box from '../components/Box';
import { getPosts, getPopularPosts } from '../apis/getPosts';
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
import DefaultAvatar from '../assets/person.png';

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
    const [isFocused, setIsFocused] = useState(false);

    const fetchPopularPosts = async () => {
        try {
            const data = await getPopularPosts();
            setPopularPosts(data);
        } catch (err) {
            console.error('인기글 불러오기 실패', err);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setCurrentUserId(user.id);
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
                userId: user.id,
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
                userId: user.id,
                postId: postId,
                postType: 'community',
                postOrComment: 'post',
            });
            await fetchPostAndComments();
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
            map[c.id] = c;
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
            await postComment({ postId, parentId, writerId: user.id, content: text });
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
            <PageTitle
                title={post.name}
                description='게시글 상세 정보'
                showBackArrow={true}
            />
            <div clasName='temp-blank'></div>
            <div style={{ display: 'flex', gap: '40px', padding: '30px' }}>
                <div style={{ flex: 2 }}>
                    <div className="post-detail-wrapper">
                        <div className="post-profile-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            {post.profileImgUrl ? (
                                <img
                                    src={post.profileImgUrl}
                                    alt="프로필"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <img
                                    src={DefaultAvatar}
                                    alt="avatar"
                                    className="avatar"
                                />
                            )}

                            <div>
                                <div className="nickname" style={{ fontWeight: 'bold' }}>{post.nickname}</div>
                                <div className="post-time" style={{ fontSize: '12px', color: 'gray' }}>
                                    {dayjs.utc(post.createDate).tz('Asia/Seoul').fromNow()}
                                </div>
                            </div>

                            {currentUserId === post.writerId && (
                                <div className="post-actions" style={{ marginLeft: 'auto', fontSize: '14px', cursor: 'pointer' }}>
                                    <span onClick={() => navigate(`/editpost/${post.id}`)}>수정</span>
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

                        <div className="post-content" style={{ marginBottom: '30px' }}>
                            {Array.isArray(post.imageUrls) && post.imageUrls.length > 0 && (
                                <div className="post-image-wrapper">
                                    {post.imageUrls.map((url, idx) => (
                                        <img
                                            key={idx}
                                            src={url}
                                            alt={`게시글 이미지 ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                            {post.content}
                        </div>

                        <div className="post-footer" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <div className="reaction" onClick={handleToggleLike} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                                {liked ? <ThumbsUp fill="red" size={20} /> : <ThumbsUp size={20} color="red" />}
                                <span>{post.likes || 0}</span>
                            </div>
                            <div className="reaction" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <MessageCircle size={20} color="blue" />
                                <span>{countAllComments(comments)}</span>
                            </div>
                        </div>

                        <div className="comment-input-wrapper">
                            <textarea
                                className="comment-textarea"
                                placeholder="댓글을 작성하세요!"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={(e) => {
                                    if (!e.target.value.trim()) setIsFocused(false);
                                }}
                            />
                            {isFocused && (
                                <div className="comment-action-buttons visible" style={{ padding: '10px 0px' }}>
                                    <button
                                        className="comment-button cancel"
                                        onClick={() => {
                                            setCommentText('');
                                            setIsFocused(false);
                                        }}
                                    >
                                        취소
                                    </button>
                                    <button
                                        className="comment-button save"
                                        onClick={handleRootCommentSubmit}
                                    >
                                        등록
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ margin: '5px' }}></div>
                        {comments.map((comment) => (
                            <>
                                <CommentItem
                                    commentId={comment.id}
                                    name={comment.nickname}
                                    time={comment.writeDate}
                                    content={comment.content}
                                    likes={comment.likes || 0}
                                    replies={comment.replies || []}
                                    onReplySubmit={(text, parentId = comment.id) =>
                                        submitReply(postId, parentId, text)
                                    }
                                    currentUserId={currentUserId}
                                    writerId={comment.writerId}
                                    profileImgUrl={comment.profileImgUrl}
                                    onDeleteSuccess={fetchPostAndComments}
                                    onEditSuccess={fetchPostAndComments}
                                />
                            </>
                        ))}
                    </div>
                </div>

                <div style={{ flex: 1 }} className='desktop'>
                    <Box type={2} title='인기글' showArrow={false} to='/popular'>
                        <div className="popular-preview">
                            {popularPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="popular-item"
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    <div className="popular-title">{post.name}</div>
                                    <div className="popular-like">
                                        <ThumbsUp size={16} />
                                        <span>{post.likes ?? 0}</span>
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
                                <div key={post.id} style={{ marginBottom: '8px', cursor: 'pointer' }} onClick={() => navigate(`/post/${post.id}`)}>
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
