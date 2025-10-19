import type Game from "../types/Game";
import type Player from "../types/Player";

interface WinnerDisplayProps {
	game: Game;
}

const WinnerDisplay = ({ game }: WinnerDisplayProps) => {
	return (
		<div className="bg-gray-400 dark:bg-gray-950 h-[100vh] w-full border-black border-b-2 overflow-y-scroll flex flex-col items-center justify-center">
			<h1 className="text-center font-bold text-3xl">Leaderboard:</h1>
			{game.players
				.sort((a: Player, b: Player) => {
					return b.score - a.score;
				})
				.map((player, index) => {
					return (
						<p
							key={index}
							className="text-xl font-semibold text-center"
						>
							{game.bot.turn !== player.turn
								? "Player " + (player.turn + 1)
								: "Bot"}
							: {player.score}
							<br />
						</p>
					);
				})}
			<button
				className="mt-10 rounded-lg border-white border-2 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600"
				onClick={() => {
					window.location.reload();
				}}
			>
				New Game
			</button>
		</div>
	);
};

export default WinnerDisplay;
