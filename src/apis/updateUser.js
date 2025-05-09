import axios from 'axios';

export const updateUserNickname = async (userId, nickname) => {
    const token = localStorage.getItem('token');

    const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
        { nickname },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
