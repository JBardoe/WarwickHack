import Bot from "./Bot";
import Player from "./Player";

export default class Game {
	deck: number[];
	players: Player[];

	constructor(numPlayers: number) {
		this.deck = Array.from({ length: 4 }, () =>
			Array.from({ length: 13 }, (_, i) => i + 1)
		)
			.flat()
			.sort((a: number, b: number) => a - b);
		this.players = [];

		for (let i = 0; i < numPlayers; i++) {
			this.players.push(new Player());
			this.players[i].takeCards(this.deck);
		}

		const bot = new Bot();
		bot.takeCards(this.deck);

		this.players.push(bot);
		for (let i = this.players.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.players[i], this.players[j]] = [
				this.players[j],
				this.players[i],
			];
		}
	}

	move(asker: number, asked: number, card: number) {
		if (this.players[asked].hasCard(card) != -1) {
			const num = this.players[asked].giveCard(card);
			this.players[asked].gainCard(card, num);
			return -1;
		}
		return this.goFish(this.players[asker]);
	}

	goFish(player: Player) {
		const index = Math.floor(Math.random() * this.deck.length);
		const card = this.deck[index];
		this.deck.splice(index, 1);
		player.gainCard(card, 1);
		return card;
	}
}
