// displays weights for each exercise that vary per set and day.
// using this workout: http://forum.bodybuilding.com/showthread.php?t=169172473
// the specific weights for each set are a bit fiddly.

// target weights (update per cycle) ///////////////////////////////////////////

const targetWeights = {
    squat: 10,
    benchPress: 10,
    row: 10,
    overheadPress: 10,
    deadlift: 10,
    curl: 10,
    calfRaise: 10
};

// constants ///////////////////////////////////////////////////////////////////

// available weight plates, per side
const weights = [
    { weight: 2.5, count: 1 },
    { weight: 5, count: 2 },
    { weight: 10, count: 1 },
    { weight: 25, count: 1 },
    { weight: 35, count: 1 },
    { weight: 45, count: 1 }
];

const barbellWeight = 45;
const curlBarWeight = 22;

const dayFactors = {
    monday: 1.0,
    wednesday: 0.9,
    friday: 0.8
};

// workout (doesn't change for long time) //////////////////////////////////////

const workout = [
    {
        name: 'Squats (1/4)',
        exercise: 'squat',
        factor: 0.25
    },
    {
        name: 'Squats (1/2)',
        exercise: 'squat',
        factor: 0.5
    },
    {
        name: 'Squats (full)',
        exercise: 'squat',
        count: 2
    },
    {
        name: 'Bench Press (1/4)',
        exercise: 'benchPress',
        factor: 0.25
    },
    {
        name: 'Bench Press (1/2)',
        exercise: 'benchPress',
        factor: 0.5
    },
    {
        name: 'Bench Press (full)',
        exercise: 'benchPress',
        count: 2
    },
    {
        name: 'Row (1/4)',
        exercise: 'row',
        factor: 0.25
    },
    {
        name: 'Row (1/2)',
        exercise: 'row',
        factor: 0.5
    },
    {
        name: 'Row (full)',
        exercise: 'row',
        count: 2
    },
    {
        name: 'Overhead Press (full)',
        exercise: 'overheadPress',
        count: 2
    },
    {
        name: 'Deadlift (full)',
        exercise: 'deadlift',
        count: 2
    },
    {
        name: 'Curl (full)',
        exercise: 'curl',
        count: 2
    },
    {
        name: 'Calf Raise (full)',
        exercise: 'calfRaise',
        count: 2
    }
];

// day is monday, wednesday, or friday
// week is 1 through 5
function output(day, week) {
    console.log(`${day}`);
    const thisWeekReps = getThisWeekReps(week);
    for(let iWorkout = 0; iWorkout < workout.length; ++iWorkout) {
        const thisExercise = workout[iWorkout];
        const thisExerciseFactor = thisExercise.factor || 1;
        const thisSetCount = thisExercise.count || 1;
        const thisDayFactor = dayFactors[day];
        if (!thisDayFactor) {
            console.log('Fail, bad day.');
            return;
        }
        for(let iSet = 0; iSet < thisSetCount; ++iSet) {
            const thisTargetWeight = targetWeights[thisExercise.exercise];
            if (!thisTargetWeight) {
                console.log('Fail, bad exercise.');
            }
            const thisSetWeight = thisTargetWeight * thisDayFactor * thisExerciseFactor;
            console.log(`${thisExercise.name}: weight is ${thisSetWeight}`);
        }
    }
}
function getThisWeekReps(week) {
    return week + 7;
}

output('monday', 1);
