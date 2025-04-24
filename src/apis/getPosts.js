import axios from 'axios';

export const getPosts = async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data; // posts 배열을 기대
};
