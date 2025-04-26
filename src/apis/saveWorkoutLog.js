import axios from 'axios';

export const saveWorkoutLog = async ({ userId, name, intensity, date }) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/workoutlogs`, {
        userId,
        name,
        intensity,
        date,
    });
    return response.data;
};
