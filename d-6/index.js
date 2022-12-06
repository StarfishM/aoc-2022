const { testInputs, input } = require("./input");
// console.log("testInput: ", testInput);
/////////////////////////////
////////// PART 1 //////////
///////////////////////////
const checkForMarker = (arr, numOfChars) => {
    for (let i = 0; i < arr.length; i++) {
        // generate array of nums that need to be added to i
        const arrayOfIndexes = [...Array(numOfChars).keys()];
        // generate potential Uniqueset by mapping through those numbers
        const potentialUniqueSet = arrayOfIndexes.map((idx) => arr[i + idx]);
        const setOfUnique = [...new Set(potentialUniqueSet)];
        // is unique set has same vals as sequence characters we are looking for we've found the start of message
        if (setOfUnique.length === numOfChars) return i + numOfChars;
    }
};

// testInputs.forEach((testInp) => console.log(checkForMarker(testInp)));
console.log(
    `Part 1: first start-of-message marker for 4 unique characters is detected at character ${checkForMarker(
        input,
        4
    )}`
);

/////////////////////////////
////////// PART 2 //////////
///////////////////////////

console.log(
    `Part 2: first start-of-message marker for 14 unique characters is detected at character ${checkForMarker(
        input,
        14
    )}`
);
