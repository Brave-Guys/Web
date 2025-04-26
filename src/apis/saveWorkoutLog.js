import axios from 'axios';

export const saveWorkoutLog = async ({ userId, content, date }) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/workoutlogs`, {
        userId,
        content,
        date,
    });
    return response.data;
};
