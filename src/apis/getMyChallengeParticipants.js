import axios from 'axios';

export const getMyChallengeParticipants = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/challenge_participants/my`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            writerId: userId,
        },
    });
    return response.data;
};