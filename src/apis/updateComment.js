import axios from 'axios';

export const updateComment = async ({ commentId, content }) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
        content,
    });
    return response.data;
};
