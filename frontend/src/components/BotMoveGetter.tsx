import axios from "axios";
import { useState } from "react";
import type Game from "../types/Game";
import numToCard from "../utils/NumToCard";

interface BotMoveGetterProps {
	currentPlayer: number;
	game: Game;
	doMove: (asker: number, asked: number, card: number) => number;
}

const BotMoveGetter = ({ currentPlayer, game, doMove }: BotMoveGetterProps) => {
	const [status, setStatus] = useState(0);

	const getMove = () => {
		axios
			.post("http://localhost:5000/api/getMove")
			.then((res) => {
				const result = doMove(
					currentPlayer,
					res.data.player,
					res.data.ask
				);
				giveResult(res.data.player, res.data.ask, result);
				setStatus(2);
			})
			.catch((err) => {
				console.error(err);
				setStatus(0);
			});
	};

	const giveResult = (asked: number, card: number, result: number) => {
		axios
			.post("http://localhost:5000/api/giveResult", {
				asked: asked,
				card: card,
				result: result,
			})
			.catch((err) => console.error(err));
	};

	return status == 0 ? (
		<div className="flex flex-col items-center justify-center">
			<h2 className="font-semibold text-center text-2xl mb-5">
				Current Hand:{" "}
				{game.bot.hand
					.map((value, _) => {
						return numToCard(value);
					})
					.join(", ")}
			</h2>
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
