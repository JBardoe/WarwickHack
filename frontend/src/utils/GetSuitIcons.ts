export default function getSuitIcon(suit: string) {
	switch (suit) {
		case "spade":
			return "♠";
		case "club":
			return "♣";
		case "heart":
			return "♥";
		case "diamond":
			return "♦";
		default:
			return "";
	}
}
