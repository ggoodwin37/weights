const currentCycle = 'cycle5';

const targetWeightsByCycle = {
    cycle1: {
        squat: 129,
        benchPress: 124,
        row: 116,
        overheadPress: 80,
        deadlift: 129,
        curl: 57,
        calfRaise: 129
    },
    cycle2: {
        squat: 142,
        benchPress: 137,
        row: 128,
        overheadPress: 88,
        deadlift: 142,
        curl: 63,
        calfRaise: 142
    },
    // missed full set on bench and overhead press
    cycle3: {
        squat: 157,
        benchPress: 137,
        row: 141,
        overheadPress: 88,
        deadlift: 157,
        curl: 70,
        calfRaise: 157
    },
    cycle4: {
        squat: 173,
        benchPress: 151,
        row: 156,
        overheadPress: 97,
        deadlift: 173,
        curl: 77,
        calfRaise: 173
    },
    cycle5: {
        squat: 190,
        benchPress: 166,
        row: 172,
        overheadPress: 107,
        deadlift: 190,
        curl: 85,
        calfRaise: 190
    }
};

module.exports = { currentCycle: currentCycle, targetWeightsByCycle: targetWeightsByCycle };
