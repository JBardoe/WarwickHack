import axios from "axios";
import Player from "./Player";
import type Game from "./Game";

export default class Bot extends Player {
	constructor(game: Game) {
		super(game);
	}

	eliminatePair(card: number) {
		axios
			.post("https://localhost:5000/api/eliminatePair", { card: card })
			.catch((err) => console.error(err));
	}
}
