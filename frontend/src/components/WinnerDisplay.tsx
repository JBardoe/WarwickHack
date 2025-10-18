import type Game from "../types/Game";
import type Player from "../types/Player";

interface WinnerDisplayProps {
	game: Game;
}

const WinnerDisplay = ({ game }: WinnerDisplayProps) => {
	return (
		<div className="bg-gray-400 dark:bg-gray-950 h-[70vh] w-full border-black border-b-2 overflow-y-scroll flex flex-col items-center justify-center">
			<h1 className="text-center font-bold text-3xl">Leaderboard:</h1>
			{game.players
				.sort((a: Player, b: Player) => {
					return a.score - b.score;
				})
				.map((player, _) => {
					return (
						<>
							<p className="text-xl font-semibold text-center">
								{game.bot.turn !== player.turn
									? "Player " + (player.turn + 1)
									: "Bot"}
								: {player.score}
							</p>
							<br />
						</>
					);
				})}
		</div>
	);
};

export default WinnerDisplay;
