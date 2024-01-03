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
var question1 = function () {
    var names = [
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
    var result = makePairs(names);
    console.log(result);
    console.log();
};
question1();
var question2 = function () {
    var names = [
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
    var dict = {};
    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
        var pair = names_1[_i];
        var name_1 = pair[0];
        var shop = pair[1];
        if (!(shop in dict)) {
            dict[shop] = [];
        }
        dict[shop].push(name_1);
    }
    var result = [];
    var unused = [];
    for (var shop in dict) {
        var names_2 = dict[shop];
        var temp_1 = makePairs(names_2);
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
    console.log(result);
    console.log();
};
question2();
