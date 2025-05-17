import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminRoom.css';

const AdminRoom = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/apply-master`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setRequests(res.data);
            } catch (err) {
                console.error('신청서 조회 실패:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="admin-wrapper">
            <h2>상급자 신청 관리</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>연락처</th>
                        <th>주력 부위</th>
                        <th>경력</th>
                        <th>자격증</th>
                        <th>포트폴리오</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req.id}>
                            <td>{req.name}</td>
                            <td>{req.phone}</td>
                            <td>{req.parts}</td>
                            <td>{req.career}</td>
                            <td>
                                {req.certFileUrls?.split(',').map((url, i) => (
                                    <a key={i} href={url} target="_blank" rel="noreferrer">[파일{i + 1}]</a>
                                ))}
                            </td>
                            <td>
                                {req.portfolioUrls?.split(',').map((url, i) => (
                                    <a key={i} href={url} target="_blank" rel="noreferrer">[포트{i + 1}]</a>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminRoom;
