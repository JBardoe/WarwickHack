import { useState } from "react";
import Game from "../types/Game";

interface NewGameMenuProps {
	setCurrentGame: (newGame: Game) => void;
}

const NewGameMenu = ({ setCurrentGame }: NewGameMenuProps) => {
	const [currentNum, setCurrentNum] = useState<number>(1);

	const handleSubmit = () => {
		setCurrentGame(new Game(currentNum));
	};

	return (
		<div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md max-w-md mx-auto bg-gray-300 dark:bg-gray-700 transition-colors duration-300 space-y-5">
			<label htmlFor="numPlayers" className="text-lg font-semibold">
				Please Enter the Number of Humans (1-4):
			</label>

			<input
				type="range"
				id="numPlayers"
				name="numPlayers"
				min="1"
				max="4"
				value={currentNum}
				onChange={(e) => {
					setCurrentNum(parseInt(e.target.value));
				}}
				className="w-full accent-indigo-600 dark:accent-indigo-400 cursor-pointer"
			/>

			<p className="text-md font-medium">
				Current Number:{" "}
				<span className="font-bold text-indigo-600 dark:text-indigo-400">
					{currentNum}
				</span>
			</p>

			<button
				onClick={handleSubmit}
				className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:active:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition-colors duration-200"
			>
				Create Game
			</button>
		</div>
	);
};

export default NewGameMenu;
