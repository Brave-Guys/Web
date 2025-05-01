import axios from 'axios';

export const postChallenge = async (challengeData) => {
    const token = localStorage.getItem('token');

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/challenges`,
        challengeData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
