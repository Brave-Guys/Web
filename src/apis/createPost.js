import axios from 'axios';

export const createPost = async ({ writerId, name, content, category, imageUrls }) => {
    const token = localStorage.getItem('token');

    const response = await axios.post(
        `http://localhost:8081/posts`,
        {
            writerId,
            name,
            content,
            category,
            imageUrls,
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
