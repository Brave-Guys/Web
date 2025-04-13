import axios from 'axios';

export const registerUser = async (formData) => {
    const email = `${formData.emailId}@${formData.emailDomain}`;
    const payload = {
        username: formData.username,
        password: formData.password,
        nickname: formData.nickname,
        email: email
    };

    const response = await axios.post('http://localhost:8080/register', payload);
    return response.data;
};
