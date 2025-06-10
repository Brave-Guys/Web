import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PageTitle from '../components/PageTitle';
import DefaultAvatar from '../assets/person.png';
import LoadingOverlay from '../components/LoadingOverlay';
import { uploadImageToFirebase } from '../utils/uploadImageToFirebase';
import '../styles/ShareChat.css';

const ShareChat = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newContent, setNewContent] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [masterId, setMasterId] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const formatDateToLocalString = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('ko-KR', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/share-comments/share/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments(res.data);
        } catch (err) {
            console.error('댓글 목록 불러오기 실패:', err);
        }
    };

    useEffect(() => {
        const fetchMasterId = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/share-requests/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMasterId(res.data.masterId);
            } catch (err) {
                console.error('상급자 정보 로딩 실패', err);
            }
        };

        fetchMasterId();
        fetchComments();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        let pictureUrl = null;
        if (newImage) {
            try {
                pictureUrl = await uploadImageToFirebase(newImage);
            } catch (err) {
                alert('이미지 업로드 실패');
                setSubmitting(false);
                return;
            }
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/share-comments`, {
                shareId: id,
                writerId: user.id,
                date: formatDateToLocalString(selectedDate),
                content: newContent,
                picture: pictureUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setNewContent('');
            setNewImage(null);
            fetchComments();
        } catch (err) {
            alert('댓글 등록 실패');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredComments = selectedDate
        ? comments.filter(c => c.date === formatDateToLocalString(selectedDate))
        : comments;

    return (
        <div className="sharechat-wrapper">
            {submitting && <LoadingOverlay visible={true} />}
            <div className="page-header-row">
                <PageTitle
                    title="상급자와의 소통"
                    description="질문과 답변을 날짜별로 나눠 확인해보세요."
                    showBackArrow={true}
                />

                <button
                    className="terminate-button"
                    onClick={async () => {
                        const confirm = window.confirm('정말로 이 상급자로부터 가이드를 그만 받으시겠습니까?');
                        if (!confirm) return;

                        try {
                            const token = localStorage.getItem('token');
                            const user = JSON.parse(localStorage.getItem('user'));
                            await await axios.delete(`${process.env.REACT_APP_API_URL}/share-requests/connection/${id}`, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            alert('이 상급자와의 Share+가 해제되었습니다.');
                            window.history.back();
                        } catch (err) {
                            alert('계약 종료에 실패했습니다.');
                            console.error(err);
                        }
                    }}
                >
                    Share+ 끊기
                </button>

            </div>

            <div style={{ margin: '50px' }}></div>

            <div className="chat-grid">
                {/* 왼쪽: 캘린더 + 입력 */}
                <div className="chat-left">
                    <div className="chat-calendar">
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            tileClassName={({ date }) => {
                                const today = new Date();
                                const isToday =
                                    date.getFullYear() === today.getFullYear() &&
                                    date.getMonth() === today.getMonth() &&
                                    date.getDate() === today.getDate();

                                return isToday ? 'highlight' : null;
                            }}
                            tileContent={({ date }) => {
                                const formatted = formatDateToLocalString(date);
                                const hasComment = comments.some(c => c.date === formatted);
                                return hasComment ? <div className="dot" /> : null;
                            }}
                            formatDay={(locale, date) => String(date.getDate())}
                            prev2Label={null}
                            next2Label={null}
                        />
                    </div>

                    <form className="chat-form" onSubmit={handleSubmit}>
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="질문이나 의견을 입력하세요."
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewImage(e.target.files[0])}
                        />
                        <button type="submit">등록</button>
                    </form>

                </div>

                {/* 오른쪽: 댓글 목록 */}
                <div className="chat-right">
                    <div className="feedback-title">📬 피드백 내용</div>
                    <div className="chat-scroll-wrapper">
                        <div className="chat-list">
                            {[...filteredComments]
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((c) => (
                                    <div
                                        key={c.id}
                                        className={`chat-item ${c.writerId === masterId ? 'chat-master' : 'chat-student'}`}
                                    >
                                        <div className="chat-meta">
                                            <img
                                                src={c.profileImgUrl || DefaultAvatar}
                                                alt="프로필"
                                                className="chat-profile-img"
                                            />
                                            <div>
                                                <p className="chat-writer">
                                                    {c.nickname || '익명'} {c.writerId === masterId && <span className="chat-badge">상급자</span>}
                                                </p>
                                                <p className="chat-time">{formatTime(c.createdAt)}</p>
                                            </div>
                                        </div>
                                        <p>{c.content}</p>
                                        {c.picture && <img src={c.picture} alt="첨부" className="chat-image" />}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareChat;
