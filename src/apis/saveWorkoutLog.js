import axios from 'axios';

export const saveWorkoutLog = async ({ userId, name, date, duration, distance, sets, reps, weight }) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/workoutlogs`, {
        userId,
        name,
        date,
        duration,
        distance,
        sets,
        reps,
        weight,
    });
    return response.data;
};
