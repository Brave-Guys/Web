import axios from 'axios';

export const postApplyMaster = async ({
    name,
    phone,
    certFileUrls,
    career,
    parts,
    intro,
    link,
    portfolioUrls = []
}) => {
    const token = localStorage.getItem('token');
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/apply-master`,
        {
            name,
            phone,
            career,
            intro,
            link,
            parts,
            certFileUrls,
            portfolioUrls
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
};
