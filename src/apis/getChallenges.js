import axios from 'axios';

export const getChallenges = async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/challenges`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data; // 챌린지 배열 반환
};
