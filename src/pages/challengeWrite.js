import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import CustomButton from '../components/CustomButton';
import '../styles/ChallengeWrite.css';

const ChallengeWrite = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = () => {
        if (!title || !description || !startDate || !endDate) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        // TODO: API 호출 로직
        console.log({ title, description, startDate, endDate });
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

                <div className="challenge-date-row">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="challenge-date-input"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="challenge-date-input"
                    />
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
