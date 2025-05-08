import axios from 'axios';

export const updateComment = async ({ commentId, content }) => {
    const response = await axios.put(`http://localhost:8081/comments/${commentId}`, {
        content,
    });
    return response.data;
};
