import axios from 'axios';

export const deleteWorkoutLog = async (logId) => {
    const response = await axios.delete(`http://localhost:8081/workoutlogs/${logId}`);
    return response.data;
};
