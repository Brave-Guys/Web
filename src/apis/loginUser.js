import axios from 'axios';

export const loginUser = async (loginData) => {
    const response = await axios.post(`${process.env.API_URL}/login`, loginData);
    return response.data; // 토큰 등 반환
};
