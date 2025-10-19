import os
from flask import Flask, jsonify, request, send_from_directory, session
from flask_cors import CORS

from bot import Bot

app = Flask(__name__, static_folder="build", static_url_path="/")
app.secret_key = "secretKey"

CORS(app, supports_credentials=True)

bot = None

@app.errorhandler(Exception)
def handle_error(e):
	print("Error:", e)
	return jsonify(message="An unexpected error has occurred"), 500

@app.route("/api/startGame", methods=["POST"])
def startGame():
	json = request.get_json()
	numPlayers = json.get("numPlayers")
	hand = json.get("hand")
	turn = json.get("turn")

	global bot
	bot = Bot(numPlayers=numPlayers, hand=hand, turn=turn)
	return "", 200

@app.route("/api/getMove", methods=["POST"])
def getMove():
	global bot
	(player, ask) = bot.getMove()
	return jsonify(player=player, ask=ask)

@app.route("/api/giveResult", methods=["POST"])
def giveResult():
	json = request.get_json()
	asked = json.get("asked"),
	card = json.get("card"),
	result = json.get("result"),

	global bot
	bot.reactSelfToEnemy(asked, card, result)
	return "",200

@app.route("/api/eliminatePair", methods=["POST"])
def eliminatePair():
	json = request.get_json()
	player = json.get("player")
	card = json.get("card")

	global bot
	bot.reactPairElimination(player, card)
	return "", 200

@app.route("/api/updateBot", methods=["POST"])
def updateBot():
	json = request.get_json()
	asker = json.get("asker")
	asked = json.get("asked")
	card = json.get("card")
	result = json.get("result")

	global bot
	if asked == bot.turn:
		bot.reactEnemyToSelf(asker, card, result)
	else:
		bot.reactEnemyToEnemy(asker, asked, card, result)
	return "", 200

@app.route('/', methods=['GET', 'POST'])
@app.route('/<path:path>', methods=['GET', 'POST'])
def serve_react(path=''):
	if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
		return send_from_directory(app.static_folder, path)
	else:
		return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
	app.run(debug=True)


#TODO
'''
Testing
Guess cards in deck to work out cards in hands
Make Front end prettier
Make presentation
'''