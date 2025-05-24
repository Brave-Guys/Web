import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyShareRequests } from '../apis/getSharePlus';
import PageTitle from '../components/PageTitle';
import DefaultAvatar from '../assets/person.png';
import '../styles/SharePlus.css';

const SharePlus = () => {
    const [myRequests, setMyRequests] = useState([]);

    useEffect(() => {
        const fetchMyRequests = async () => {
            try {
                const requests = await getMyShareRequests();
                setMyRequests(requests);
            } catch (err) {
                console.error('나의 Share+ 신청서 불러오기 실패:', err);
            }
        };
        fetchMyRequests();
    }, []);

    const userPlanType = JSON.parse(localStorage.getItem('user'))?.userPlanType ?? '사용자';
    const approved = myRequests.filter((r) => r.status === 'APPROVED');
    const pending = myRequests.filter((r) => r.status === 'PENDING');
    const rejected = myRequests.filter((r) => r.status === 'REJECTED');

    const renderCard = (req, clickable = false) => {
        const statusText =
            req.status === 'PENDING' ? '검토 중' :
                req.status === 'REJECTED' ? '거절됨' : '';

        const card = (
            <div className={`my-request-card2 ${req.status !== 'APPROVED' ? 'disabled' : ''}`} key={req.id}>
                <img
                    src={req.profileImgUrl || DefaultAvatar}
                    alt="상급자 이미지"
                    className="my-request-profile2"
                />
                <span className="my-request-nickname2">{req.nickname}</span>
                {statusText && <span className="my-request-status">{statusText}</span>}
            </div>
        );

        return clickable
            ? <Link to={`/share/${req.id}/chat`} className="card-link" key={req.id}>{card}</Link>
            : card;
    };

    return (
        <div>
            <div className="shareplus-header">
                <PageTitle
                    title="Share+"
                    description="운동에 도움이 필요하신가요? 상급자와 함께해 보세요."
                    showBackArrow={true}
                />
                <Link to="/share-plan" className="change-plan-btn">내 플랜 업그레이드</Link>
            </div>

            <div style={{ margin: '50px' }}></div>

            {approved.length > 0 && (
                <section>
                    <div className="my-request-list-grid">
                        {approved.map((r) => renderCard(r, true))}
                    </div>
                </section>
            )}

            {pending.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '18px' }} className="section-title">검토 중</h3>
                    <div className="my-request-list-grid">
                        {pending.map((r) => renderCard(r))}
                    </div>
                </section>
            )}

            {rejected.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '18px' }} className="section-title">거절됨</h3>
                    <div className="my-request-list-grid">
                        {rejected.map((r) => renderCard(r))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default SharePlus;
