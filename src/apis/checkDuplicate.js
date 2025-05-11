import axios from 'axios';

export const checkNickname = async (nickname) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/check-nickname`, {
        params: { nickname },
    });
    return response.data;
};

export const checkUsername = async (username) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/check-username`, {
        params: { username },
    });
    return response.data;
};
