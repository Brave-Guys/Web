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
