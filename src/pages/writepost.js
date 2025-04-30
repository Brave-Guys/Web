import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import CustomButton from '../components/CustomButton';
import { createPost } from '../apis/createPost';
import '../styles/WritePost.css';

const WritePost = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        content: '',
        category: '잡담',
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        try {
            await createPost({
                writerId: user._id,
                name: form.title,
                content: form.content,
                category: form.category,
            });
            alert('글이 성공적으로 등록되었습니다!');
            navigate('/board');
        } catch (err) {
            alert('글 등록 실패: ' + (err.response?.data?.message || '알 수 없는 오류'));
        }
    };

    return (
        <div className="write-post-container">
            <PageTitle title="글 작성" description="운동 관련 이야기를 나누어 보세요" showBackArrow={true} />

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
                    내용
                    <textarea
                        rows={10}
                        value={form.content}
                        onChange={handleChange('content')}
                        placeholder="내용을 입력하세요"
                    />
                </label>

                <div className="footer-buttons">
                    {/* 분류 셀렉트 박스 */}
                    <select
                        className="post-category-select"
                        value={form.category}
                        onChange={handleChange('category')}
                    >
                        <option value="잡담">잡담</option>
                        <option value="식단">식단</option>
                        <option value="루틴">루틴</option>
                        <option value="공지">공지</option>
                    </select>

                    {/* 버튼 묶음 */}
                    <div className="post-button-group">
                        <CustomButton
                            label="취소"
                            size="small"
                            color="gray"
                            onClick={() => navigate(-1)}
                        />
                        <CustomButton
                            label="완료"
                            size="small"
                            color="purple"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default WritePost;
