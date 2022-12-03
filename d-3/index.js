// split strings into two arrays of each of their characters
// find exact characters that exist in both arrays -> those are the mistakes
// find priority number -> maybe generate a dictionary for this
// calculate sum of priorities
const { testData, data } = require("./input");
// console.log("testData: ", testData);

const errorItems = [];
const intersection = (arr1, arr2) =>
    arr1.filter((element) => arr2.includes(element));

data.forEach((rucksack) => {
    const intersects = intersection(rucksack.f, rucksack.s);
    intersects[0] && errorItems.push(intersects[0]);
});

const priorityDict = {};
for (let i = 0; i < 26; i++) {
    priorityDict[(i + 10).toString(36)] = i + 1;
}
for (let prop in priorityDict) {
    priorityDict[prop.toUpperCase()] = priorityDict[prop] + 26;
}
let prioritySum = 0;

errorItems.forEach((item) => (prioritySum += priorityDict[item]));
console.log("Part 1:prioritySum: ", prioritySum);

///////////////////////
////////PART 2////////
/////////////////////
