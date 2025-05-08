import axios from 'axios';

export const deleteComment = async (commentId) => {
    const response = await axios.delete(`http://localhost:8081/comments/${commentId}`);
    return response.data;
};
