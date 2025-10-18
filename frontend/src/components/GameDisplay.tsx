import { useState } from "react";
import type Game from "../types/Game";
import Bot from "../types/Bot";
import BotMoveGetter from "./BotMoveGetter";
import PlayerMoveMenu from "./PlayerMoveMenu";

interface GameDisplayProps {
	game: Game;
}

const GameDisplay = ({ game }: GameDisplayProps) => {
	const [currentPlayer, setCurrentPlayer] = useState(0);
	const [lastMove, setLastMove] = useState<number[]>([]);

	const nextTurn = () => {
		setCurrentPlayer((old) => old + 1);
	};

	return typeof game.players[currentPlayer] == typeof Bot ? (
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
	);
};

export default GameDisplay;
