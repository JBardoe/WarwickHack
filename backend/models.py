#Current system assumes you only ask for a card you have
class Enemy:
	def __init__(self, turn, numCards=7, known=[], lack=[]):
		self.turn = turn
		self.numCards = numCards
		self.known = known
		self.lack = lack

	def fished(self):
		self.numCards += 1
		self.lack = []

	def removeCard(self, card):
		self.known = [i for i in self.known if i != card]
	
	def addCard(self, card):
		self.known.append(card)

		
