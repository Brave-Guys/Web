import React from 'react';
import styles from '../styles/PostItem.module.css';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostItem = ({ postId, title, content, trail, likeCount, commentCount }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className={styles.postContainer} onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <div className={styles.trail}>{trail}</div>
            </div>
            <div className={styles.content}>{content}</div>
            <div className={styles.footer}>
                <div className={styles.iconGroup}>
                    <ThumbsUp size={25} color="#FF5A5A" />
                    <span className={styles.count}>{likeCount}</span>
                </div>
                <div className={styles.iconGroup}>
                    <MessageCircle size={25} color="#6C8BFF" />
                    <span className={styles.count}>{commentCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
