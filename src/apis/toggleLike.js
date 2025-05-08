import axios from 'axios';

export const toggleLike = async ({ userId, postId, postType, postOrComment }) => {
    const response = await axios.post(`http://localhost:8081/likes/toggle`, {
        userId,
        postId,
        postType,
        postOrComment,
    });
    return response.data;
};

export const checkLikeStatus = async ({ userId, postId, postType, postOrComment }) => {
    const response = await axios.get(`http://localhost:8081/likes/check`, {
        params: {
            userId,
            postId,
            postType,
            postOrComment,
        },
    });

    return response.data.liked; // true or false
};