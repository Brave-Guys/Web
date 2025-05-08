import axios from 'axios';

export const getPostDetail = async (id) => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`http://localhost:8081/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
