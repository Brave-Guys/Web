import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParticipantDetail } from '../apis/getParticipantDetail';
import { postReelsComment } from '../apis/postReelsComment';
import { getReelsComments } from '../apis/getReelsComments';
import { deleteReelsComment } from '../apis/deleteReelsComment';
import { updateReelsComment } from '../apis/updateReelsComment';
import DefaultAvatar from '../assets/person.png';
import PageTitle from '../components/PageTitle';
import CustomButton from '../components/CustomButton';
import dayjs from 'dayjs';
import '../styles/ParticipantDetail.css';

const ParticipantDetail = () => {
    const { challengeId, participantId } = useParams();
    const [participant, setParticipant] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;

    const fetchComments = async () => {
        const data = await getReelsComments(participantId);
        setComments(data);
    };

    const handleSubmitComment = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !commentText.trim()) return;

        try {
            await postReelsComment({
                reelsId: participantId,
                writerId: user.id,
                content: commentText,
            });
            setCommentText('');
            fetchComments();
        } catch (err) {
            console.error('댓글 등록 실패', err);
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
        try {
            await deleteReelsComment(commentId);
            fetchComments();
        } catch (err) {
            console.error('댓글 삭제 실패', err);
            alert('삭제 중 오류 발생');
        }
    };

    const handleEditSave = async (commentId) => {
        try {
            await updateReelsComment({ rcommentId: commentId, content: editText });
            setEditingCommentId(null);
            setEditText('');
            fetchComments();
        } catch (err) {
            console.error('댓글 수정 실패', err);
            alert('수정 중 오류 발생');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getParticipantDetail(challengeId, participantId);
            setParticipant(data);
            fetchComments();
        };
        fetchData();
    }, [challengeId, participantId]);

    if (!participant) return <div>로딩 중...</div>;

    return (
        <div className="participant-detail-page">
            <PageTitle
                title={`${participant.nickname}님의 수행 내역`}
                description={dayjs(participant.writeDate).format('YYYY.MM.DD HH:mm')}
                showBackArrow={true}
                onBack={() => navigate(-1)}
            />
            <div className="participant-detail-wrapper">
                <div className="participant-main">
                    <p className="participant-detail-content">{participant.content}</p>
                    {participant.videoUrl && (
                        <div className="participant-video-wrapper">
                            <video
                                src={participant.videoUrl}
                                autoPlay
                                muted
                                controls
                                preload="metadata"
                                style={{ width: '100%', maxWidth: '640px' }}
                            />
                        </div>
                    )}
                </div>

                <div className="participant-comments">
                    <div className="comment-form">
                        <textarea
                            className={`comment-textarea ${isFocused || commentText ? 'expanded' : ''}`}
                            placeholder="댓글을 입력하세요"
                            value={commentText}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                if (!commentText.trim()) setIsFocused(false);
                            }}
                            onChange={(e) => setCommentText(e.target.value)}
                            maxLength={300}
                        />
                        {isFocused && (
                            <div
                                className="comment-action-buttons visible"
                                style={{
                                    justifyContent: 'flex-end',
                                    gap: '6px',
                                    marginTop: '6px'
                                }}
                            >
                                <CustomButton
                                    label="취소"
                                    size="small"
                                    color="gray"
                                    onClick={() => {
                                        setCommentText('');
                                        setIsFocused(false);
                                    }}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '13px',
                                        height: '32px',
                                        maxWidth: '20%',
                                    }}
                                />
                                <CustomButton
                                    label="등록"
                                    size="small"
                                    onClick={handleSubmitComment}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '13px',
                                        height: '32px',
                                        maxWidth: '20%',
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ margin: '20px' }}></div>

                    <div className="comment-list">
                        {comments.map((c) => {
                            const isMine = currentUserId === c.writerId;
                            const isEditing = editingCommentId === c.rcommentId;

                            return (
                                <div key={c.rcommentId} className="comment-item">
                                    <div className="comment-layout">
                                        <img src={c.profileImgUrl || DefaultAvatar} alt="avatar" className="avatar" />

                                        <div className="comment-main">
                                            <div className="comment-header">
                                                <span className="comment-nickname">{c.nickname}</span>
                                                <span className="comment-time">{dayjs(c.writeDate).fromNow()}</span>
                                                {isMine && !isEditing && (
                                                    <div className="comment-controls">
                                                        <span className="comment-edit-btn" onClick={() => {
                                                            setEditingCommentId(c.rcommentId);
                                                            setEditText(c.content);
                                                        }}>
                                                            수정
                                                        </span>
                                                        <span className="comment-delete-btn" onClick={() => handleDelete(c.rcommentId)}>
                                                            삭제
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {isEditing ? (
                                                <div className="comment-edit-box">
                                                    <textarea
                                                        value={editText}
                                                        onChange={(e) => setEditText(e.target.value)}
                                                        className="comment-textarea"
                                                    />
                                                    <div>
                                                        <CustomButton
                                                            label="저장"
                                                            size="small"
                                                            onClick={() => handleEditSave(c.rcommentId)}
                                                            style={{ padding: '5px', width: '20%', height: '10%', fontSize: '12px' }}
                                                        />
                                                        <CustomButton
                                                            label="취소"
                                                            size="small"
                                                            color="gray"
                                                            onClick={() => {
                                                                setEditingCommentId(null);
                                                                setEditText('');
                                                            }}
                                                            style={{ padding: '5px', marginLeft: '8px', width: '20%', height: '10%', fontSize: '12px' }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>{c.content}</p>
                                            )}

                                            <div className="comment-actions">
                                                <div className="comment-like">👍 0</div>
                                                <span className="comment-reply">답글</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantDetail;
