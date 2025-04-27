import { calculateCardioScore } from './calculateCardioScore.js';
import { calculateWeightScore } from './calculateWeightscore.js';

export const calculateTotalScore = (logs) => {
    console.log(logs);
    if (!logs || logs.length === 0) return 0;

    return logs.reduce((acc, log) => {
        if (log.exerciseType === '유산소') {
            return acc + calculateCardioScore(log);
        } else if (log.exerciseType === '웨이트') {
            return acc + calculateWeightScore(log);
        }
        return acc;
    }, 0);
};
