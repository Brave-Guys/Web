import axios from 'axios';

export const getComments = async (postId) => {
    const res = await axios.get(`http://localhost:8081/posts/${postId}/comments`);
    return res.data;
};

export const postComment = async ({ postId, parentId, writerId, content }) => {
    const res = await axios.post(`http://localhost:8081/posts/${postId}/comments`, {
        postId,
        parentId,
        writerId,
        content,
        writeDate: new Date().toISOString(),
    });
    return res.data;
};
