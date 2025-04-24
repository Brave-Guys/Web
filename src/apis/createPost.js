import axios from 'axios';

export const createPost = async ({ writerId, name, content, category }) => {
    const token = localStorage.getItem('token');

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        {
            writerId,
            name,
            content,
            category,
            createDate: new Date().toISOString(),
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};
