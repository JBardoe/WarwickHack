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
			.catch((err) => {
				console.error(err);
				setStatus(0);
			});
	};

	const giveResult = (result: number) => {
		axios
			.post("https://localhost:5000/api/giveResult", { result: result })
			.catch((err) => console.error(err));
	};

	return status == 0 ? (
		<div>
			<button
				onClick={() => {
					setStatus(1);
					getMove();
				}}
				className="cursor-pointer bg-green-500 hover:bg-green-700 active:bg-green-900 hover:scale-[105%] active:scale-[97%] rounded-full font-bold text-2xl p-5"
			>
				Get Bot Move
			</button>
		</div>
	) : status == 1 ? (
		<div>
			<p className="italic text-gray-500 text-xl cursor-not-allowed">
				Loading...
			</p>
		</div>
	) : (
		""
	);
};

export default BotMoveGetter;
