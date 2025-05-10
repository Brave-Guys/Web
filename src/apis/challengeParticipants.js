import axios from 'axios';

export const postParticipant = async ({ challengeId, writerId, content, videoUrl }) => {
    const token = localStorage.getItem('token');
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/challenge_participants/${challengeId}`,
        { challengeId, writerId, content, videoUrl },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};

export const getParticipants = async (challengeId) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/challenge_participants/${challengeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};

export const checkParticipation = async (challengeId, writerId) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/challenge_participants/${challengeId}/check`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { writerId },
        }
    );
    return res.data.exists;
};

export const deleteParticipant = async (challengeId, userId) => {
    const token = localStorage.getItem('token');

    const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/challenge_participants/${challengeId}/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};