export default class Player {
	hand: number[];
	constructor() {
		this.hand = [];
	}

	takeCards(deck: number[]) {
		for (let i = 0; i < 7; i++) {
			let index = Math.floor(Math.random() * deck.length);

			this.hand.push(deck[index]);
			deck.splice(index, 1);
		}
		this.hand.sort((a: number, b: number) => a - b);
	}
}
//TODO
