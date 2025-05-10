import axios from 'axios';

export const updateChallenge = async (id, updatedData) => {
    const token = localStorage.getItem('token');

    const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/challenges/${id}`,
        updatedData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
