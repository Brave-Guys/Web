import axios from 'axios';

export const deleteChallenge = async (id) => {
    const token = localStorage.getItem('token');

    const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/challenges/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
