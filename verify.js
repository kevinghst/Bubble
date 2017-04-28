let verify = function(group){
  // Check for noisy and understand conditions
  let noisy = 0;
  let understand = 0;
  let nameHash = {};

  group.forEach(function(student){
    nameHash[student.name] = true;
    if(student.noisy){
      noisy += 1;
    }
    if(student.understands){
      understand += 1;
    }
  })

  if(noisy > 2 || understand === 0){
    return false;
  }

  // Check fighting condition

  for(let i=0; i<group.length; i++){
    let enemies = group[i].fights_with;
    for(let j=0; j<enemies.length; j++){
      if(nameHash[enemies[j]]){
        return false;
      }
    }
  }
  return true;
}

module.exports = verify;
