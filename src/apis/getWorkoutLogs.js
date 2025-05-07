import axios from 'axios';

export const getWorkoutLogsByDate = async ({ userId, date }) => {
    const response = await axios.get(`http://localhost:8081/workoutlogs`, {
        params: {
            userId,
            date,
        },
    });
    return response.data;
};

export const getWorkoutLogsByDateRange = async (userId, startDate, endDate) => {
    console.log(startDate, endDate);
    const response = await axios.get(`http://localhost:8081/workoutlogs/range`, {
        params: {
            userId,
            startDate,
            endDate,
        },
    });
    return response.data.logs;
};
