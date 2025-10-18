import { useState } from "react";
import type Game from "../types/Game";

interface PlayerMoveMenuProps {
	currentPlayer: number;
	game: Game;
	doMove: (asker: number, asked: number, card: number) => number;
}

const PlayerMoveMenu = ({
	currentPlayer,
	game,
	doMove,
}: PlayerMoveMenuProps) => {
	const [cardAsk, setCardAsk] = useState(0);

	const handleSubmit = (turn: number) => {
		if (cardAsk == 0) return;
		doMove(currentPlayer, turn, cardAsk);
		setCardAsk(0);
	};

	return (
		<div className="w-full h-full flex flex-col items-center pt-5">
			{cardAsk !== 0 && (
				<button
					onClick={() => setCardAsk(0)}
					className="p-3 absolute top-[72vh] left-1 bg-red-400 hover:bg-red-500 active:bg-red-600 cursor-pointer rounded-md "
				>
					Back
				</button>
			)}
			<h2 className="font-semibold text-center text-2xl mb-5">
				Current Hand:{" "}
				{game.players[currentPlayer].hand
					.map((value, _) => {
						return numToCard(value);
					})
					.join(", ")}
			</h2>
			{cardAsk === 0 ? (
				<>
					<h3 className="text-xl font-semibold text-center mb-5">
						Choose card to ask for:
					</h3>
					<div className="flex flex-row flex-wrap gap-x-5 gap-y-2 justify-center items-center">
						{game.players[currentPlayer].hand.map(
							(value, index) => {
								return (
									<div
										key={index}
										className="text-center text-lg bg-gray-400 rounded-xl p-2 hover:bg-gray-300 cursor-pointer"
										onClick={() => {
											setCardAsk(value);
										}}
									>
										{numToCard(value)}
									</div>
								);
							}
						)}
					</div>
				</>
			) : (
				<>
					<h3 className="text-xl font-semibold text-center mb-5">
						Choose player to ask:
					</h3>
					<div className="flex flex-row flex-wrap gap-x-5 gap-y-2 justify-center items-center">
						{game.players.map((value, index) => {
							if (
								value.turn === currentPlayer ||
								value.hand.length === 0
							)
								return null;
							return (
								<div
									key={index}
									className="text-center text-lg bg-gray-400 rounded-xl p-2 hover:bg-gray-300 cursor-pointer"
									onClick={() => {
										handleSubmit(value.turn);
									}}
								>
									{value.turn === game.bot.turn
										? "Bot"
										: "Player " + (index + 1)}
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

function numToCard(num: number) {
	switch (num) {
		case 13:
			return "King";
		case 12:
			return "Queen";
		case 11:
			return "Jack";
		case 1:
			return "Ace";
		default:
			return num.toString();
	}
}

export default PlayerMoveMenu;
