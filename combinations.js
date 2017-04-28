let combinations = function(people, k) {
	// can't select more people than the number of people given to you
	if (k > people.length || k <= 0) {
		return [];
	}

	/* if the number of people you want to select is equal to the number of people given to you. There's only
	one possible combination - all the people. */
	if (k === people.length) {
		return [people];
	}

	// if you want to select 1 person, the set of all possible selections is simply a set of each individual
	if (k === 1) {
		let combo = [];
		for (let i = 0; i < people.length; i++) {
			combo.push([people[i]]);
		}
		return combo;
	}

	// Use recursion to get all the combinations of k people out of the original people array
	let combo = [];
	for (let i = 0; i < people.length - k + 1; i++) {
		let head = people.slice(i, i + 1);
		let tailcombo = combinations(people.slice(i + 1), k - 1);

		for (let j = 0; j < tailcombo.length; j++) {
			combo.push(head.concat(tailcombo[j]));
		}
	}
	return combo;
}

module.exports = combinations;
