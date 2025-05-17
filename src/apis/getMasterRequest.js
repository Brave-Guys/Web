import axios from 'axios';

export const getMasterRequestById = async (id) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/apply-master/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

export const getAllMasterRequests = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/apply-master`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};
