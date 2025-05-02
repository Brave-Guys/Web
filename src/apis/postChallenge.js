import axios from 'axios';

export const postChallenge = async ({ name, description, writerId, videoUrl }) => {
    const token = localStorage.getItem('token');

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/challenges`,
        { name, description, writerId, videoUrl },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
