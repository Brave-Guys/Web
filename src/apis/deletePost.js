import axios from 'axios';

export const deletePost = async (postId) => {
    const token = localStorage.getItem('token');

    const res = await axios.delete(`http://localhost:8081/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};
