const { testInput, input } = require("./input");
// console.log('testInput: ',testInput);
const treeMatrix = [];
let outerBorderIdx;
input.forEach((row, idx) => {
    outerBorderIdx = row.length - 1;
    for (let i = 0; i < row.length; i++) {
        let matrixObj = {};
        matrixObj.y = idx;
        matrixObj.x = i;
        matrixObj.val = row[i];
        treeMatrix.push(matrixObj);
    }
});

///////////////////////////
////////// PART 1 ////////
/////////////////////////

function countVisibleTrees(matrix) {
    matrix.map((treeObj) => {
        if (
            treeObj.x === 0 ||
            treeObj.y === 0 ||
            treeObj.x === outerBorderIdx ||
            treeObj.y === outerBorderIdx
        ) {
            treeObj.isVisible = true;
            treeObj.isBorder = true;
        } else {
            const currTreeHeight = treeObj.val;
            const left = matrix.filter(
                (tree) => tree.y === treeObj.y && tree.x <= treeObj.x - 1
            );
            left.length > 1 && left.sort((a, b) => b.val - a.val);
            const tallestToLeft = left[0].val;
            if (tallestToLeft < currTreeHeight) {
                treeObj.isVisible = true;
                treeObj.left = true;
            }
            // look right -> all all trees with same y value but greate than one more x value
            const right = matrix.filter(
                (tree) => tree.y === treeObj.y && tree.x >= treeObj.x + 1
            );
            right.length > 1 && right.sort((a, b) => b.val - a.val);
            const tallestToRight = right[0].val;
            if (tallestToRight < currTreeHeight) {
                treeObj.isVisible = true;
                treeObj.right = true;
            }
            // look up -> all trees with same x value but less than or equal to one less y value
            const up = matrix.filter(
                (tree) => tree.x === treeObj.x && tree.y <= treeObj.y - 1
            );
            up.length > 1 && up.sort((a, b) => b.val - a.val);
            const tallestToTop = up[0].val;
            if (tallestToTop < currTreeHeight) {
                treeObj.isVisible = true;
                treeObj.top = true;
            }
            // look down -> all trees with same x value but more than or equal to one more y value
            const down = matrix.filter(
                (tree) => tree.x === treeObj.x && tree.y >= treeObj.y + 1
            );
            down.length > 1 && down.sort((a, b) => b.val - a.val);
            const tallestToBottom = down[0].val;
            if (tallestToBottom < currTreeHeight) {
                treeObj.isVisible = true;
                treeObj.bottom = true;
            }
        }
    });
    console.log(
        "Part 1: number of visible trees",
        matrix.filter((tree) => tree.isVisible).length
    );
}
// console.log("treeMatrix", treeMatrix.length/4);
///////////////////////////
////////// PART 2 ////////
/////////////////////////
function calculateScenicScore(matrix) {
    const insideTrees = matrix.filter((tree) => !tree.isBorder);
    let highestScenicScore = 0;
    insideTrees.map((treeObj) => {
        const currTreeHeight = treeObj.val;

        let left, right, down, up;
        if (treeObj.left) {
            left = treeObj.x;
        }
        if (treeObj.right) {
            right = outerBorderIdx - treeObj.x;
        }
        if (treeObj.bottom) {
            down = outerBorderIdx - treeObj.y;
        }
        if (treeObj.top) {
            up = treeObj.y;
        }
        if (!left) {
            const leftView = matrix.filter(
                (tree) => tree.y === treeObj.y && tree.x <= treeObj.x - 1
            );
            leftView.sort((a, b) => b.x - a.x);
            leftView.every((tree) => {
                if (tree.val >= currTreeHeight) {
                    left = treeObj.x - tree.x;
                    return false;
                } else return true;
            });
        }
        if (!right) {
            const rightView = matrix.filter(
                (tree) => tree.y === treeObj.y && tree.x >= treeObj.x + 1
            );
            rightView.sort((a, b) => a.x - b.x);
            rightView.every((tree, idx) => {
                if (tree.val >= currTreeHeight) {
                    right = tree.x - treeObj.x;
                    return false;
                } else return true;
            });
        }
        if (!down) {
            // LOOKING DOWN
            const downView = matrix.filter(
                (tree) => tree.x === treeObj.x && tree.y >= treeObj.y + 1
            );
            downView.sort((a, b) => a.y - b.y);
            downView.every((tree) => {
                if (tree.val >= currTreeHeight) {
                    down = tree.y - treeObj.y;
                    return false;
                } else return true;
            });
        }
        if (!up) {
            const viewUp = matrix.filter(
                (tree) => tree.x === treeObj.x && tree.y <= treeObj.y - 1
            );
            viewUp.sort((a, b) => b.y - a.y);
            viewUp.every((tree, idx) => {
                if (tree.val >= currTreeHeight) {
                    up = treeObj.y - tree.y;
                    return false;
                } else return true;
            });
        }
        treeObj.scenicScore = up * left * down * right;
        treeObj.scenicScore > highestScenicScore &&
            (highestScenicScore = treeObj.scenicScore);
    });
    return highestScenicScore;
}

countVisibleTrees(treeMatrix);
console.log(
    `PART 2: Highest scenic Score possibl:${calculateScenicScore(treeMatrix)}`
);
