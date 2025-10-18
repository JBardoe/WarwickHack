import { useState } from "react";
import type Game from "../types/Game";
import Bot from "../types/Bot";
import BotMoveGetter from "./BotMoveGetter";
import PlayerMoveMenu from "./PlayerMoveMenu";
import GameState from "./GameState";

interface GameDisplayProps {
	game: Game;
}

const GameDisplay = ({ game }: GameDisplayProps) => {
	const [currentPlayer, setCurrentPlayer] = useState(0);
	const [lastMove, setLastMove] = useState<number[]>([]);

	const nextTurn = () => {
		setCurrentPlayer((old) => old + 1); //TODO
	};

	return (
		<>
			{game.ended.length === game.players.length ? (
				<WinnerDisplay game={game} />
			) : (
				<GameState
					game={game}
					lastMove={lastMove}
					currentPlayer={currentPlayer}
				/>
			)}
			<div className="bg-gray-200 dark:bg-gray-600 flex flex-row items-center justify-center w-full h-[30vh]">
				{currentPlayer === game.bot.turn ? (
					<BotMoveGetter
						currentPlayer={currentPlayer}
						game={game}
						setLastMove={setLastMove}
					/>
				) : (
					<PlayerMoveMenu
						currentPlayer={currentPlayer}
						game={game}
						setLastMove={setLastMove}
					/>
				)}
			</div>
		</>
	);
};

export default GameDisplay;
