import axios from 'axios';

export const deleteReelsComment = async (rcommentId) => {
    const token = localStorage.getItem('token');

    const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/reels_comments/${rcommentId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
};
