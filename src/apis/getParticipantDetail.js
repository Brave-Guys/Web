import axios from 'axios';

export const getParticipantDetail = async (challengeId, participantId) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/challenge_participants/${challengeId}/participants/${participantId}`
    );
    return response.data;
};
