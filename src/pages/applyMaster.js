import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ApplyMaster.css';
import PageTitle from '../components/PageTitle';
import { uploadMultipleImages } from '../utils/uploadImageToFirebase';
import { postApplyMaster } from '../apis/applyMaster';

const ApplyMaster = () => {
    const [agreePublish, setAgreePublish] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [selectedParts, setSelectedParts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [career, setCareer] = useState('');
    const [intro, setIntro] = useState('');
    const [link, setLink] = useState('');
    const [certFiles, setCertFiles] = useState([]);
    const [portfolioFiles, setPortfolioFiles] = useState([]);

    const navigate = useNavigate();

    const togglePart = (part) => {
        setSelectedParts((prev) =>
            prev.includes(part)
                ? prev.filter((p) => p !== part)
                : [...prev, part]
        );
    };

    const handleSubmit = async () => {
        if (!agreePublish || !agreePrivacy) {
            alert('모든 필수 동의 항목에 체크해 주세요.');
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.id;
            if (!userId) {
                alert('로그인 정보를 확인할 수 없습니다.');
                return;
            }

            const certUrls = await uploadMultipleImages(certFiles);
            const portfolioUrls = await uploadMultipleImages(portfolioFiles);

            await postApplyMaster({
                userId,
                name,
                phone,
                career,
                parts: selectedParts,
                intro,
                link,
                certFileUrls: certUrls,
                portfolioUrls
            });

            alert('신청이 완료되었습니다!');
            navigate('/');
        } catch (error) {
            alert('신청 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    return (
        <div className="apply-wrapper">
            <PageTitle
                title="상급자 신청"
                description="내가 상급자가 되어 유저들에게 운동을 도와줍니다."
                showBackArrow={true}
            />

            <section className="form-section">
                <h3>기본 정보</h3>
                <input
                    className="apply-input"
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="apply-input"
                    type="text"
                    placeholder="010-XXXX-XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </section>

            <section className="form-section">
                <h3>경력 정보</h3>
                <label>보유 자격증</label>
                <input
                    className="apply-input"
                    type="file"
                    multiple
                    onChange={(e) => setCertFiles(Array.from(e.target.files))}
                />
                <label>경력사항</label>
                <input
                    className="apply-input"
                    type="text"
                    placeholder="트레이너/강사"
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                />
                <label>주력 부위</label>
                <div className="multi-checkbox">
                    {['코어', '유산소', '상체', '하체', '전신'].map((part) => (
                        <label key={part}>
                            <input
                                type="checkbox"
                                value={part}
                                checked={selectedParts.includes(part)}
                                onChange={() => togglePart(part)}
                            />
                            {part}
                        </label>
                    ))}
                </div>
            </section>

            <section className="form-section">
                <h3>추가 정보</h3>
                <textarea
                    className="apply-textarea"
                    placeholder="자기 소개 및 트레이닝 관련 철학"
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                />
                <textarea
                    className="apply-textarea"
                    placeholder="SNS 또는 개인 웹사이트 링크 (선택 사항)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <label>트레이너 활동 관련 포트폴리오 (선택 사항)</label>
                <input
                    className="apply-input"
                    type="file"
                    multiple
                    onChange={(e) => setPortfolioFiles(Array.from(e.target.files))}
                />
            </section>

            <section className="form-section checkbox-group">
                <div className="checkbox-group-item">
                    <input
                        type="checkbox"
                        checked={agreePublish}
                        onChange={(e) => setAgreePublish(e.target.checked)}
                    />
                    <span className="checkbox-text">
                        제출한 정보가 사실이며, 허위 기재 시 승인이 거절될 수 있음에 동의합니다.
                    </span>
                </div>
                <div className="checkbox-group-item">
                    <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                    />
                    <span className="checkbox-text">
                        개인정보 처리 방침에 동의합니다.
                    </span>
                </div>
            </section>

            <div className="form-footer">
                <button className="submit-button" onClick={handleSubmit}>
                    제출
                </button>
            </div>
        </div>
    );
};

export default ApplyMaster;