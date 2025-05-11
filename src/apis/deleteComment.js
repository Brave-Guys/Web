import axios from 'axios';

export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`);
    return response.data;
};
