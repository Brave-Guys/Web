import React, { useEffect, useState } from 'react';
import { getAllMasterRequests } from '../apis/getMasterRequest';
import PageTitle from '../components/PageTitle';
import '../styles/AdminRoom.css';
import { Link } from 'react-router-dom';

const AdminRoom = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getAllMasterRequests();
            setRequests(data);
        };
        fetch();
    }, []);

    return (
        <div className="admin-wrapper">
            <PageTitle
                title='관리자의 방'
                description='회원을 관리해보세요.'
                showBackArrow={true}
            />

            <div style={{ margin: '50px' }}></div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>상급자 신청 관리</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req.id}>
                            <td>
                                <Link to={`/admin/apply/${req.id}`}>{req.name}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminRoom;
