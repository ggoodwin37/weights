
// target weights (update per cycle) ///////////////////////////////////////////

const targetWeights = {
    squat: 122,
    benchPress: 118,
    row: 107,
    overheadPress: 80,
    deadlift: 124,
    curl: 47,
    calfRaise: 124
};

// constants ///////////////////////////////////////////////////////////////////

// available weight plates, per side.
const allAvailablePlates = [45, 35, 25, 10, 5, 5, 2.5];

const barbellWeight = 45;
const curlBarWeight = 22;

const dayFactors = {
    monday: 1.0,
    wednesday: 0.9,
    friday: 0.8
};

// TODO: probably just generate the name.
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

// here be code ////////////////////////////////////////////////////////////////

// Day is monday, wednesday, or friday.
// Week is 1 through 5.
function output(day, week) {
    const columnWidth = 24;
    banner();
    console.log(`## ${day}, week ${week}`);
    console.log(`## reps: ${getThisWeekReps(week)}`);
    banner();

    let lastExercise = null;
    for(let iWorkout = 0; iWorkout < workout.length; ++iWorkout) {
        const thisExercise = workout[iWorkout];

        // Draw dividers between different exercises.
        if (lastExercise !== null && lastExercise.exercise !== thisExercise.exercise) {
            console.log('---');
        }

        const thisExerciseName = padStr(thisExercise.name, columnWidth);
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
            const thisSetWeight = Math.round(thisTargetWeight * thisDayFactor * thisExerciseFactor);
            const thisSetWeightStr = padStr(`total weight is: ${thisSetWeight}`, columnWidth);

            const thisBarWeight = getBarWeight(thisExercise.exercise);
            const thisBarWeightStr = padStr(`bar weight is ${thisBarWeight}`, columnWidth);

            const thisPlateWeight = roundToNearestWeight(thisSetWeight - thisBarWeight);
            const thisPlateList = getPlateList(thisPlateWeight).join(', ');
            const thisPlateStr = `plates on each side:  ${thisPlateList}`;
            console.log(`${thisExerciseName} ${thisSetWeightStr} ${thisBarWeightStr} ${thisPlateStr}`);
        }
        lastExercise = thisExercise;
    }

    banner();
    console.log('## Done!');
    banner();
}

// Rounds to nearest weight we can configure.
// Since smallest weight is 2.5 and we have to balance, smallest unit is 5.
function roundToNearestWeight(inWeight) {
    const minUnit = 5;
    return Math.ceil(inWeight / minUnit) * minUnit;
}

// For given complete weight, return plates that need to go on each side (i.e. half).
function getPlateList(inWeight) {
    let remainingWeight = inWeight / 2;
    const availablePlates = allAvailablePlates.slice().sort((a, b) => {
        return (+a) - (+b) < 0;
    });
    const result = [];
    while(availablePlates.length > 0 && remainingWeight > 0) {
        const thisWeight = availablePlates.shift();
        if (remainingWeight >= thisWeight) {
            remainingWeight -= thisWeight;
            result.push(thisWeight);
        }
    }

    return result.length > 0 ? result : ['no plates'];
}

function getBarWeight(exercise) {
    if (exercise === 'curl') {
        return curlBarWeight;
    } else {
        return barbellWeight;
    }
}

function getThisWeekReps(week) {
    return +week + 7;
}

function repeatStr(str, rep) {
    const result = [];
    for (let i = 0; i < rep; ++i) {
        result.push(str);
    }
    return result.join('');
}

function padStr(str, len) {
    return '' + str + repeatStr(' ', len - str.length);
}

function banner() {
    console.log(repeatStr('#', 130));
}

// Here is the most ghetto argv processing you will find.
function getArgs(argv) {
    const args = {
        day: 'monday',
        week: 1
    };
    argv.forEach((val, index, array) => {
        if (val === '-day') {
            args['day'] = array[index + 1] || 'monday';
        }
        if (val === '-week') {
            args['week'] = array[index + 1] || 1;
        }
    });
    return args;
}

const args = getArgs(process.argv);
output(args['day'], args['week']);
