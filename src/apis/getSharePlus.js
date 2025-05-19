import axios from 'axios';

export const getMyShareRequests = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/share-requests/user/${user.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};
