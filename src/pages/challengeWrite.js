import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import CustomButton from '../components/CustomButton';
import { postChallenge } from '../apis/postChallenge';
import '../styles/ChallengeWrite.css';

const ChallengeWrite = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const now = new Date();
        const oneWeekLater = new Date();
        oneWeekLater.setDate(now.getDate() + 7);

        const format = (date) => date.toISOString().split('T')[0];

        setStartDate(format(now));
        setEndDate(format(oneWeekLater));
    }, []);

    const handleSubmit = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('로그인이 필요합니다.');
            return;
        }

        if (!title.trim() || !description.trim()) {
            alert('제목과 설명을 모두 입력해주세요.');
            return;
        }

        try {
            const res = await postChallenge({
                writerId: user._id,
                name: title.trim(),
                description: description.trim(),
            });

            alert('챌린지 등록 완료!');
            navigate('/challenges');
        } catch (err) {
            console.error('챌린지 등록 실패', err);
            alert('챌린지 등록에 실패했습니다.');
        }
    };

    return (
        <div className="challenge-write-container">
            <PageTitle title="챌린지 등록" showBackArrow={true} />

            <div className="challenge-form">
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="challenge-input"
                />

                <textarea
                    placeholder="챌린지 설명을 입력하세요"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="challenge-textarea"
                />

                <div className="challenge-date-display">
                    기간: {startDate} ~ {endDate}
                </div>

                <div className="challenge-submit-row">
                    <CustomButton
                        label="등록"
                        size="large"
                        color="purple"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChallengeWrite;
