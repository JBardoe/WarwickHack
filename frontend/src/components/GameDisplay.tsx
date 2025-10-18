import { useEffect, useState } from "react";
import type Game from "../types/Game";
import BotMoveGetter from "./BotMoveGetter";
import PlayerMoveMenu from "./PlayerMoveMenu";
import GameState from "./GameState";
import WinnerDisplay from "./WinnerDisplay";
import MoveDisplay from "./MoveDisplay";
import PlayerDisplay from "./PlayerDisplay";

interface GameDisplayProps {
	game: Game;
}

const GameDisplay = ({ game }: GameDisplayProps) => {
	const [currentPlayer, setCurrentPlayer] = useState(0);
	const [currentMove, setCurrentMove] = useState<number[]>([]);
	const [movingPlayer, setMovingPlayer] = useState(-1);

	useEffect(() => {
		setMovingPlayer(0);
		setTimeout(() => {
			setMovingPlayer(-1);
		}, 1500);
	}, []);

	const nextTurn = () => {
		let newPlayer = (currentPlayer + 1) % game.players.length;
		while (game.players[newPlayer].hand.length === 0) {
			newPlayer = (newPlayer + 1) % game.players.length;
		} //TODO account for game end
		setCurrentPlayer(newPlayer);
		setMovingPlayer(newPlayer);
		setTimeout(() => {
			setMovingPlayer(-1);
		}, 1500);
	};

	const doMove = (asker: number, asked: number, card: number) => {
		const result = game.move(asker, asked, card);
		setCurrentMove([asker, asked, card, result]);
		if (game.bot.turn !== asker) {
			game.bot.updateBot([asker, asked, card, result]);
		}
		setTimeout(() => {
			setCurrentMove([]);
			nextTurn();
		}, 1500);
		return result;
	};

	return (
		<>
			{currentMove.length !== 0 && <MoveDisplay move={currentMove} />}
			{movingPlayer !== -1 && (
				<PlayerDisplay
					player={movingPlayer}
					isBot={movingPlayer === game.bot.turn}
				/>
			)}
			{game.ended.length === game.players.length ? (
				<WinnerDisplay game={game} />
			) : (
				<>
					<GameState game={game} currentPlayer={currentPlayer} />

					<div className="bg-gray-200 dark:bg-gray-600 flex flex-row items-center justify-center w-full h-[30vh] overflow-y-scroll">
						{false ? (
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
