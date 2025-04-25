import axios from 'axios';

export const deletePost = async (postId) => {
    const token = localStorage.getItem('token');

    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};
