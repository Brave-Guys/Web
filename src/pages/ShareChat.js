import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PageTitle from '../components/PageTitle';
import { uploadImageToFirebase } from '../utils/uploadImageToFirebase';
import '../styles/ShareChat.css';

const ShareChat = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [newContent, setNewContent] = useState('');
    const [newImage, setNewImage] = useState(null);

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
        fetchComments();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        let pictureUrl = null;
        if (newImage) {
            try {
                pictureUrl = await uploadImageToFirebase(newImage);
            } catch (err) {
                alert('이미지 업로드 실패');
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
        }
    };

    const filteredComments = selectedDate
        ? comments.filter(c => {
            const d =
                selectedDate.getFullYear() +
                '-' +
                String(selectedDate.getMonth() + 1).padStart(2, '0') +
                '-' +
                String(selectedDate.getDate()).padStart(2, '0');
            return c.date === d;
        })
        : comments;


    return (
        <div className="sharechat-wrapper">
            <PageTitle title="상급자와의 소통" description="질문과 답변을 날짜별로 나눠 확인해보세요." showBackArrow={true} />

            <div style={{ margin: '50px' }}></div>

            <div className="chat-grid">
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

                <div className="chat-main">
                    <form className="chat-form" onSubmit={handleSubmit}>
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="질문이나 의견을 입력하세요."
                            required
                        />
                        <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
                        <button type="submit">등록</button>
                    </form>

                    <div className="chat-list">
                        {[...filteredComments]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((c) => (
                                <div key={c.id} className="chat-item">
                                    <div className="chat-meta">
                                        <img
                                            src={c.profileImgUrl || '/default-profile.png'}
                                            alt="프로필"
                                            className="chat-profile-img"
                                        />
                                        <div>
                                            <p className="chat-writer">{c.nickname || '익명'}</p>
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
    );
};

export default ShareChat;
