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

	// All combinations of groups of 1 is equivalent to the set of all individuals.
	if (k === 1) {
		let combo = [];
		for (let i = 0; i < people.length; i++) {
			combo.push([people[i]]);
		}
		return combo;
	}

	/* To get all ways to choose k people from the pool, we can use recursion.
	We can iterate over the people array from left to right, at each individual, we can use recursion to identify all
	ways to choose k-1 people from the people to the individual's right. Once we get that set, we can return the
	set after concatenating the current individual at the head of each sub-group.
	*/
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
