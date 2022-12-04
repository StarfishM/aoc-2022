const { testData, data } = require("./input");

let fullyContainedPairs = 0;
data.forEach((pairOfInstruction) => {
    if (
        pairOfInstruction.f.s >= pairOfInstruction.s.s &&
        pairOfInstruction.f.e <= pairOfInstruction.s.e
    ) {
        fullyContainedPairs++;
    } else if (
        pairOfInstruction.s.s >= pairOfInstruction.f.s &&
        pairOfInstruction.s.e <= pairOfInstruction.f.e
    ) {
        fullyContainedPairs++;
    }
});

console.log(
    `Part 1: ${fullyContainedPairs} pairs are fully contained within their pair partner`
);

///////////////////////////////////
/////////// Part 2 ///////////////
/////////////////////////////////

// find anything that overlaps
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

console.log(`Part 2: ${overlapCount} pairs have overlapping sections`);
