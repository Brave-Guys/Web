import React, { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { toggleLike, checkLikeStatus } from '../apis/toggleLike';
import { deleteComment } from '../apis/deleteComment';
import { updateComment } from '../apis/updateComment';
import '../styles/CommentItem.css';
import DefaultAvatar from '../assets/person.png';

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
        future: '%s 후',
        past: '%s ',
        s: '방금 ',
        m: '1분 ',
        mm: '%d분 ',
        h: '1시간 ',
        hh: '%d시간 ',
        d: '1일 ',
        dd: '%d일 ',
        M: '1개월 ',
        MM: '%d개월 ',
        y: '1년 ',
        yy: '%d년 ',
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
    writerId,
    onDeleteSuccess,
    onEditSuccess,
    profileImgUrl,
}) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes || 0);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(content);

    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
    const isMine = currentUserId === writerId;
    const formattedTime = dayjs.utc(time).tz('Asia/Seoul').fromNow();

    const handleToggleLike = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return alert('로그인이 필요합니다.');

            const result = await toggleLike({
                userId: user.id,
                postId: commentId,
                postType: 'community',
                postOrComment: 'comment',
            });

            setLiked(result.liked);
            setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1));
        } catch (err) {
            console.error('댓글 좋아요 토글 실패', err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
        try {
            await deleteComment(commentId);
            onDeleteSuccess();
        } catch (err) {
            console.error('댓글 삭제 실패', err);
            alert('댓글 삭제 중 오류 발생');
        }
    };

    const handleReplyToggle = () => setShowReplyInput(!showReplyInput);

    const handleReplySubmit = () => {
        if (!replyText.trim()) return;
        onReplySubmit(replyText);
        setReplyText('');
        setShowReplyInput(false);
    };

    const handleEdit = async () => {
        if (!editText.trim()) return;
        try {
            await updateComment({ commentId, content: editText });
            setIsEditing(false);
            onEditSuccess();
        } catch (err) {
            alert('댓글 수정 실패');
            console.error(err);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        const checkStatus = async () => {
            try {
                const result = await checkLikeStatus({
                    userId: user.id,
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
        <div key={commentId} className={`comment-item ${depth > 0 ? 'reply-item' : ''}`}>
            <div className="comment-layout">
                <img
                    src={profileImgUrl || DefaultAvatar}
                    alt="avatar"
                    className="avatar"
                />
                <div className="comment-main">
                    <div className="comment-header">
                        <span className="comment-nickname">{name}</span>
                        <span className="comment-time">{formattedTime}</span>
                        {isMine && !isEditing && (
                            <>
                                <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#999', cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
                                    수정
                                </span>
                                <span style={{ fontSize: '12px', color: '#999', cursor: 'pointer', marginLeft: '8px' }} onClick={handleDelete}>
                                    삭제
                                </span>
                            </>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="comment-reply-box" style={{ marginTop: '6px' }}>
                            <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                            <button onClick={handleEdit}>저장</button>
                            <button onClick={() => { setEditText(content); setIsEditing(false); }} style={{ backgroundColor: '#ccc', color: '#000' }}>
                                취소
                            </button>
                        </div>
                    ) : (
                        <div className="comment-content">{content}</div>
                    )}

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
                            {replies.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    commentId={reply.id}
                                    name={reply.nickname}
                                    time={reply.writeDate}
                                    content={reply.content}
                                    likes={reply.likes || 0}
                                    replies={reply.replies || []}
                                    onReplySubmit={(text) => onReplySubmit(text, reply.id)}
                                    depth={depth + 1}
                                    writerId={reply.writerId}
                                    onDeleteSuccess={onDeleteSuccess}
                                    onEditSuccess={onEditSuccess}
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
