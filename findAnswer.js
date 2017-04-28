let verify = require('./verify');
let combinations = require('./combinations');

/*
Let's use an example to illustrate the logic of this function.
Imagine there are 10 people and we want to group them into 3 groups of [4,3,3].
One way to do this is to first get all the possible ways to choose 4 people out of 10. Then, for each of these
scenarios we first check to see if the group of 4 is valid (function verify). If it is, then we can find out
whether there is a valid way to group the rest of the 6 people into [3, 3] by recursively calling the function
while passing the other 6 people as the first argument, while incremeting the group index by 1. The recursive function
would return the first valid set of groups it calculates or null is none is to be found.

The base case is when we only have one more group to verify. In the example above, it would be when we only have
three people, and idx of 2 (corresponding to the last position of groupSizes array) passed into the function.
At this point, since we know all the remaining people are to be assembled into one group, we simply need to check
the validity of this group, and either return the group or null.

One way to improve the algorithm's efficiency is through dynamic programming. Once we check the validity of a
certain group of people, there is no reason to check it again once we encounter the same set of people later on.
Due to the nature of our algorithm, we know that there will be plenty of instances where we are checking the
validiy of identical groups of people. Thus, we can use a global hash to store the boolean validity value of
all the groups that we've checked using the verify function, and we would use our verify function only when
the validity of the group signature is not already stored in the hash.
*/

let findAnswer = function(people, groupSizes, idx, hash){
  // if it is the last group, simply group all the remaining ungrouped people, and check whether if group is valid)
  if(groupSizes.length === idx+1){
    let names = "";
    people.forEach(function(student){ names += student.name; });

    // Dynamic programming to check whether if this group of people was already checked for validity before
    if(hash[names] === false){
      return null;
    }
    else if(typeof hash[names] === 'undefined'){
      let validity = verify(people);
      hash[names] = validity;
      if(validity === false){
        return null;
      }
    }
    let namesArray = people.map(function(student){ return student.name });
    return [namesArray];
  } else {
    // how many people are in the current group we are selecting?
    let number = groupSizes[idx];
    // Get all possible combinations of given number of people out of all
    let groups = combinations(people, number);


    /* Iterate over each group, check its validity. If valid, recursively check whether if we can get a valid
    set of groups from the rest of the people.
    */
    for(let i=0; i<groups.length; i++){
      let group = groups[i];

      let names = "";
      group.forEach(function(student){ names += student.name; });

      // Dynamic programming to check whether if this group of people was already checked for validity before
      if(hash[names] === false){
        continue;
      }
      else if (typeof hash[names] === 'undefined'){
        let validity = verify(group);
        hash[names] = validity;
        if(validity === false){
          continue;
        }
      }

      let otherPeople = people.filter(function(x) { return group.indexOf(x) < 0 });
      let otherGroups = findAnswer(otherPeople, groupSizes, idx+1, hash);

      if(otherGroups === null){
        continue;
      } else {
        let namesArray = group.map(function(student){ return student.name });
        return [namesArray].concat(otherGroups);
      }
    }
    return null;
  }
}

module.exports = findAnswer;