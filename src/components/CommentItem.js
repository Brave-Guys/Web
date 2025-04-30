import React, { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { toggleLike, checkLikeStatus } from '../apis/toggleLike';
import '../styles/CommentItem.css';

const CommentItem = ({
    name,
    time,
    content,
    likes,
    replies = [],
    onReplySubmit,
    depth = 0, // 댓글은 0, 답글은 1
    commentId,
}) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes || 0);

    const handleReplyToggle = () => {
        setShowReplyInput(!showReplyInput);
    };

    const handleReplySubmit = () => {
        if (!replyText.trim()) return;
        onReplySubmit(replyText); // parentId는 외부에서 지정해줌
        setReplyText('');
        setShowReplyInput(false);
    };

    const handleToggleLike = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return alert('로그인이 필요합니다.');

            const result = await toggleLike({
                userId: user._id,
                postId: commentId,
                postType: 'community',
                postOrComment: 'comment',
            });

            setLiked(result.liked);
            setLikeCount(prev => result.liked ? prev + 1 : prev - 1);
        } catch (err) {
            console.error('댓글 좋아요 토글 실패', err);
            alert('좋아요 처리 중 오류 발생');
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        const checkStatus = async () => {
            try {
                const result = await checkLikeStatus({
                    userId: user._id,
                    postId: commentId,
                    postType: 'community',
                    postOrComment: 'comment',
                });
                setLiked(result);
            } catch (err) {
                console.error('댓글 좋아요 상태 확인 실패', err);
            }
        };

        checkStatus();
    }, []);

    return (
        <div className={`comment-item ${depth > 0 ? 'reply-item' : ''}`}>
            <div className="comment-top">
                <div className="avatar-placeholder small"></div>
                <div className="comment-meta">
                    <span className="comment-nickname">{name}</span>
                    <span className="comment-time">{time}</span>
                </div>
            </div>

            <div className="comment-content">{content}</div>

            <div className="comment-actions">
                <div className="comment-like" onClick={handleToggleLike} style={{ cursor: 'pointer' }}>
                    <ThumbsUp size={16} color={liked ? 'red' : '#ccc'} fill={liked ? 'red' : 'none'} />
                    <span>{likeCount}</span>
                </div>
                {depth === 0 && ( // ✅ 댓글만 답글 가능
                    <span className="comment-reply" onClick={handleReplyToggle}>답글</span>
                )}
            </div>

            {showReplyInput && (
                <div className="comment-reply-box">
                    <input
                        type="text"
                        placeholder="답글을 입력하세요"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button onClick={handleReplySubmit}>등록</button>
                </div>
            )}

            {replies.length > 0 && (
                <div className="comment-replies">
                    {replies.map(reply => (
                        <CommentItem
                            commentId={reply._id}
                            name={reply.nickname}
                            time={new Date(reply.writeDate).toLocaleString()}
                            content={reply.content}
                            likes={reply.likes || 0}
                            replies={reply.replies || []}
                            onReplySubmit={(text) => onReplySubmit(text, reply._id)}
                            depth={depth + 1} // 자식의 뎁스 전달
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


export default CommentItem;
