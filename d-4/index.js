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

///////////////////////////////////
/////////// Part 2 ///////////////
/////////////////////////////////

// find anything that overlaps
// 2 - 4
// 3 - 6
let overlapCount = 0;
data.forEach((pairOfIns) => {
    if (pairOfIns.f.e >= pairOfIns.s.s && pairOfIns.f.e <= pairOfIns.s.e) {
        overlapCount++;
    } else if (
        pairOfIns.s.e >= pairOfIns.f.s &&
        pairOfIns.s.e <= pairOfIns.f.e
    ) {
        overlapCount++;
    }
});

console.log("ovlerlapCount: ", overlapCount);
