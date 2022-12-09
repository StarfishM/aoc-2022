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
const { testInput, input } = require("./input");
// console.log("testInput: ", Array.isArray(testInput));
// console.log("input[0]: ", Array.isArray(input));
// console.log("input: ", input.slice(0, 5));
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
            // console.log("------------");
            // console.log("hPos", hPos);
            // console.log("tPos", tPos);
            // console.log("------------");

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
            // const distanceY = tailY - headY;
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
    // console.log("positionTail after if else ", positionTail);
    return positionTail;
};

executeMoveInstructions(testInput);
// executeMoveInstructions(input);
console.log("Part 1:", Object.keys(rope).length);
