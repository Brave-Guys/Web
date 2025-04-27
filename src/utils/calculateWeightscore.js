const getWeightCoefficient = (part, weight) => {
    if (part === '어깨') {
        if (weight <= 20) return 0.03;
        if (weight <= 30) return 0.045;
        if (weight <= 40) return 0.06;
        return 0.07;
    }
    if (part === '등' || part === '가슴') {
        if (weight <= 40) return 0.03;
        if (weight <= 80) return 0.04;
        if (weight <= 120) return 0.05;
        return 0.06;
    }
    if (part === '이두' || part === '삼두') {
        if (weight <= 10) return 0.03;
        if (weight <= 20) return 0.04;
        if (weight <= 30) return 0.05;
        return 0.07;
    }
    // 하체 (둔근, 햄스트링, 대퇴사두근, 내전근 등)
    if (['둔근', '햄스트링', '대퇴사두근', '내전근', '비복근'].includes(part)) {
        if (weight <= 60) return 0.03;
        if (weight <= 120) return 0.04;
        if (weight <= 180) return 0.05;
        return 0.07;
    }
    return 0; // 기본 0
};

export const calculateWeightScore = (log) => {   

    if (!log || !log.sets || !log.reps || !log.part) {
        console.log('gd');
        return 0;
    }

    const sets = Number(log.sets) || 0;
    const reps = Number(log.reps) || 0;
    const weight = Number(log.weight) || 0;
    const part = log.part;

    if (part === '복부') {
        return sets * 1.2 + reps * 0.3;
    }

    const weightCoefficient = getWeightCoefficient(part, weight);
    return sets * 1.2 + reps * 0.8 + weight * weightCoefficient;
};
