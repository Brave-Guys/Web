import React, { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { toggleLike, checkLikeStatus } from '../apis/toggleLike';
import '../styles/CommentItem.css';
import DefaultAvatar from '../assets/person.png'; // 기본 이미지

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale('ko', {
    ...dayjs.Ls.ko,
    relativeTime: {
        ...dayjs.Ls.ko.relativeTime,
        s: '방금 ',
    },
});

const CommentItem = ({
    name,
    time,
    content,
    likes,
    replies = [],
    onReplySubmit,
    depth = 0,
    commentId,
}) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes || 0);

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
        }
    };

    const handleReplyToggle = () => {
        setShowReplyInput(!showReplyInput);
    };

    const handleReplySubmit = () => {
        if (!replyText.trim()) return;
        onReplySubmit(replyText);
        setReplyText('');
        setShowReplyInput(false);
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

    const formattedTime = dayjs.utc(time).tz('Asia/Seoul').fromNow();

    return (
        <div className={`comment-item ${depth > 0 ? 'reply-item' : ''}`}>
            <div className="comment-layout">
                <img src={DefaultAvatar} alt="avatar" className="avatar" />
                <div className="comment-main">
                    <div className="comment-header">
                        <span className="comment-nickname">{name}</span>
                        <span className="comment-time">{formattedTime}</span>
                    </div>
                    <div className="comment-content">{content}</div>
                    <div className="comment-actions">
                        <div className="comment-like" onClick={handleToggleLike}>
                            <ThumbsUp size={16} color={liked ? 'red' : '#999'} fill={liked ? 'red' : 'none'} />
                            <span>{likeCount}</span>
                        </div>
                        {depth === 0 && (
                            <span className="comment-reply" onClick={handleReplyToggle}>{showReplyInput ? '답글 취소' : '답글'}</span>
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
                                    commentId={reply._id}
                                    name={reply.nickname}
                                    time={reply.writeDate}
                                    content={reply.content}
                                    likes={reply.likes || 0}
                                    replies={reply.replies || []}
                                    onReplySubmit={(text) => onReplySubmit(text, reply._id)}
                                    depth={depth + 1}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
