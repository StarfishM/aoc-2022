const { testData, data } = require("./input");
// console.log(testData);

let fullyContainedPairs = 0;
data.forEach((pairOfInstruction) => {
    // console.log(pairOfInstruction);

    if (
        pairOfInstruction.f.s >= pairOfInstruction.s.s &&
        pairOfInstruction.f.e <= pairOfInstruction.s.e
    ) {
        // console.log("first pair is contained");
        fullyContainedPairs++;
    } else if (
        pairOfInstruction.s.s >= pairOfInstruction.f.s &&
        pairOfInstruction.s.e <= pairOfInstruction.f.e
    ) {
        // console.log("second pair is contained");

        fullyContainedPairs++;
    }
});

console.log(fullyContainedPairs);
