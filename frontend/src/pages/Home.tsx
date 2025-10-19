import { useState } from "react";
import Game from "../types/Game";
import NewGameMenu from "../components/NewGameMenu";
import GameDisplay from "../components/GameDisplay";

const Home = () => {
	const [currentGame, setCurrentGame] = useState<Game | null>(null);

	return !currentGame ? (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<img src="/public/Logo.png" className="w-40 mb-10" />
			<NewGameMenu setCurrentGame={setCurrentGame} />
		</div>
	) : (
		<GameDisplay game={currentGame} />
	);
};

export default Home;
