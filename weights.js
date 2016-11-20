
// target weights (update per cycle) ///////////////////////////////////////////

const currentCycle = 'cycle2';
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
    }
};

const targetWeights = targetWeightsByCycle[currentCycle];

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

const workout = [
    {
        exercise: 'squat',
        factor: 0.25
    },
    {
        exercise: 'squat',
        factor: 0.5
    },
    {
        exercise: 'squat',
        count: 2
    },
    {
        exercise: 'benchPress',
        factor: 0.25
    },
    {
        exercise: 'benchPress',
        factor: 0.5
    },
    {
        exercise: 'benchPress',
        count: 2
    },
    {
        exercise: 'row',
        factor: 0.25
    },
    {
        exercise: 'row',
        factor: 0.5
    },
    {
        exercise: 'row',
        count: 2
    },
    {
        exercise: 'overheadPress',
        count: 2
    },
    {
        exercise: 'deadlift',
        count: 2
    },
    {
        exercise: 'curl',
        count: 2
    },
    {
        exercise: 'calfRaise',
        count: 2
    }
];

// some notes about rack config per exercise.
// nft means n holes from top, counting the occupied hole. nfb from bottom.
const exerciseNotes = {
    squat: 'pegs 3ft (reverse?), bars 4fb.',
    benchPress: 'pegs 8fb, bars 4fb, bench all the way back.',
    row: 'pegs 4fb (just use bars from prev).',
    overheadPress: 'pegs 4ft.',
    deadlift: 'pegs 4fb.',
    curl: '',
    calfRaise: 'pegs 4ft.'
};

// here be code ////////////////////////////////////////////////////////////////

// Day is monday, wednesday, or friday (or 1, 2, 3)
// Week is 1 through 5.
function output(day, week) {
    day = normalizeDay(day);
    const columnWidth = 24;
    banner();
    console.log(`## ${currentCycle} ${day}, week ${week}`);
    console.log(`## reps: ${getThisWeekReps(week)}`);
    if (isTestDay(day, week)) {
        console.log(`## TEST DAY!!!! 1:30 rest between work sets. Good luck.`);
    }
    banner();

    let lastExercise = null;
    for(let iWorkout = 0; iWorkout < workout.length; ++iWorkout) {
        const thisExercise = workout[iWorkout];

        // Draw dividers between different exercises.
        if (lastExercise !== null && lastExercise.exercise !== thisExercise.exercise) {
            console.log('---');
        }

        const thisExerciseName = padStr(getExerciseName(thisExercise), columnWidth);
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

            const thisPlateWeight = roundToNearestWeight(thisSetWeight - thisBarWeight);
            const thisPlateList = getPlateList(thisPlateWeight).join(', ');
            const thisPlateStr = padStr(`plates on each side:  ${thisPlateList}`, columnWidth * 1.5);

            // some stuff only gets logged on the first row of each exercise
            let optFirstLineStr = '';
            const isFirstRow = (iSet === 0) && (!lastExercise || lastExercise.exercise !== thisExercise.exercise);
            if (isFirstRow) {
                const thisBarWeightStr = `bar weight is ${thisBarWeight}.`;
                const thisExerciseNotes = exerciseNotes[thisExercise.exercise] || '';
                optFirstLineStr = `${thisBarWeightStr} ${thisExerciseNotes}`;
            }
            console.log(`${thisExerciseName} ${thisSetWeightStr} ${thisPlateStr} ${optFirstLineStr}`);
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

function normalizeDay(inputDay) {
    if (inputDay === '1' || inputDay.toLowerCase() === 'monday') return 'monday';
    if (inputDay === '2' || inputDay.toLowerCase() === 'wednesday') return 'wednesday';
    if (inputDay === '3' || inputDay.toLowerCase() === 'friday') return 'friday';
    return 'unknown';
}

function getExerciseName(exercise) {
    let factorStr = '(?)';
    if (!exercise.factor || exercise.factor === 1) factorStr = '(full)';
    else if (exercise.factor === 0.5) factorStr = '(1/2)';
    else if (exercise.factor === 0.25) factorStr = '(1/4)';
    return `${exercise.exercise} ${factorStr}`;
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

function isTestDay(day, week) {
    return (day == 'monday') && (week == 5);
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
