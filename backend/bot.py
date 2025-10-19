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

		askerEnemy.lack = filter(lambda x: x != card, askerEnemy.lack)
		if card not in askerEnemy.known: #Should always be true
			askerEnemy.known.append(card)

		askedEnemy.known = filter(lambda x: x != card, askedEnemy.known)
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

		playerEnemy.lack = filter(lambda x: x != card, playerEnemy.lack)
		if card not in playerEnemy.known: #Should always be true
			playerEnemy.known.append(card)

		if result == -1:
			self.hand = filter(lambda x: x != card, self.hand)
			playerEnemy.numCards += 1
		elif result != -2:
			playerEnemy.fished()


	def reactSelfToEnemy(self, asked, card, result):
		enemy = [e for e in self.enemies if e.turn == asked][0]
		enemy.known = filter(lambda x: x != card, enemy.known)
		if card not in enemy.lack: #Should always be true
			enemy.lack.append(card)
		

		if result == -1:
			self.removePair(card)
			enemy.numCards -= 1
			if len(enemy.hand) == 0:
				self.enemies = filter(lambda x:x.turn == asked, self.enemies)
		elif result != -2:
			self.addCard(card)
		
	def reactPairElimination(self, card, player):
		if player == self.turn:
			self.removePair(card)
		else:
			[e for e in self.enemies if e.turn == player][0].numCards -= 2