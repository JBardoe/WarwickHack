import os
from flask import Flask, jsonify, request, send_from_directory, session
from flask_cors import CORS

from bot import Bot

app = Flask(__name__, static_folder="build", static_url_path="/")
app.secret_key = "secretKey"

CORS(app, supports_credentials=True)


@app.errorhandler(Exception)
def handle_error(e):
	print("Error:", e)
	return jsonify(message="An unexpected error has occurred"), 500

@app.route("/api/startGame")
def startGame():
	json = request.get_json()
	numPlayers = json.get("numPlayers")
	turn = json.get("turn") #0-numPlayers + 1 - where the bot is in the turn order

	session['bot'] = Bot()#TODO

@app.route("/api/getMove")
def getMove():
	(player, ask) = session['bot'].getMove()
	return jsonify(player=player, ask=ask)

@app.route("/api/giveResult")
def giveResult():
	#TODO
	return ""

@app.route("/api/eliminatePair")
def eliminatePair():
	#TODO
	return ""

@app.route('/')
@app.route('/<path:path>')
def serve_react(path=''):
	if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
		return send_from_directory(app.static_folder, path)
	else:
		return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
	app.run(debug=True)