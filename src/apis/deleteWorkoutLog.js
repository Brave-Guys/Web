import axios from 'axios';

export const deleteWorkoutLog = async (logId) => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/workoutlogs/${logId}`);
    return response.data;
};
