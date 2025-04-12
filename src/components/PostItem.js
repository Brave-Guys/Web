import React from 'react';
import styles from '../styles/PostItem.module.css';
import { ThumbsUp, MessageCircle } from 'lucide-react';

const PostItem = ({ title, content, trail, likeCount, commentCount }) => {
    return (
        <div className={styles.postContainer}>
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
