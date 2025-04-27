import axios from 'axios';

export const getWorkoutLogsByDate = async ({ userId, date }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/workoutlogs`, {
        params: {
            userId,
            date,
        },
    });
    return response.data; // logs 키가 아니라 그냥 배열
};

export const getWorkoutLogsByDateRange = async (userId, startDate, endDate) => {
    console.log(startDate, endDate);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/workoutlogs/range`, {
        params: {
            userId,
            startDate,
            endDate,
        },
    });
    return response.data.logs; // 서버에서 { logs: [...] } 형태로 받을 예정
};
