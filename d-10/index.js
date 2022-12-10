const { testInput, simpleInput, input } = require("./input");
// console.log("testInput: ", testInput);

const xVals = [];
const runSignals = (arrOfSignals) => {
    let currX = 1;
    let cycle = 0;
    // loop through signals add number values to xVals and then update currX accordingly...
    arrOfSignals.forEach((signal, idx) => {
        const [, rounds] = signal;
        if (!rounds) return xVals.push(currX);
        if (rounds) {
            xVals.push(currX);
            xVals.push(currX);
            currX += rounds;
        }
    });
    xVals.push(currX);
};

runSignals(input);
const sumOfSignals = [
    xVals[19] * 20,
    xVals[59] * 60,
    xVals[99] * 100,
    xVals[139] * 140,
    xVals[179] * 180,
    xVals[219] * 220,
].reduce((a, b) => a + b);

console.log("Part 1, sum of signals", sumOfSignals);
