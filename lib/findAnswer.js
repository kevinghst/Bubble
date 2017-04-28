let verify = require('./verify');
let combinations = require('./combinations');

/*
Let's use an example to illustrate the logic of this function.
Imagine there are 10 people and we want to group them into 3 groups of [4,3,3].
One way to do this is to first get all possible groups of 4 (10 choose 4). Then, for each of these
groups we first check to see if it is valid (function verify). If it is, then we can find out
whether there is a valid way to group the rest of the 6 people into [3, 3] by recursively calling the function
while passing the other 6 people as the first argument, and the group sizes array after slicing off the
leftmost element (which represents current group size) as the second. If there is a valid way to group the rest
of the people into the specific group sizes want, then the recursive call would return the first such valid set,
and we can then return the combination of the set of original 4 people group and the set of the groups of the other 6
people. If there is NO valid way to group the other 6, the recursive call would return null, and if that happens
we move on to the next possible group of 4 and repeat the same procedure.

The base case is when we have to group all the people (first argument) into one group, this happens when the
groupSizes array only has one element. At this point, we simply need to treat all people as one group
and check for its validity. We would either return the group itself or null depending whether it is valid.

One way to improve the algorithm's efficiency is through dynamic programming. Once we check the validity of a
certain group, there is no reason to check it again once we encounter the same group later on.
Due to the nature of our algorithm, we know that there will be plenty of instances where we bump into identical
groups. Thus, we can use a global hash to store the boolean validity value of all the groups that
we've checked, and we would use our verify function only if the group signature is not already present in the hash.
*/

let findAnswer = function(people, groupSizes, hash){
  // If it's the last group, simply treat all people as one group and check for its validity
  if(groupSizes.length === 1){
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
    let n = groupSizes[0];
    // Get all possible ways to choose n number of people
    let groups = combinations(people, n);

    /* Iterate over each group, check for its validity. If valid, check whether if we can group the remaining people
    (original people - people in group) into remaining groups.
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
      let otherGroups = findAnswer(otherPeople, groupSizes.slice(1, groupSizes.length), hash);

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
