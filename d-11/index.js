const { testInput, input } = require("./input");
// console.log("testInput", testInput);
// const monkeyArr = testInput;

// Prelim thoughts:
// rotate through monkeys -> start at index 0, check if we're at end, and whether we are at end of round 20
// if not at round 20, but end of monkey array, reset idx to 0
/* for each monkey 
    go through items, calculate score by taking operant  and increaseBy value, if that val doesn't exist, use item val
    // run test, throw to monkey based on if test passes or fails
    // increase inspection score of monkey
    */

///////////////////////////////
/////////// PART 1 ///////////
/////////////////////////////
const monkeyArr = input;
let rounds = 0;

function executeItemInspection(arrOfMonkeys, numOfRounds) {
    for (let i = 0; i < arrOfMonkeys.length; i++) {
        arrOfMonkeys[i].items.forEach((worryLevel) => {
            const increaseBy = arrOfMonkeys[i].increaseBy
                ? arrOfMonkeys[i].increaseBy
                : worryLevel;
            let newWorryLevel =
                arrOfMonkeys[i].operant === "*"
                    ? worryLevel * increaseBy
                    : worryLevel + increaseBy;
            monkeyArr[i].inspectionCount++;
            newWorryLevel = Math.floor(newWorryLevel / 3);

            const throwsToMonkey = monkeyArr.find(
                (monkey) =>
                    monkey.num ===
                    arrOfMonkeys[i][
                        newWorryLevel % arrOfMonkeys[i].deviseableByTest === 0
                            ? "isTrue"
                            : "isFalse"
                    ]
            );
            throwsToMonkey.items.push(newWorryLevel);
        });
        monkeyArr[i].items = [];
    }
    rounds++;
    if (rounds === numOfRounds) {
        return;
    } else {
        executeItemInspection(arrOfMonkeys, numOfRounds);
    }
}

executeItemInspection(monkeyArr, 20);
monkeyArr.sort((a, b) => b.inspectionCount - a.inspectionCount);

console.log(
    "⭐️ Part 1: What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans? 🙈🙉🐵 ",
    monkeyArr[0].inspectionCount * monkeyArr[1].inspectionCount
);
