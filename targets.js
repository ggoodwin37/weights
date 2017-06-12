const currentCycle = 'cycle8';

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
    // reduced row target by 20% mid-cycle cuz my fuckin shoulder hurts
    cycle5: {
        squat: 190,
        benchPress: 166,
        row: 138,
        overheadPress: 107,
        deadlift: 190,
        curl: 85,
        calfRaise: 190
    },
    // missed bench and curls, and going slow on shoulder (5% increase)
    cycle6: {
        squat: 209,
        benchPress: 166,
        row: 145,
        overheadPress: 118,
        deadlift: 209,
        curl: 85,
        calfRaise: 209
    },
    // bench, overhead, curl all failed, slow on shoulder
    cycle7: {
        squat: 230,
        benchPress: 166,
        row: 152,
        overheadPress: 118,
        deadlift: 230,
        curl: 85,
        calfRaise: 230
    },
    // bench, overhead failed
    cycle8: {
        squat: 253,
        benchPress: 166,
        row: 160,
        overheadPress: 118,
        deadlift: 253,
        curl: 94,
        calfRaise: 253
    }
};

module.exports = { currentCycle: currentCycle, targetWeightsByCycle: targetWeightsByCycle };
