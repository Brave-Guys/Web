import axios from 'axios';

export const getPostDetail = async (id) => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
