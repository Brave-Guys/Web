import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import DefaultAvatar from '../assets/person.png';
import '../styles/SharePlus.css';

const ShareComment = () => {
    const [myRequests, setMyRequests] = useState([]);

    useEffect(() => {
        const fetchMyRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/share-requests/user/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setMyRequests(res.data);
            } catch (err) {
                console.error('나의 Share+ 신청서 불러오기 실패:', err);
            }
        };
        fetchMyRequests();
    }, []);

    return (
        <div className="shareplus-wrapper">
            <PageTitle
                title="Share+ 신청 내역"
                description="진행 중인 Share+ 신청서를 확인하세요."
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
