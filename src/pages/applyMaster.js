import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ApplyMaster.css';
import PageTitle from '../components/PageTitle';

const ApplyMaster = () => {
    const [agreePublish, setAgreePublish] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!agreePublish || !agreePrivacy) {
            alert('모든 필수 동의 항목에 체크해 주세요.');
            return;
        }
        alert('신청이 완료되었습니다!');
        navigate('/'); // 또는 완료 페이지로 이동
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
                <input type="text" placeholder="이름" />
                <input type="text" placeholder="010-XXXX-XXXX" />
            </section>

            <section className="form-section">
                <h3>경력 정보</h3>
                <label>보유 자격증</label>
                <input type="file" multiple />
                <label>경력사항</label>
                <input type="text" placeholder="트레이너/강사" />
                <label>주력 부위</label>
                <select>
                    <option>코어, 유산소</option>
                    <option>상체</option>
                    <option>하체</option>
                    <option>전신</option>
                </select>
            </section>

            <section className="form-section">
                <h3>추가 정보</h3>
                <textarea placeholder="자기 소개 및 트레이닝 관련 철학" />
                <textarea placeholder="SNS 또는 개인 웹사이트 링크 (선택 사항)" />
                <label>트레이너 활동 관련 포트폴리오 (선택 사항)</label>
                <input type="file" multiple />
            </section>

            <section className="form-section checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={agreePublish}
                        onChange={(e) => setAgreePublish(e.target.checked)}
                    />
                    제출한 정보가 사실이며, 허위 기재 시 승인이 거절될 수 있음에 동의합니다.
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                    />
                    개인정보 처리 방침에 동의합니다.
                </label>
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
