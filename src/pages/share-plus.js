import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyShareRequests } from '../apis/getSharePlus';
import PageTitle from '../components/PageTitle';
import DefaultAvatar from '../assets/person.png';
import '../styles/SharePlus.css';

const ShareComment = () => {
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

    return (
        <div className="shareplus-wrapper">
            <PageTitle
                title="Share+"
                description="운동에 도움이 필요하신가요? 상급자와 함께해 보세요."
                showBackArrow={true}
            />
            <div className="my-request-list">
                {myRequests.map((req) => {
                    const statusText =
                        req.status === 'PENDING' ? '검토 중' :
                            req.status === 'REJECTED' ? '거절됨' : '';

                    const cardContent = (
                        <div className="my-request-card" key={req.id}>
                            <div className="my-request-header">
                                <img
                                    src={req.profileImgUrl || DefaultAvatar}
                                    alt="상급자 이미지"
                                    className="my-request-profile"
                                />
                                <span className="my-request-nickname">{req.nickname}</span>
                                <span>{statusText || ''}</span>
                            </div>
                        </div>
                    );

                    return req.status === 'APPROVED' ? (
                        <Link to={`/share/${req.id}/chat`} key={req.id}>
                            {cardContent}
                        </Link>
                    ) : (
                        <div key={req.id}>{cardContent}</div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShareComment;
