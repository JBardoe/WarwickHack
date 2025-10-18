import { useState } from "react";
import type Game from "../types/Game";

interface PlayerMoveMenuProps {
	currentPlayer: number;
	game: Game;
	setLastMove: (move: number[]) => void;
}

const PlayerMoveMenu = ({
	currentPlayer,
	game,
	setLastMove,
}: PlayerMoveMenuProps) => {
	const [cardAsk, setCardAsk] = useState(0);

	const handleSubmit = () => {};

	return cardAsk === 0 ? <div>Choose card</div> : <div>Choose player</div>; //TODO
};

export default PlayerMoveMenu;
