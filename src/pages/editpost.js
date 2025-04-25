import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import '../styles/WritePost.css';
import { getPostDetail } from '../apis/getPostDetail';
import { updatePost } from '../apis/updatePost';

const EditPost = () => {
    const { id: postId } = useParams();
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

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPostDetail(postId);
                setForm({
                    title: post.name,
                    content: post.content,
                    category: post.category,
                });
            } catch (err) {
                alert('게시글을 불러오는 데 실패했습니다.');
                console.error(err);
            }
        };

        fetchPost();
    }, [postId]);

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        try {
            await updatePost(postId, {
                name: form.title,
                content: form.content,
                category: form.category,
            });
            alert('글이 성공적으로 수정되었습니다!');
            navigate(`/post/${postId}`);
        } catch (err) {
            alert('글 수정 실패: ' + (err.response?.data?.message || '알 수 없는 오류'));
        }
    };

    return (
        <div className="write-post-container">
            <PageTitle title="글 수정" description="게시글 내용을 수정하세요" showBackArrow={true} />

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

                <button className="submit-btn" onClick={handleSubmit}>
                    수정 완료
                </button>
            </div>
        </div>
    );
};

export default EditPost;