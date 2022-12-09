//////////////////////////////
////////// PART 1 ///////////
////////////////////////////
// Tail always stays in proximity of H
// IF H is two steps up, down, left or right from T, T has to move
// in that direction, so it remains close
// i.e. H x:4, y:0, if T is x:2, y:0 T moves x:3 y:0
// IF H is left -> x gets decreased
// IF H is right -> x gets increased
// IF H is up -> y gets increased
// IF H is down -> y gets decreased
// IF H and T are not touching, and are not in the same row or column, T
// moves one step diagonally to keep up so x+1 & y+1
// H&T start at the same position -> H makes the motions, T follows suit
// based on the rules above
const rope = {};
const { testInput, input, testInputP2 } = require("./input");
const executeMoveInstructions = (directionsArr, x = 0, y = 0) => {
    let tPos = { x, y };
    let hPos = { x, y };
    directionsArr.forEach((dirs) => {
        [direction, steps] = dirs;
        let stepsTaken = 0;
        while (stepsTaken < steps) {
            // do step function
            hPos = takeStep(direction, hPos);
            tPos = figureOutTmove(hPos, tPos);
            rope[`${tPos.x},${tPos.y}`] = 0;
            stepsTaken++;
        }
    });
};

const takeStep = (direction, position) => {
    if (direction === "R") {
        // move head right
        position.x++;
    } else if (direction === "L") {
        // move head left
        position.x--;
    } else if (direction === "U") {
        position.y++;
    } else {
        position.y--;
    }
    return position;
};

const figureOutTmove = (positionHead, positionTail) => {
    const { x: tailX, y: tailY } = positionTail;
    const { x: headX, y: headY } = positionHead;

    let isRight, isLeft, isUp, isDown;
    const isOverlap = tailX === headX && tailY === headY;
    if (!isOverlap && tailY === headY)
        headX > tailX ? (isRight = true) : (isLeft = true);
    if (!isOverlap && tailX === headX)
        headY > tailY ? (isUp = true) : (isDown = true);

    if (isOverlap) {
        return positionTail;
    }
    // figure out how T needs to behave
    // t and h are together on x:
    else if (isRight) {
        const distance = headX - tailX;
        distance > 1 && positionTail.x++;
    } else if (isLeft) {
        const distance = tailX - headX;
        distance > 1 && positionTail.x--;
    } else if (isDown) {
        const distance = tailY - headY;
        distance > 1 && positionTail.y--;
    } else if (isUp) {
        const distance = headY - tailY;
        distance > 1 && positionTail.y++;
    } else {
        // t and h are not aligned on either x or y, T needs to move diagonally!
        // figure out whether you need to move diagonally up or down
        headIsUp = headY > tailY;
        headIsRight = headX > tailX;
        if (headIsUp && headIsRight) {
            //potentially move up diagonally to the right
            const distanceY = headY - tailY;
            const distanceX = headX - tailX;
            if (distanceY > 1 || distanceX > 1) {
                positionTail.y++;
                positionTail.x++;
            }
        } else if (headIsUp && !headIsRight) {
            // potentially move up diagonally to the left
            const distanceX = tailX - headX;
            const distanceY = headY - tailY;
            if (distanceX > 1 || distanceY > 1) {
                positionTail.y++;
                positionTail.x--;
            }
        } else if (!headIsUp && headIsRight) {
            // potentially move down right
            const distanceX = headX - tailX;
            const distanceY = tailY - headY;

            if (distanceX > 1 || distanceY > 1) {
                positionTail.y--;
                positionTail.x++;
            }
        } else if (!headIsUp && !headIsRight) {
            // potentially move down left
            const distanceX = tailX - headX;
            const distanceY = tailY - headY;

            if (distanceX > 1 || distanceY > 1) {
                positionTail.y--;
                positionTail.x--;
            }
        }
    }
    return positionTail;
};

executeMoveInstructions(testInput);
// executeMoveInstructions(input);
console.log("Part 1:", Object.keys(rope).length);

//////////////////////////////
////////// PART 2 ///////////
////////////////////////////
//keep an array of 9 position elements to know where each knot is at what time
// move head -> update all other parts accordingly, -> head is at index 0, tail is at last index, other elements move depending on their position in the array, i.e. the first after head moves as the tail did before
const rope2 = {};
const executeMoveInstructionsP2 = (directionsArr, x = 0, y = 0) => {
    let positions = [];
    for (let i = 0; i < 10; i++) {
        positions.push({ x, y });
    }
    directionsArr.forEach((dirs) => {
        [direction, steps] = dirs;
        let stepsTaken = 0;
        while (stepsTaken < steps) {
            // do step function
            positions[0] = takeStep(direction, positions[0]);
            positions.reduce((prev, curr, idx) => {
                let currPos = figureOutTmove(prev, curr);
                return currPos;
            });
            rope2[
                `${positions[positions.length - 1].x},${
                    positions[positions.length - 1].y
                }`
            ] = 0;
            stepsTaken++;
        }
    });
};
executeMoveInstructionsP2(input);
console.log("Part 2: ", Object.keys(rope2).length);
