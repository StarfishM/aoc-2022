const { testData, data, instructions, testInstructions } = require("./input");

const stackOfBoxes = data;
instructions.forEach((instr) => executeMove(instr, stackOfBoxes));

function executeMove(ins, boxStack) {
    const { numsOfBoxes, from, to } = ins;
    let boxesMoved = 0;
    while (boxesMoved < numsOfBoxes) {
        boxStack[to].unshift(boxStack[from].shift());
        boxesMoved++;
    }
}
let topBoxes = ``;
for (let prop in stackOfBoxes) {
    topBoxes += stackOfBoxes[prop][0];
}
console.log(`Part 1, the top boxes aare ${topBoxes}`);
