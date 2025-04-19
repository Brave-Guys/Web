import axios from 'axios';

export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginData);
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || '로그인 실패';
        throw new Error(message);
    }
};
