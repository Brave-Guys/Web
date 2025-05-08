import axios from 'axios';

export const updateWorkoutLog = async (logId, updatedData) => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/workoutlogs/${logId}`, updatedData);
    return response.data;
};
