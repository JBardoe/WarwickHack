import { useEffect } from "react";
import type Game from "../types/Game";

interface GameStateProps {
	game: Game;
	lastMove: number[];
	currentPlayer: number;
}

const GameState = ({ game, lastMove, currentPlayer }: GameStateProps) => {
	useEffect(() => {
		console.log(
			`Player ${lastMove[0]} has taken card ${lastMove[1]} from player ${lastMove[2]}`
		);
	}, [lastMove]); //TODO
	return (
		<div className="bg-gray-400 dark:bg-gray-950 h-[70vh] w-full flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-2 border-black border-b-2 overflow-y-scroll">
			{game.players.map((player, index) => {
				return (
					<div
						key={index}
						className={
							(index == currentPlayer
								? "bg-gray-100 dark:bg-gray-500"
								: "bg-gray-300 dark:bg-gray-700") +
							" rounded-2xl mt-10 h-[25vh] px-20 "
						}
					>
						<h2 className="text-2xl font-bold text-center mb-10">
							{game.bot.turn !== index
								? "Player " + (index + 1)
								: "Bot"}
							:
						</h2>
						<p className="text-lg font-semibold">
							Score: {player.score}
							<br />
							Deck Size: {player.hand.length}
						</p>
					</div>
				);
			})}
		</div>
	); //TODO
};

export default GameState;
