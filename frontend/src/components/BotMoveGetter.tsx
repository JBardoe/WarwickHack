import axios from "axios";
import { useState } from "react";

interface BotMoveGetterProps {
	currentPlayer: number;
	doMove: (asker: number, asked: number, card: number) => number;
}

const BotMoveGetter = ({ currentPlayer, doMove }: BotMoveGetterProps) => {
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
