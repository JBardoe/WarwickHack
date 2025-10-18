import Bot from "./Bot";
import Player from "./Player";

export default class Game {
	deck: string[];
	humans: Player[];
	bot: Bot;

	constructor(numPlayers: number) {
		this.deck = [...fullDeck];
		this.humans = [];

		for (let i = 0; i < numPlayers; i++) {
			this.humans.push(new Player());
			this.humans[i].takeCards(this.deck);
		}

		this.bot = new Bot();
		this.bot.takeCards(this.deck);
	}
}

const fullDeck = [
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
];
