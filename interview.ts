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

const question1 = () => {
  let names = [
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
  names = _.shuffle(names);
  const result = makePairs(names);

  console.log(result);
  console.log();
};
question1();

const question2 = () => {
  let names = [
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
  names = _.shuffle(names);

  // Group names by coffee shop
  const dict: { [Key: string]: string[] } = {};
  for (const pair of names) {
    const name = pair[0];
    const shop = pair[1];

    if (!(shop in dict)) {
      dict[shop] = [];
    }
    dict[shop].push(name);
  }

  let result: string[][] = [];
  const unused: string[] = [];

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
  console.log(result);
  console.log();
};
question2();
