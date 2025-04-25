import axios from 'axios';

export const checkNickname = async (nickname) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/check-nickname`, {
        params: { nickname },
    });
    return response.data;
};

export const checkUsername = async (username) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/check-username`, {
        params: { username },
    });
    return response.data;
};
