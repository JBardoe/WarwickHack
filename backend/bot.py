import random
from models import Enemy

class Bot:
	def __init__(self, numPlayers, hand, turn):
		self.enemies = [Enemy(turn=i) for i in range(numPlayers)]
		for i in range(turn, len(self.enemies)):
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

		for i, handCard in enumerate(self.hand):
			lacking[i] = [x for x in lacking[i] if handCard not in x.lack]

		lengths = [len(x) for x in lacking]

		longest = 0

		for i in range(1, len(self.hand)):
			if lengths[i] > lengths[longest] and lengths[i] < len(self.enemies):
				longest = i
		
		if lengths[longest] < len(self.enemies):
			return ([enemy for enemy in self.enemies if enemy not in lacking[longest]][0].turn, self.hand[longest])
		
		return (self.enemies[random.randint(0, len(self.enemies) - 1)].turn, self.hand[random.randint(0, len(self.hand) - 1)])
	
	def removePair(self, card):
		count = 0
		i = 0
		while i < len(self.hand):
			if(self.hand[i] == card):
				self.hand.pop(i)
				count += 1
			else:
				i += 1
			if count == 2:
				return
	
	def addCard(self, card):
		if card in self.hand:
			self.hand.remove(card)
		else:
			self.hand.append(card)

	def reactEnemyToEnemy(self, asker, asked, card, result):
		askerEnemy = [e for e in self.enemies if e.turn == asker][0]
		askedEnemy = [e for e in self.enemies if e.turn == asked][0]

		askerEnemy.lack = [x for x in askerEnemy.lack if x != card]
		if card not in askerEnemy.known: #Should always be true
			askerEnemy.known.append(card)

		askedEnemy.known = [x for x in askedEnemy.known if x != card]
		if card not in askedEnemy.lack: #Should always be true
			askedEnemy.lack.append(card)

		if result == -1:
			askedEnemy.numCards -= 1
			askerEnemy.numCards += 1
			#The asker will make a call to pair elimination to account for their hand change
		elif result != -2:
			askerEnemy.fished()

	def reactEnemyToSelf(self, player, card, result):
		playerEnemy = [e for e in self.enemies if e.turn == player][0]

		playerEnemy.lack = [x for x in playerEnemy.lack if x != card]
		if card not in playerEnemy.known: #Should always be true
			playerEnemy.known.append(card)

		if result == -1:
			self.hand = [x for x in self.hand if x != card]
			playerEnemy.numCards += 1
		elif result != -2:
			playerEnemy.fished()


	def reactSelfToEnemy(self, asked, card, result):
		enemy = [e for e in self.enemies if e.turn == asked[0]][0]
		enemy.known = [x for x in enemy.known if x != card]
		if card not in enemy.lack: #Should always be true
			enemy.lack.append(card)
		

		if result == -1:
			self.removePair(card)
			enemy.numCards -= 1
			if len(enemy.hand) == 0:
				self.enemies = [x for x in self.enemies if x.turn == asked]
		elif result != -2:
			self.addCard(card)
		
	def reactPairElimination(self, player, card):
		if player == self.turn:
			self.removePair(card)
		else:
			[e for e in self.enemies if e.turn == player][0].numCards -= 2