import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import { uploadImageToFirebase } from '../utils/uploadImageToFirebase';
import '../styles/ShareChat.css';

const ShareChat = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [newContent, setNewContent] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newImage, setNewImage] = useState(null);

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
                date: newDate,
                content: newContent,
                picture: pictureUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setNewContent('');
            setNewDate('');
            setNewImage(null);
            fetchComments();
        } catch (err) {
            alert('댓글 등록 실패');
            console.error(err);
        }
    };

    return (
        <div className="sharechat-wrapper">
            <PageTitle title="상급자와의 소통" description="질문과 답변을 날짜별로 나눠 확인해보세요." showBackArrow={true} />

            <form className="chat-form" onSubmit={handleSubmit}>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
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
                {comments.length === 0 ? (
                    <p>아직 댓글이 없습니다.</p>
                ) : (
                    comments.map((c) => (
                        <div key={c.id} className="chat-item">
                            <p><strong>{c.date}</strong> · 작성자 ID: {c.writerId}</p>
                            <p>{c.content}</p>
                            {c.picture && <img src={c.picture} alt="첨부" className="chat-image" />}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShareChat;
