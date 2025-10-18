import axios from "axios";
import type Game from "../types/Game";
import { useState } from "react";

interface BotMoveGetterProps {
	currentPlayer: number;
	game: Game;
	setLastMove: (move: number[]) => void;
}

const BotMoveGetter = ({
	currentPlayer,
	game,
	setLastMove,
}: BotMoveGetterProps) => {
	const [status, setStatus] = useState(0);

	const getMove = () => {
		axios
			.post("https://localhost:5000/api/getMove")
			.then((res) => {
				const move = [currentPlayer, res.data.player, res.data.ask];
				giveResult(
					game.move(currentPlayer, res.data.player, res.data.ask)
				);
				setStatus(2);
				setLastMove(move);
			})
			.catch((err) => console.error(err));
	};

	const giveResult = (result: number) => {
		axios
			.post("https://localhost:5000/api/giveResult", { result: result })
			.catch((err) => console.error(err));
	};

	return status == 0 ? ( //TODO styling
		<div>
			<button>Get Bot Move</button>
		</div>
	) : status == 1 ? (
		<div>
			<p>Loading...</p>
		</div>
	) : (
		""
	);
};

export default BotMoveGetter;
