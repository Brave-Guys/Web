import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const postSharePlusRequest = async ({ masterId, userId, age, height, weight, gender, content }) => {
    const token = localStorage.getItem('token');
    const res = await axios.post(
        `${API_URL}/share-requests`,
        {
            masterId,
            userId,
            age,
            height,
            weight,
            gender,
            content
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
};
