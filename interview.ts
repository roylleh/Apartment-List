const _ = require("lodash");

const makePairs = (array: string[]) => {
  if (array.length < 2) {
    // Unable to make pair
    return [array];
  }

  const result: string[][] = [];

  let i = 1;
  while (i < array.length) {
    const pair = [array[i - 1], array[i]];

    if (i === array.length - 2) {
      // Special odd case
      pair.push(array[i + 1]);
    }
    result.push(pair);

    // Go two by two, continue to make pairs
    i += 2;
  }

  return result;
};

const makeDict = (input: string[][]) => {
  const dict: { [Key: string]: string[] } = {};
  for (const pair of input) {
    const key = pair[0];
    const val = pair[1];

    if (!(val in dict)) {
      dict[val] = [];
    }
    dict[val].push(key);
  }

  return dict;
};

const makeArray = (inputDict: object) => {
  const result: string[][] = [];
  for (const name in inputDict) {
    const team = inputDict[name];
    result.push([name, team]);
  }

  return result;
};

const question1 = () => {
  let input = [
    "Ian",
    "Naomi",
    "Kyler",
    "Gabby",
    "Joe",
    "Carole",
    "Kelsey",
    "Josh",
    "Danielle",
    "Baker",
    "Brock",
  ];
  input = _.shuffle(input);
  const result = makePairs(input);

  console.log("Random Pairs");
  console.log(result);
  console.log();
};
question1();

const question2 = () => {
  let input = [
    ["Ian", "Starbucks"],
    ["Naomi", "Dutch Bros"],
    ["Kyler", "Starbucks"],
    ["Gabby", "Blue Bottle"],
    ["Joe", "Peet’s Coffee"],
    ["Carole", "Blue Bottle"],
    ["Kelsey", "Starbucks"],
    ["Josh", "Dunkin"],
    ["Danielle", "Blue Bottle"],
    ["Baker", "Dunkin"],
    ["Brock", "Blue Bottle"],
  ];
  input = _.shuffle(input);

  let result: string[][] = [];
  const unused: string[] = [];

  const dict = makeDict(input);
  for (const shop in dict) {
    const names = dict[shop];
    const temp = makePairs(names);
    const last = temp.slice(-1)[0];

    if (last.length === 1) {
      // Lone name, save for later
      unused.push(last[0]);
    } else if (last.length === 2) {
      // Normal pair
      result = result.concat(temp);
    } else if (last.length === 3) {
      // Normal pair with extra lone name
      unused.push(last[2]);
      last.pop();
      result = result.concat([last]);
    }
  }

  const temp = makePairs(unused);
  result = result.concat(temp);

  console.log("Random Pairs Similar Shops");
  console.log(result);
  console.log();
};
question2();

const question3 = () => {
  const inputDict = {
    Ian: "Accounting",
    Naomi: "Sales",
    Kyler: "Engineering",
    Gabby: "Sales",
    Joe: "Sales",
    Carole: "HR",
    Kelsey: "HR",
    Josh: "Sales",
    Danielle: "Engineering",
    Baker: "Exec",
    Brock: "Engineering",
  };

  let inputArray = makeArray(inputDict);
  inputArray = _.shuffle(inputArray);

  const result: string[][] = [];
  let pair: string[] = [];

  const dict = makeDict(inputArray);
  while (true) {
    for (const team in dict) {
      const names = dict[team];
      const name = names.pop();

      if (name) {
        pair.push(name);
      } else {
        delete dict[team];
      }

      if (pair.length === 2) {
        result.push(pair);
        pair = [];
      }
    }

    if (!Object.keys(dict).length) {
      break;
    }
  }

  if (pair.length) {
    const unusedName = pair[0];
    const unusedTeam = inputDict[unusedName];

    for (const name in inputDict) {
      if (unusedName !== name) {
        const team = inputDict[name];
        if (unusedTeam !== team) {
          result.push([unusedName, name]);
          break;
        }
      }
    }
  }

  console.log("Random Pairs Dissimilar Teams");
  console.log(result);
  console.log();
};
question3();
