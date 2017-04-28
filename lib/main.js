let findAnswer = require('./findAnswer');
let input = require('../data.json');
/*
Approach:

First, given the array of people to be grouped and the number of groups desired, figure out how many people go
into each group.

Then, We can use a recursive function (findAnswer) to give us the first valid set of groups. If there is no valid set,
the function returns null. This function takes in four arguments: a) original array of people, b) group sizes,
c) current group index (in reference in the array of group sizes), and a hash that allows for dynamic programming.
It is explained in more detail in the findAnswer module.
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

  let result = findAnswer(people, groupSizes, 0, {});
  if(result === null){
    return "impossible";
  } else {
    return result;
  }
}


console.log(main(input));
