const { testData, data, instructions, testInstructions } = require("./input");

///////////////////////////////////
/////////// Part 1 ///////////////
/////////////////////////////////
const stackOfBoxes = JSON.parse(JSON.stringify(data));
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
console.log(`Part 1, the top boxes are ${topBoxes}`);

///////////////////////////////////
/////////// Part 2 ///////////////
/////////////////////////////////
const stackOfBoxesP2 = JSON.parse(JSON.stringify(data));
function executeMover9001(ins, boxStack) {
    const { numsOfBoxes, from, to } = ins;

    const boxSubStack = boxStack[from].splice(0, numsOfBoxes);
    boxStack[to] = [...boxSubStack, boxStack[to]].flat();
}

instructions.forEach((instr) => executeMover9001(instr, stackOfBoxesP2));
let topBoxesP2 = ``;
for (let prop in stackOfBoxesP2) {
    topBoxesP2 += stackOfBoxesP2[prop][0];
}
console.log(`Part 2, the top boxes are ${topBoxesP2}`);
