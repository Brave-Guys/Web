import React, { useState, useEffect } from 'react';
import CustomSelect from '../components/CustomSelect';
import '../styles/Inquiry.css';

const Inquiry = () => {
    const [formData, setFormData] = useState({
        category: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.email) {
            setFormData((prev) => ({ ...prev, email: user.email }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (selected) => {
        setFormData({ ...formData, category: selected });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // API 호출 로직 위치
    };

    const categories = ['계정 관련', '결제/환불', '버그 제보', '기능 제안', '기타'];

    return (
        <div className="inquiry-container">
            <h2>고객센터 / 문의하기</h2>
            <p className="inquiry-description">
                서비스 이용 중 궁금한 점이나 불편한 사항이 있다면 언제든지 문의해주세요.
            </p>

            {!submitted ? (
                <form className="inquiry-form" onSubmit={handleSubmit}>
                    <div className="inquiry-field">
                        <label htmlFor="category">문의 종류</label>
                        <CustomSelect
                            options={categories}
                            value={formData.category}
                            onChange={handleCategoryChange}
                            placeholder="문의 종류를 선택하세요"
                        />
                    </div>

                    <div className="inquiry-field">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="inquiry-field">
                        <label htmlFor="message">문의 내용</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">문의하기</button>
                </form>
            ) : (
                <div className="inquiry-thankyou">
                    <h3>문의가 접수되었습니다 😊</h3>
                    <p>최대한 빠르게 답변드리겠습니다. 감사합니다!</p>
                </div>
            )}
        </div>
    );
};

export default Inquiry;
