import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postSharePlusRequest } from '../apis/applySharePlus';
import '../styles/SharePlusApply.css';
import axios from 'axios';

const SharePlusApply = () => {
    const { seniorId } = useParams();
    const navigate = useNavigate();
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await postSharePlusRequest({
                masterId: seniorId,
                userId: user.id,
                age,
                height,
                weight,
                gender,
                content: message
            });
            alert('신청이 완료되었습니다!');
            navigate('/share-plus');
        } catch (error) {
            console.error('신청 오류:', error);
            alert('신청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="shareplus-wrapper">
            <h2>Share+ 신청서</h2>
            <form className="shareplus-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group">
                        <label>나이</label>
                        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25세" />
                    </div>
                    <div className="form-group">
                        <label>성별</label>
                        <div className="gender-options">
                            <label><input type="radio" value="남자" checked={gender === '남자'} onChange={(e) => setGender(e.target.value)} /> 남자</label>
                            <label><input type="radio" value="여자" checked={gender === '여자'} onChange={(e) => setGender(e.target.value)} /> 여자</label>
                            <label><input type="radio" value="기타" checked={gender === '기타'} onChange={(e) => setGender(e.target.value)} /> 기타</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label>키</label>
                        <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="173cm" />
                    </div>
                    <div className="form-group">
                        <label>몸무게</label>
                        <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="75kg" />
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>상급자에게 그 외로 전달하고 싶은 내용이 있으면 자유롭게 작성해주세요. (600자 미만)</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={600}
                        placeholder="건강 관련 특이사항, 바라는 점 등"
                    />
                </div>

                <div className="form-footer">
                    <button type="submit" className="submit-button">제출</button>
                </div>
            </form>
        </div>
    );
};

export default SharePlusApply;
