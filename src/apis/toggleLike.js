import axios from 'axios';

export const toggleLike = async ({ userId, postId, postType, postOrComment }) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/likes/toggle`, {
        userId,
        postId,
        postType,
        postOrComment,
    });
    return response.data;
};

export const checkLikeStatus = async ({ userId, postId, postType, postOrComment }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/likes/check`, {
        params: {
            userId,
            postId,
            postType,
            postOrComment,
        },
    });

    return response.data.liked; // true or false
};