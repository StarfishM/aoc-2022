const { testData, input } = require("./input");
// console.log(testData);

/*
A || X Rock
B || Y Paper
C || Z Scissors
*/
const rPsDict = {
    A: "X", // rock
    B: "Y", // paper
    C: "Z", // scissors
};
/* 
rock beats scissors
paper beats rock
scissors beats paper
 */

const rPsScores = {
    X: 1,
    Y: 2,
    Z: 3,
};

// Check a match
// check if we have a win, a draw a loss
// calculate the total score of match

function rPsWinCheck(match) {
    if (rPsDict[match.elf] === match.me) {
        return 3;
    } else if (match.elf == "A" && match.me == "Y") {
        return 6;
    } else if (match.elf == "B" && match.me == "Z") {
        return 6;
    } else if (match.elf == "C" && match.me == "X") {
        return 6;
    } else {
        return 0;
    }
}

let totalScore = 0;
input.forEach((match) => {
    let matchScore = 0;
    matchScore += rPsWinCheck(match);
    matchScore += rPsScores[match.me];
    totalScore += matchScore;
});

console.log(`Day 2 Part 1: 🪨📃✂️ total score ${totalScore}`);

/////////////////////////
//////// PART 2 ////////
///////////////////////

const rPsWinScores = {
    X: 0, // loss
    Y: 3, // draw
    Z: 6, // win
};

// X -> I should lose
// Y -> we should draw
// Z -> I should win

const rPsScoresP2 = {
    A: 1,
    B: 2,
    C: 3,
};

const decodeWins = {
    A: "B",
    B: "C",
    C: "A",
};

const decodeLosses = {
    A: "C",
    B: "A",
    C: "B",
};
/* 
rock beats scissors
paper beats rock
scissors beats paper
 */
let totalPart2 = 0;
input.forEach((match) => {
    let matchScore = 0;
    matchScore += rPsWinScores[match.me];
    if (matchScore === 3) {
        matchScore += rPsScoresP2[match.elf];
    } else if (matchScore === 6) {
        matchScore += rPsScoresP2[decodeWins[match.elf]];
    } else {
        matchScore += rPsScoresP2[decodeLosses[match.elf]];
    }
    totalPart2 += matchScore;
});

console.log(`Day 2 Part 2: 🪨📃✂️ total score ${totalPart2}`);
