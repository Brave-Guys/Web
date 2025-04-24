import axios from 'axios';

export const getComments = async (postId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`);
    return res.data;
};

export const postComment = async ({ postId, parentId, writerId, content }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`, {
        postId,
        parentId,
        writerId,
        content,
        writeDate: new Date().toISOString(),
    });
    return res.data;
};
