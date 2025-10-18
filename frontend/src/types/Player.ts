export default class Player {
	hand: number[];
	score: number;

	constructor() {
		this.hand = [];
		this.score = 0;
	}

	takeCards(deck: number[]) {
		for (let i = 0; i < 7; i++) {
			let index = Math.floor(Math.random() * deck.length);

			this.hand.push(deck[index]);
			deck.splice(index, 1);
		}
		this.hand.sort((a: number, b: number) => a - b);
	}

	checkPairs() {
		for (let i = 0; i < this.hand.length; i++) {
			//todo
		}
	}

	hasCard(card: number) {
		let left = 0;
		let right = this.hand.length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			const midVal = this.hand[mid];

			if (midVal === card) {
				return mid;
			} else if (midVal < card) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return -1;
	}

	giveCard(card: number) {
		let count = 0;
		let i = this.hasCard(card);

		while (this.hand[i] === card) {
			i--;
		}
		i++;
		const startingIndex = i;
		while (this.hand[i] === card) {
			count++;
			i++;
		}

		this.hand.splice(startingIndex, count);

		return count;
	}

	gainCard(card: number, num: number) {
		const index = this.hasCard(card);
		if (index != -1) {
			for (let i = 0; i < num; i++) {
				this.hand.splice(index, 0, card);
			}
			return;
		}

		let left = 0;
		let right = this.hand.length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			const midVal = this.hand[mid];

			if (midVal === card) {
				return; //Should never happen
			} else if (midVal < card) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		for (let i = 0; i < num; i++) {
			this.hand.splice(left, 0, card);
		}
	}
}
