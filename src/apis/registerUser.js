import axios from 'axios';

export const registerUser = async (formData) => {
    console.log(process.env.REACT_APP_API_URL);
    const email = `${formData.emailId}@${formData.emailDomain}`;
    const payload = {
        username: formData.username,
        password: formData.password,
        nickname: formData.nickname,
        email: email
    };

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, payload);
    return response.data;
};
