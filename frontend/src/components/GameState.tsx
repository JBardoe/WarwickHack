import type Game from "../types/Game";

interface GameStateProps {
	game: Game;
	lastMove: number[];
}

const GameState = ({ game, lastMove }: GameStateProps) => {
	return <div>GameState</div>; //TODO
};

export default GameState;
