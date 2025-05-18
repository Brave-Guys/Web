import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMasterRequestById } from '../apis/getMasterRequest';
import PageTitle from '../components/PageTitle';

const SeniorDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const data = await getMasterRequestById(id);
            setProfile(data);
        };
        fetch();
    }, [id]);

    if (!profile) return <div>로딩 중...</div>;

    return (
        <div className="detail-wrapper">
            <PageTitle title={`${profile.name} 상급자`} description="프로필 상세 정보" showBackArrow={true} />
            <p><strong>경력:</strong> {profile.career}</p>
            <p><strong>주력 부위:</strong> {profile.parts}</p>
            <p><strong>소개:</strong> {profile.intro}</p>
            <p><strong>링크:</strong> {profile.link || '없음'}</p>


            <button
                className="shareplus-button"
                onClick={() => navigate(`/shareplus/apply/${profile.id}`)}
            >
                Share+ 신청
            </button>
        </div>
    );
};

export default SeniorDetail;
