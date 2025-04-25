import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsUpIcon, MessageCircle } from 'lucide-react';
import CommentItem from '../components/CommentItem';
import PageTitle from '../components/PageTitle';
import { getPostDetail } from '../apis/getPostDetail';
import { getComments, postComment } from '../apis/getComments';
import { deletePost } from '../apis/deletePost';
import { toggleLike, checkLikeStatus } from '../apis/toggleLike';
import '../styles/PostDetail.css';

const PostDetail = () => {
    const { id: postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const [liked, setLiked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setCurrentUserId(user._id);
        fetchPostAndComments();
        fetchLikeStatus();
    }, [postId]);

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
        const confirm = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
        if (!confirm) return;

        try {
            await deletePost(postId);
            alert('게시글이 삭제되었습니다.');
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

    if (!post) return <p>로딩 중...</p>;

    return (
        <div className="post-detail-container">
            <PageTitle title={post.name} showBackArrow={true} />

            <div className="post-header">
                <div className="profile-icon"></div>
                <div className="nickname">{post.nickname}</div>
                <div className="post-time">{new Date(post.createDate).toLocaleString()}</div>
                <div className="post-actions">
                    {currentUserId === post.writerId && (
                        <div className="post-actions">
                            <span onClick={() => navigate(`/editpost/${post._id}`)}>수정</span>
                            <span>|</span>
                            <span onClick={handleDelete}>삭제</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="post-content">{post.content}</div>

            <div className="post-footer">
                <div className="reaction" onClick={handleToggleLike} style={{ cursor: 'pointer' }}>
                    {liked ? <ThumbsUp fill="red" size={20} /> : <ThumbsUp size={20} color="red" />} <span>{post.like || 0}</span>
                </div>
                <div className="reaction">
                    <MessageCircle size={20} color="blue" /> <span>{comments.length}</span>
                </div>
            </div>

            <div className="comment-input-wrapper">
                <input
                    type="text"
                    placeholder="댓글을 작성하세요!"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handleRootCommentSubmit}>등록</button>
            </div>

            {comments.map((comment) => (
                <CommentItem
                    key={comment._id}
                    name={comment.nickname}
                    time={new Date(comment.writeDate).toLocaleString()}
                    content={comment.content}
                    like={comment.like || 0}
                    replies={comment.replies || []}
                    onReplySubmit={(text, parentId = comment._id) =>
                        submitReply(postId, parentId, text)
                    }
                />
            ))}
        </div>
    );
};

export default PostDetail;
