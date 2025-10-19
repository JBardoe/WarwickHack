import random
from models import Enemy, Placeholder

class Bot:
	def __init__(self, numPlayers, hand, turn):
		self.enemies = [Enemy(i) for i in range(numPlayers)]
		for i in range(turn + 1, len(self.enemies)):
			self.enemies[i].turn += 1
		self.hand = hand
		self.turn = turn

	def getMove(self):
		#Check for knowing enemy has a card
		for i in range(len(self.enemies)):
			enemy = self.enemies[i]
			overlap = [card for card in enemy.known if card in self.hand]
			if len(overlap) > 0:
				return (self.enemies[i].turn, overlap[0])
		
		#Otherwise, check the card we know the most people don't have
		lacking = [self.enemies for i in range(len(self.hand))]

		for i in range(len(self.hand)):
			lacking[i] = filter(lambda x: self.hand[i] not in x.lack,lacking[i])

		lengths = map(lambda x: len(x), lacking)

		longest = 0

		for i in range(1, len(self.hand)):
			if lengths[i] > lengths[longest] and lengths[i] < len(self.enemies):
				longest = i
		
		if lengths[longest] < len(self.enemies):
			return ([enemy for enemy in self.enemies if enemy not in lacking[longest]][0].turn, self.hand[longest])
		
		return (self.enemies[random.randint(0, len(self.enemies) - 1)].turn, self.hand[random.randint(0, len(self.hand) - 1)])
		
	def reactEnemyToEnemy(self, asker, asked, card, result):#TODO
		return
	
	def reactEnemyToSelf(self, player, card, result):#TODO
		return
	
	def reactSelfToEnemy(self, asked, card, result):#TODO
		return
	
	def reactPairElimination(self, card, player): #TODO
		return

#TODO remove enemy from list when no cards