import axios from 'axios';

export const saveWorkoutLog = async ({
    userId,
    name,
    date,
    duration = null,
    distance = null,
    reps = null,
    weight = null,
    sets = null
}) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/workoutlogs`, {
        userId,
        name,
        date,
        duration,
        distance,
        reps,
        weight,
        sets,
    });
    return response.data;
};
