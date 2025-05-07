import axios from 'axios';

export const checkNickname = async (nickname) => {
    const response = await axios.get(`http://localhost:8081/auth/check-nickname`, {
        params: { nickname },
    });
    return response.data;
};

export const checkUsername = async (username) => {
    const response = await axios.get(`http://localhost:8081/auth/check-username`, {
        params: { username },
    });
    return response.data;
};
