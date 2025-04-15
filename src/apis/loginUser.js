import axios from 'axios';

export const loginUser = async (loginData) => {
    const response = await axios.post('http://localhost:8080/login', loginData);
    return response.data; // 토큰 등 반환
};
