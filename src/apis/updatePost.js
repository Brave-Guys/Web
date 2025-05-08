import axios from 'axios';

export const updatePost = async (postId, updatedData) => {
    const token = localStorage.getItem('token');

    const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/posts/${postId}`,
        updatedData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};
