import axios from 'axios';

export const getPosts = async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`http://localhost:8081/posts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const getPostsByPage = async (page = 1, category, userId) => {
    const token = localStorage.getItem('token');

    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (userId) params.append('userId', userId);

    const response = await axios.get(
        `http://localhost:8081/posts/paginated/${page}?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );

    return response.data;
};

export const getPopularPosts = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8081/posts/popular`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

