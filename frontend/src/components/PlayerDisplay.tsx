interface PlayerDisplayProps {
	player: number;
	isBot: boolean;
}

const PlayerDisplay = ({ player, isBot }: PlayerDisplayProps) => {
	return (
		<div className="fixed top-0 left-0 z-50 h-[100vh] w-[100vw] flex flex-col items-center justify-center">
			<div className="bg-gray-500 rounded-2xl transition-all text-center p-10 opacity-100">
				<h1 className="text-5xl font-bold mb-2">
					{isBot
						? "Bot's Turn!"
						: "Player " + (player + 1) + "'s Turn!"}
				</h1>
			</div>
		</div>
	);
};

export default PlayerDisplay;
