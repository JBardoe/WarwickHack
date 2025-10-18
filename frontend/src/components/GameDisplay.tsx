import { useState } from "react";
import type Game from "../types/Game";

interface GameDisplayProps {
	game: Game;
}

const GameDisplay = ({ game }: GameDisplayProps) => {
	const [currentPlayer, setCurrentPlayer] = useState(0);

	return <div>GameDisplay</div>;
};

export default GameDisplay;
