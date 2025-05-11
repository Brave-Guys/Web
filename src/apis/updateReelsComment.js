import axios from 'axios';

export const updateReelsComment = async ({ rcommentId, content }) => {
    const token = localStorage.getItem('token');

    const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/reels_comments/${rcommentId}`,
        { content },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
