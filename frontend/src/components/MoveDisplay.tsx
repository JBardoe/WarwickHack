interface MoveDisplayProps {
	move: number[];
}

const MoveDisplay = ({ move }: MoveDisplayProps) => {
	return (
		<div className="fixed top-0 left-0 z-50 h-[100vh] w-[100vw] flex flex-col items-center justify-center">
			<div className="bg-gray-500 rounded-2xl transition-all text-center p-10 opacity-100">
				{move[3] === -1 ? (
					<>
						<h1 className="text-5xl font-bold mb-2">Success!</h1>
						<p className="text-xl opacity-95 italic">
							Gained a {numToCard(move[2])}
						</p>
					</>
				) : (
					<>
						<h1 className="text-5xl font-bold mb-2">GO FISH!</h1>
						{move[3] === -2 ? (
							<p className="text-xl opacity-95 italic">
								No Cards Left
							</p>
						) : (
							<p className="text-xl opacity-95 italic">
								Gained a {numToCard(move[3])}
							</p>
						)}
					</>
				)}
			</div>
		</div>
	);
};
function numToCard(num: number) {
	switch (num) {
		case 13:
			return "King";
		case 12:
			return "Queen";
		case 11:
			return "Jack";
		case 1:
			return "Ace";
		default:
			return num.toString();
	}
}
export default MoveDisplay;
