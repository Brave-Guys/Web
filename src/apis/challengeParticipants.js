import axios from 'axios';

export const postParticipant = async ({ challengeId, writerId, content }) => {
    const token = localStorage.getItem('token');
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/challenges/${challengeId}/participants`,
        { writerId, content },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};

export const getParticipants = async (challengeId) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/challenges/${challengeId}/participants`,
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