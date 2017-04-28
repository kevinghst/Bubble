let findAnswer = require('./findAnswer');
let input = require('../data.json');
/*
Approach:

First, given the array of people to be grouped and the number of groups desired, figure out how many people go
into each group. Store the group sizes in an array (eg: [4,3,3]).

Then, We can use a recursive function (findAnswer) to give us the first valid set of groups. If there is no valid set,
the function returns null. This function takes in three arguments: a) original array of people, b) group sizes, and a
hash that allows for dynamic programming. It is explained in more detail in the findAnswer module.
*/

function main(json){
  let n = json.groups;
  let people = json.students;

  // The number of groups can't be more than the number of people
  if(n > people.length){
    return "impossible";
  }

  // Identify how many people are going to be each of the n groups. Store the group sizes in an array. eg: [4,3,3]
  let average = Math.floor(people.length/n);
  let remainder = people.length - average * n;

  let groupSizes = Array.apply(null, Array(n)).map(Number.prototype.valueOf,average);

  for(let i=0; i<remainder; i++){
    groupSizes[i] += 1;
  }

  // Get valid set of groups if there is any.
  let result = findAnswer(people, groupSizes, {});
  if(result === null){
    return "impossible";
  } else {
    return result;
  }
}


console.log(main(input));
