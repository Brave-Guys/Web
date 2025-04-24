import React from 'react';
import { ThumbsUp } from 'lucide-react';
import '../styles/CommentItem.css';

const CommentItem = ({ name, time, content, likes }) => {
    return (
        <div className="comment-item">
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
                <span className="comment-reply">답글</span>
            </div>
        </div>
    );
};

export default CommentItem;
