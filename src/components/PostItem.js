import React from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DefaultAvatar from '../assets/person.png';
import '../styles/PostItem.css';

const PostItem = ({ postId, title, content, trail, likeCount, commentCount }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/post/${postId}`);
    };
    return (
        <div className="post-card" onClick={handleClick}>
            <div className="post-card-left">
                <img className="avatar" src={DefaultAvatar} alt="작성자" />
            </div>

            <div className="post-card-content">
                <div className="post-header">
                    <div>
                        <div className="post-title">{title}</div>
                        <div className="post-writer">{trail.split(' | ')[0]}</div>
                    </div>
                    <div className="post-time">{trail.split(' | ')[1]}</div>
                </div>

                <div className="post-footer">
                    <div className="post-icon-group">
                        <ThumbsUp size={18} />
                        <span>{likeCount}</span>
                        <MessageCircle size={18} style={{ marginLeft: '12px' }} />
                        <span>{commentCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
