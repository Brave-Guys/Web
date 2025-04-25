import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import '../styles/CommentItem.css';

const CommentItem = ({
    name,
    time,
    content,
    likes,
    replies = [],
    onReplySubmit,
    depth = 0 // 댓글은 0, 답글은 1
}) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplyToggle = () => {
        setShowReplyInput(!showReplyInput);
    };

    const handleReplySubmit = () => {
        if (!replyText.trim()) return;
        onReplySubmit(replyText); // parentId는 외부에서 지정해줌
        setReplyText('');
        setShowReplyInput(false);
    };

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
                <div className="comment-like">
                    <ThumbsUp size={16} color="red" /> <span>{likes}</span>
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
                            key={reply._id}
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
