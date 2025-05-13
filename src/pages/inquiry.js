import React, { useState } from 'react';
import '../styles/Inquiry.css';

const Inquiry = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // 실제 서비스에서는 이곳에서 API 호출
    };

    return (
        <div className="inquiry-container">
            <h2>고객센터 / 문의하기</h2>
            <p className="inquiry-description">
                서비스 이용 중 궁금한 점이나 불편한 사항이 있다면 언제든지 문의해주세요.
            </p>

            {!submitted ? (
                <form className="inquiry-form" onSubmit={handleSubmit}>
                    <div className="inquiry-field">
                        <label htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
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