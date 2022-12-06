const { testInputs, input } = require("./input");
// console.log("testInput: ", testInput);

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
    `Part 1: first start-of-packet marker is detected at character ${checkForMarker(
        input
    )}`
);
