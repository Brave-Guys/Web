import axios from 'axios';

export const saveWorkoutLog = async ({ userId, name, date, duration, distance, sets, reps, weight, exerciseType, part }) => {
    const response = await axios.post(`http://localhost:8081/workoutlogs`, {
        userId,
        name,
        date,
        duration,
        distance,
        sets,
        reps,
        weight,
        exerciseType,
        part,
    });
    return response.data;
};
