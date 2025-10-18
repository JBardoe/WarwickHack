import type Game from "../types/Game";

interface GameDisplayProps {
	game: Game;
}

const GameDisplay = ({ game }: GameDisplayProps) => {
	return <div>GameDisplay</div>;
};

export default GameDisplay;
