import axios from 'axios';

export const postReelsComment = async ({ reelsId, writerId, content, parentId = null }) => {
    const token = localStorage.getItem('token');

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reels_comments`,
        {
            reelsId,
            writerId,
            content,
            parentId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
