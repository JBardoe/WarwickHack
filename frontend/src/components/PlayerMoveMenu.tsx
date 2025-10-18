import type Game from "../types/Game";
import type Player from "../types/Player";

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
	return <div>PlayerMoveMenu</div>; //TODO
};

export default PlayerMoveMenu;
