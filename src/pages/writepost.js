import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import '../styles/WritePost.css'; // 필요 시 스타일 분리
import axios from 'axios';

const WritePost = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        content: '',
        category: '잡담'
    });

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            await axios.post(`${process.env.REACT_APP_API_URL}/posts`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('글이 성공적으로 작성되었습니다!');
            navigate('/board'); // 게시판으로 이동
        } catch (err) {
            alert('글 작성 실패: ' + (err.response?.data?.message || '알 수 없는 오류'));
        }
    };

    return (
        <div className="write-post-container">
            <PageTitle title="글 작성" description="운동 기록을 나눠보세요" showBackArrow={true} />

            <div className="write-post-form">
                <label>
                    제목
                    <input
                        type="text"
                        value={form.title}
                        onChange={handleChange('title')}
                        placeholder="제목을 입력하세요"
                    />
                </label>

                <label>
                    분류
                    <select value={form.category} onChange={handleChange('category')}>
                        <option value="잡담">잡담</option>
                        <option value="식단">식단</option>
                        <option value="루틴">루틴</option>
                        <option value="공지">공지</option>
                    </select>
                </label>

                <label>
                    내용
                    <textarea
                        rows={10}
                        value={form.content}
                        onChange={handleChange('content')}
                        placeholder="내용을 입력하세요"
                    />
                </label>

                <button className="submit-btn" onClick={handleSubmit}>글 등록</button>
            </div>
        </div>
    );
};

export default WritePost;
