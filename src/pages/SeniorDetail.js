import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMasterRequestById } from '../apis/getMasterRequest';
import { getMyShareRequests } from '../apis/getSharePlus';
import PageTitle from '../components/PageTitle';
import '../styles/SeniorDetail.css';

const SeniorDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [myRequests, setMyRequests] = useState([]);
    const [limitReached, setLimitReached] = useState(false);


    useEffect(() => {
        const fetch = async () => {
            const data = await getMasterRequestById(id);
            setProfile(data);

            const requests = await getMyShareRequests();
            setMyRequests(requests);

            const currentUser = JSON.parse(localStorage.getItem('user'));
            const plan = currentUser?.userPlanType || 'BEGINNER';
            const activeRequests = requests.filter(r =>
                r.status === 'APPROVED' || r.status === 'PENDING'
            ).length;

            const limit = plan === 'PRO' ? 4 : plan === 'AMATEUR' ? 2 : 0;
            if (activeRequests >= limit) {
                setLimitReached(true);
            }
        };
        fetch();
    }, [id]);

    if (!profile) return <div>로딩 중...</div>;

    return (
        <div className="detail-wrapper">
            <PageTitle title={`${profile.name} 상급자`} description="프로필 상세 정보" showBackArrow={true} />
            <div style={{ margin: '50px' }}></div>

            <p><strong>경력:</strong> {profile.career}</p>
            <p><strong>주력 부위:</strong> {profile.parts}</p>
            <p><strong>소개:</strong> {profile.intro}</p>
            <p><strong>링크:</strong> {profile.link || '없음'}</p>


            <button
                className={`shareplus-button ${limitReached ? 'disabled' : ''}`}
                onClick={() => navigate(`/shareplus/apply/${profile.userId}`)}
                disabled={limitReached}
            >
                Share+ 신청
            </button>

            {limitReached && (
                <p className="shareplus-limit-message">
                    현재 플랜에서는 최대 신청 수를 초과했습니다.
                </p>
            )}
        </div>
    );
};

export default SeniorDetail;
