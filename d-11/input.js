module.exports.testInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`
    .split(/(^[ \t]*\n)/gm)
    .map((monkeyLine) => {
        const monkeyInstructions = monkeyLine.split(/\n/).filter(Boolean);
        // console.log("monkeyInstructions", monkeyInstructions);
        const monkeyObj = {};
        if (monkeyInstructions.length > 0) {
            let [numOfMonkey, items, operation, test, isTrue, isFalse] =
                monkeyInstructions.length > 0 && monkeyInstructions;
            monkeyObj.num = Number(numOfMonkey.match(/\d/gm)[0]);
            monkeyObj.items = items.match(/\d+/gm).map((num) => Number(num));
            monkeyObj.operant = operation.match(/\+|\*/gm)[0];
            monkeyObj.increaseBy = operation.match(/\d+/gm)
                ? Number(operation.match(/\d+/gm)[0])
                : null;
            monkeyObj.deviseableByTest = Number(test.match(/\d+/gm)[0]);
            monkeyObj.isTrue = Number(isTrue.match(/\d+/gm)[0]);
            monkeyObj.isFalse = Number(isFalse.match(/\d+/gm)[0]);
            monkeyObj.inspectionCount = 0;
            return monkeyObj;
        }
    })
    .filter(Boolean);
module.exports.input = `Monkey 0:
Starting items: 56, 56, 92, 65, 71, 61, 79
Operation: new = old * 7
Test: divisible by 3
  If true: throw to monkey 3
  If false: throw to monkey 7

Monkey 1:
Starting items: 61, 85
Operation: new = old + 5
Test: divisible by 11
  If true: throw to monkey 6
  If false: throw to monkey 4

Monkey 2:
Starting items: 54, 96, 82, 78, 69
Operation: new = old * old
Test: divisible by 7
  If true: throw to monkey 0
  If false: throw to monkey 7

Monkey 3:
Starting items: 57, 59, 65, 95
Operation: new = old + 4
Test: divisible by 2
  If true: throw to monkey 5
  If false: throw to monkey 1

Monkey 4:
Starting items: 62, 67, 80
Operation: new = old * 17
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 6

Monkey 5:
Starting items: 91
Operation: new = old + 7
Test: divisible by 5
  If true: throw to monkey 1
  If false: throw to monkey 4

Monkey 6:
Starting items: 79, 83, 64, 52, 77, 56, 63, 92
Operation: new = old + 6
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 7:
Starting items: 50, 97, 76, 96, 80, 56
Operation: new = old + 3
Test: divisible by 13
  If true: throw to monkey 3
  If false: throw to monkey 5`
    .split(/(^[ \t]*\n)/gm)
    .map((monkeyLine) => {
        const monkeyInstructions = monkeyLine.split(/\n/).filter(Boolean);
        // console.log("monkeyInstructions", monkeyInstructions);
        const monkeyObj = {};
        if (monkeyInstructions.length > 0) {
            let [numOfMonkey, items, operation, test, isTrue, isFalse] =
                monkeyInstructions.length > 0 && monkeyInstructions;
            monkeyObj.num = Number(numOfMonkey.match(/\d/gm)[0]);
            monkeyObj.items = items.match(/\d+/gm).map((num) => Number(num));
            monkeyObj.operant = operation.match(/\+|\*/gm)[0];
            monkeyObj.increaseBy = operation.match(/\d+/gm)
                ? Number(operation.match(/\d+/gm)[0])
                : null;
            monkeyObj.deviseableByTest = Number(test.match(/\d+/gm)[0]);
            monkeyObj.isTrue = Number(isTrue.match(/\d+/gm)[0]);
            monkeyObj.isFalse = Number(isFalse.match(/\d+/gm)[0]);
            monkeyObj.inspectionCount = 0;
            return monkeyObj;
        }
    })
    .filter(Boolean);
