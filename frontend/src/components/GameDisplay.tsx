import { useState } from "react";
import type Game from "../types/Game";
import BotMoveGetter from "./BotMoveGetter";
import PlayerMoveMenu from "./PlayerMoveMenu";
import GameState from "./GameState";
import WinnerDisplay from "./WinnerDisplay";
import MoveDisplay from "./MoveDisplay";

interface GameDisplayProps {
	game: Game;
}

const GameDisplay = ({ game }: GameDisplayProps) => {
	const [currentPlayer, setCurrentPlayer] = useState(0);
	const [currentMove, setCurrentMove] = useState<number[]>([]);

	const nextTurn = () => {
		setCurrentPlayer((old) => old + 1);
		//todo next player display
	};

	const doMove = (asker: number, asked: number, card: number) => {
		const result = game.move(asker, asked, card);
		setCurrentMove([asker, asked, card, result]);
		game.bot.updateBot([asker, asked, card, result]);
		setTimeout(() => {
			setCurrentMove([]);
			nextTurn();
		}, 1500);
		return result;
	};

	return (
		<>
			{currentMove.length !== 0 && <MoveDisplay move={currentMove} />}
			{game.ended.length === game.players.length ? (
				<WinnerDisplay game={game} />
			) : (
				<>
					<GameState game={game} currentPlayer={currentPlayer} />

					<div className="bg-gray-200 dark:bg-gray-600 flex flex-row items-center justify-center w-full h-[30vh] overflow-y-scroll">
						{currentPlayer === game.bot.turn ? (
							<BotMoveGetter
								currentPlayer={currentPlayer}
								doMove={doMove}
							/>
						) : (
							<PlayerMoveMenu
								currentPlayer={currentPlayer}
								game={game}
								doMove={doMove}
							/>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default GameDisplay;
