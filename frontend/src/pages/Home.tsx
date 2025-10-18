import { useState } from "react";
import Game from "../types/Game";
import NewGameMenu from "../components/NewGameMenu";
import GameDisplay from "../components/GameDisplay";

const Home = () => {
	const [currentGame, setCurrentGame] = useState<Game | null>(null);

	return !currentGame ? (
		<NewGameMenu setCurrentGame={setCurrentGame} />
	) : (
		<GameDisplay game={currentGame} />
	);
};

export default Home;
