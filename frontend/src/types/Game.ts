import Bot from "./Bot";
import Player from "./Player";

export default class Game {
	deck: number[];
	humans: Player[];
	bot: Bot;

	constructor(numPlayers: number) {
		this.deck = Array.from({ length: 4 }, () =>
			Array.from({ length: 13 }, (_, i) => i + 1)
		)
			.flat()
			.sort((a: number, b: number) => a - b);
		this.humans = [];

		for (let i = 0; i < numPlayers; i++) {
			this.humans.push(new Player());
			this.humans[i].takeCards(this.deck);
		}

		this.bot = new Bot();
		this.bot.takeCards(this.deck);
	}
}
