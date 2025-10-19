import type Game from "./Game";

export default class Player {
	hand: number[];
	score: number;
	game: Game;
	turn: number;

	constructor(game: Game, turn: number) {
		this.hand = [];
		this.score = 0;
		this.game = game;
		this.turn = turn;
	}

	//Player takes their initial hand from the deck
	takeCards(deck: number[]) {
		for (let i = 0; i < 7; i++) {
			let index = Math.floor(Math.random() * deck.length);

			this.hand.push(deck[index]);
			deck.splice(index, 1);
		}
		this.hand.sort((a: number, b: number) => a - b);
	}

	//Check for pairs in the current hand
	checkPairs() {
		let i = 0;

		while (i < this.hand.length - 1) {
			if (this.hand[i] == this.hand[i + 1]) {
				this.game.eliminatePair(this.turn, this.hand[i]);
				this.hand.splice(i, 2);
				this.score++;
			} else {
				i++;
			}
		}
	}

	//Binary search to find a certain card
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

	//Remove a card from the hand and return how many there were
	giveCard(card: number) {
		let count = 0;
		let i = this.hasCard(card);

		while (i >= 0 && this.hand[i] === card) {
			i--;
		}
		i++;
		const startingIndex = i;
		while (i < this.hand.length && this.hand[i] === card) {
			count++;
			i++;
		}

		this.hand.splice(startingIndex, count);

		return count;
	}

	//Add a card to the hand
	gainCard(card: number, num: number) {
		const index = this.hasCard(card);
		if (index != -1) {
			for (let i = 0; i < num; i++) {
				this.hand.splice(index, 0, card);
			}
			this.checkPairs();
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
		this.checkPairs();
	}
}
