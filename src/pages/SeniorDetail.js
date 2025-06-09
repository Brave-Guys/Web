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
    const [limitReached, setLimitReached] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await getMasterRequestById(id);
            setProfile(data);

            const requests = await getMyShareRequests();
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const plan = currentUser?.userPlanType || 'BEGINNER';
            const activeCount = requests.filter(r => ['APPROVED', 'PENDING'].includes(r.status)).length;
            const limit = plan === 'PRO' ? 4 : plan === 'AMATEUR' ? 2 : 0;
            setLimitReached(activeCount >= limit);
        };
        fetch();
    }, [id]);

    if (!profile) return <div className="loading">로딩 중...</div>;

    return (
        <div className="senior-detail-wrapper">
            <PageTitle title={`${profile.name} 상급자`} description="프로필 상세 정보" showBackArrow={true} />

            <div className="profile-card">
                <div className="profile-header">
                    <img src={profile.imageUrl || '/default-profile.png'} alt="상급자 프로필" className="profile-image" />
                    <div className="profile-basic">
                        <h2>{profile.name}</h2>
                        <p className="tag">{profile.parts}</p>
                    </div>
                </div>

                <div className="profile-info">
                    <div className="info-item">
                        <span className="label">경력</span>
                        <span>{profile.career}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="info-item">
                        <span className="label">소개</span>
                        <span>{profile.intro}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="info-item">
                        <span className="label">링크</span>
                        <a href={profile.link || '#'} target="_blank" rel="noreferrer">{profile.link || '없음'}</a>
                    </div>
                </div>
            </div>

            <div className="apply-box">
                <button
                    className={`shareplus-button ${limitReached ? 'disabled' : ''}`}
                    onClick={() => navigate(`/shareplus/apply/${profile.userId}`)}
                    disabled={limitReached}
                >
                    {limitReached ? '신청 제한 초과' : 'Share+ 신청하기'}
                </button>
                {limitReached && (
                    <p className="shareplus-limit-message">
                        현재 플랜에서는 최대 신청 수를 초과했습니다.
                    </p>
                )}
            </div>
        </div>


    );
};

export default SeniorDetail;
