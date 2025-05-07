import axios from 'axios';

export const updateWorkoutLog = async (logId, updatedData) => {
    const response = await axios.put(`http://localhost:8081/workoutlogs/${logId}`, updatedData);
    return response.data;
};
