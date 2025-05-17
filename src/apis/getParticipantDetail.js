import axios from 'axios';

export const getParticipantDetail = async (challengeId, participantId) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/challenge_participants/${challengeId}/participants/${participantId}`
    );
    return response.data;
};

export const getRandomParticipant = async (excludeIds) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/challenge_participants/random`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ excludeIds }),
        });

        if (!response.ok) throw new Error('랜덤 참가자를 가져오는 데 실패했습니다.');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
