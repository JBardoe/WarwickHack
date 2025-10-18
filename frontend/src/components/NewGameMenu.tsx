import { useState } from "react";
import Game from "../types/Game";

interface NewGameMenuProps {
	setCurrentGame: (newGame: Game) => void;
}

const NewGameMenu = ({ setCurrentGame }: NewGameMenuProps) => {
	const [currentNum, setCurrentNum] = useState<number | null>(0);
	const [error, setError] = useState(false);

	const handleSubmit = () => {
		if (currentNum == null) {
			setError(true);
			return;
		}
		setCurrentGame(new Game(currentNum));
	};

	return (
		<div>
			<label htmlFor="numPlayers">
				Please Enter the Number of Humans (1-4):{" "}
			</label>
			<input
				type="range"
				id="numPlayers"
				name="numPlayers"
				min="1"
				max="4"
				onChange={(e) => {
					setCurrentNum(parseInt(e.target.value));
					setError(false);
				}}
			/>
			{error && (
				<p className="text-red-500 text-xl font-bold">
					Please enter the number of players!
				</p>
			)}
			<button onSubmit={handleSubmit}></button>
		</div>
	);
};

export default NewGameMenu;
