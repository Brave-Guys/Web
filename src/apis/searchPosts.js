import axios from 'axios';

export const searchPosts = async (query) => {
    try {
        const response = await axios.get(`http://localhost:8081/posts/search`, {
            params: { q: query },
        });
        return response.data;
    } catch (err) {
        console.error('게시글 검색 실패', err);
        throw err;
    }
};
