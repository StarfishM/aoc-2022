const { testInput, simpleInput, input } = require("./input");
// console.log("testInput: ", testInput);
/////////////////////////////
////////// PART 1 //////////
///////////////////////////

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
// runSignals(testInput);
const sumOfSignals = [
    xVals[19] * 20,
    xVals[59] * 60,
    xVals[99] * 100,
    xVals[139] * 140,
    xVals[179] * 180,
    xVals[219] * 220,
].reduce((a, b) => a + b);

console.log("Part 1: sum of signals is:", sumOfSignals);

/////////////////////////////
////////// PART 2 //////////
///////////////////////////
const fst = xVals.slice(0, 39);
const scd = xVals.slice(40, 79);
const trd = xVals.slice(80, 119);
const frth = xVals.slice(120, 159);
const ffth = xVals.slice(160, 199);
const sxth = xVals.slice(200, 239);

const returnCRTString = (arrOfSignals) => {
    let CRTString = "";
    arrOfSignals.forEach((sigNum, idx) => {
        if (sigNum <= idx + 1 && sigNum + 1 >= idx) {
            CRTString += "#";
        } else {
            CRTString += ".";
        }
    });
    return CRTString;
};
console.log("PART 2 --------------------------------");
console.log(returnCRTString(fst));
console.log(returnCRTString(scd));
console.log(returnCRTString(trd));
console.log(returnCRTString(frth));
console.log(returnCRTString(ffth));
console.log(returnCRTString(sxth));
console.log("---------------------------------------");
console.log(`LETTERS ARE: ⭐️ RZHFGJCB ⭐️`);
