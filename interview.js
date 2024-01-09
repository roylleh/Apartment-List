var _ = require("lodash");
var makePairs = function (array) {
    if (array.length < 2) {
        // Unable to make pair
        return [array];
    }
    var result = [];
    var i = 1;
    while (i < array.length) {
        var pair = [array[i - 1], array[i]];
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
var makeDict = function (input) {
    var dict = {};
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var pair = input_1[_i];
        var key = pair[0];
        var val = pair[1];
        if (!(val in dict)) {
            dict[val] = [];
        }
        dict[val].push(key);
    }
    return dict;
};
var makeArray = function (inputDict) {
    var result = [];
    for (var name_1 in inputDict) {
        var team = inputDict[name_1];
        result.push([name_1, team]);
    }
    return result;
};
var question1 = function () {
    var input = [
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
    var result = makePairs(input);
    console.log("Random Pairs");
    console.log(result);
    console.log();
};
question1();
var question2 = function () {
    var input = [
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
    var result = [];
    var unused = [];
    var dict = makeDict(input);
    for (var shop in dict) {
        var names = dict[shop];
        var temp_1 = makePairs(names);
        var last = temp_1.slice(-1)[0];
        if (last.length === 1) {
            // Lone name, save for later
            unused.push(last[0]);
        }
        else if (last.length === 2) {
            // Normal pair
            result = result.concat(temp_1);
        }
        else if (last.length === 3) {
            // Normal pair with extra lone name
            unused.push(last[2]);
            last.pop();
            result = result.concat([last]);
        }
    }
    var temp = makePairs(unused);
    result = result.concat(temp);
    console.log("Random Pairs Similar Shops");
    console.log(result);
    console.log();
};
question2();
var question3 = function () {
    var inputDict = {
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
    var inputArray = makeArray(inputDict);
    inputArray = _.shuffle(inputArray);
    var result = [];
    var pair = [];
    var dict = makeDict(inputArray);
    while (true) {
        for (var team in dict) {
            var names = dict[team];
            var name_2 = names.pop();
            if (name_2) {
                pair.push(name_2);
            }
            else {
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
        var unusedName = pair[0];
        var unusedTeam = inputDict[unusedName];
        for (var name_3 in inputDict) {
            if (unusedName !== name_3) {
                var team = inputDict[name_3];
                if (unusedTeam !== team) {
                    result.push([unusedName, name_3]);
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
