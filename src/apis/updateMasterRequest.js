import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const approveMasterRequest = async (requestId, userId) => {
    await axios.patch(`${API_URL}/users/${userId}/role`, { role: 'SENIOR' }, {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    });

    await axios.patch(`${API_URL}/apply-master/${requestId}/approve`, {}, {
        headers: authHeader(),
    });
};

export const rejectMasterRequest = async (requestId) => {
    await axios.patch(`${API_URL}/apply-master/${requestId}/reject`, {}, {
        headers: authHeader(),
    });
};