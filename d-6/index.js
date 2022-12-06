const { testInputs, input } = require("./input");
// console.log("testInput: ", testInput);
/////////////////////////////
////////// PART 1 //////////
///////////////////////////
//loop through characters
//check set of fours and go one up
const checkForMarker = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const potentialUniqueSet = [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]];
        const setOfUnique = [...new Set(potentialUniqueSet)];
        if (setOfUnique.length === 4) return i + 4;
    }
};

// testInputs.forEach((testInp) => console.log(checkForMarker(testInp)));
console.log(
    `Part 1: first start-of-message marker for 4 unique characters is detected at character ${checkForMarker(
        input
    )}`
);

/////////////////////////////
////////// PART 2 //////////
///////////////////////////
const checkForMarkerDynamic = (arr, numOfChars) => {
    for (let i = 0; i < arr.length; i++) {
        // generate array of  that need to be added to i
        const arrayOfIndexes = [...Array(numOfChars).keys()];
        // generate potential Uniqueset by mapping through those numbers
        const potentialUniqueSet = arrayOfIndexes.map((idx) => arr[i + idx]);
        const setOfUnique = [...new Set(potentialUniqueSet)];
        if (setOfUnique.length === numOfChars) return i + numOfChars;
    }
};

console.log(
    `Part 2: first start-of-message marker for 14 unique characters is detected at character ${checkForMarkerDynamic(
        input,
        14
    )}`
);
