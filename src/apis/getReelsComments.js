import axios from 'axios';

export const getReelsComments = async (reelsId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/reels_comments/${reelsId}`
        );
        return response.data;
    } catch (error) {
        console.error('댓글 목록 불러오기 실패:', error);
        throw error;
    }
};
