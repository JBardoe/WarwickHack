class Card:
	def __init__(self, number):
		self.number = number
	
	def matches(self, card):
		return self.number == card.number 

#Current system assumes you only ask for a card you have
class Enemy:
	def __init__(self, numCards=7, known=[], lack=[]):
		self.numCards = numCards
		self.known = known
		self.lack = lack

	def fished(self):
		self.numCards += 1
		self.lack = []

	def removeCard(self, card):
		self.known = [i for i in self.known if i.matches(card)]
	
	def addCard(self, card):
		self.known.append(card)

		
