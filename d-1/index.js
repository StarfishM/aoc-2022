const { input } = require("./input");

/* 
//////////////////////
/////// PART 1 ///////
//////////////////////
This list represents the Calories of the food carried by five Elves:

The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
The second Elf is carrying one food item with 4000 Calories.
The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
The fifth Elf is carrying one food item with 10000 Calories.
In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

*/

const sumOfNums = (numArray) =>
    numArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
let maxCaloriesCarried = 0;

input.forEach((caloriesCarried) => {
    let sumOfCalories = sumOfNums(caloriesCarried);
    if (maxCaloriesCarried < sumOfCalories) {
        maxCaloriesCarried = sumOfCalories;
    }
});

console.log(
    `🧝🎒 PART 1: The elf carrying the most amount of calories is carrying: ${maxCaloriesCarried} calories`
);

//////////////////////
/////// PART 2 ///////
//////////////////////
/*
--- Part Two ---
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/

const allCaloriesCarried = [];

input.forEach((caloriesCarried) => {
    let caloriesTotal = sumOfNums(caloriesCarried);
    allCaloriesCarried.push(caloriesTotal);
});
allCaloriesCarried.sort((a, b) => b - a);

const sumOfTopThreeElves =
    allCaloriesCarried[0] + allCaloriesCarried[1] + allCaloriesCarried[2];

console.log(
    `🧝‍♀️🧝🧝‍♂️ PART 2: the top three elves, are carrying a totla of ${sumOfTopThreeElves}`
);
