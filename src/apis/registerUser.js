import axios from 'axios';

export const registerUser = async (formData) => {    
    const email = `${formData.emailId}@${formData.emailDomain}`;
    const payload = {
        username: formData.username,
        password: formData.password,
        nickname: formData.nickname,
        email: formData.email,
    };

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, payload);
    return response.data;
};
