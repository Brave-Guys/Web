import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Masters.css';
import PageTitle from '../components/PageTitle';
import { getApprovedMasters } from '../apis/getMasterRequest';

const Masters = () => {
    const [seniorUsers, setSeniorUsers] = useState([]);

    useEffect(() => {
        const fetchSeniors = async () => {
            try {
                const data = await getApprovedMasters();
                setSeniorUsers(data);
            } catch (err) {
                console.error('상급자 정보 불러오기 실패:', err);
            }
        };
        fetchSeniors();
    }, []);

    return (
        <div className="masterpage-wrapper">
            <div className="title-row">
                <PageTitle
                    title="상급자"
                    description="부위별 상급자를 만나보세요."
                    showBackArrow={true}
                />
                <Link to="/how-to-be-master" className="help-link">
                    상급자가 되려면 어떻게 해야 하나요?
                </Link>
            </div>
            <div className="senior-user-list">
                {seniorUsers.length === 0 ? (
                    <p>등록된 상급자가 없습니다.</p>
                ) : (
                    seniorUsers.map((user) => (
                        <div key={user.id} className="senior-user-card">
                            <p className="card-name"><strong>{user.name}</strong></p>
                            <p className="card-part">{user.parts}</p>
                            <p className="card-intro">{user.intro}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Masters;
