export const calculateCardioScore = (log) => {
    const coefficients = {
        '트레드 밀': { duration: 0.15, distance: 0.014 },
        '스텝 밀': { duration: 0.3, reps: 0.03 },
        '줄넘기': { duration: 2.6 },
        '걷기': { duration: 0.15, distance: 0.005 },
        '조깅 및 러닝 머신': { duration: 0.25, distance: 0.013 },
        '사이클 머신': { duration: 0.2, distance: 0.011 },
        '로잉 머신': { duration: 0.35, distance: 0.025 },
        '버피': { sets: 0.8, reps: 0.6 },
    };

    const exercise = coefficients[log.name];
    if (!exercise) return 0;

    let score = 0;

    if (exercise.duration && log.duration) {
        score += log.duration * exercise.duration;
    }
    if (exercise.distance && log.distance) {
        score += (log.distance * 1000) * exercise.distance;
        // 거리(m)로 변환 (기록은 km 단위였으니까 1000 곱하기)
    }
    if (exercise.reps && log.reps) {
        score += log.reps * exercise.reps;
    }
    if (exercise.sets && log.sets) {
        score += log.sets * exercise.sets;
    }

    return Math.round(score);
};

export const calculateTotalScore = (logs) => {
    if (!logs || logs.length === 0) return 0;

    return logs.reduce((acc, log) => {
        return acc + calculateCardioScore(log);
    }, 0);
};
