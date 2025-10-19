export default function numToCard(num: number) {
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
