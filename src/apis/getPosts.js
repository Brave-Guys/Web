import axios from 'axios';

export const getPosts = async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const getPostsByPage = async (page = 1) => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/paginated/${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
};

export const getPopularPosts = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/popular`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

