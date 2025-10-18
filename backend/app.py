import os
from flask import Flask, jsonify, request, send_from_directory, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="build", static_url_path="/")
app.secret_key = "secretKey"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///whack.sqlite'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)

CORS(app, supports_credentials=True)


@app.errorhandler(Exception)
def handle_error(e):
	print("Error:", e)
	return jsonify(message="An unexpected error has occurred"), 500

@app.route("/api/startGame")
def startGame():
	json = request.get_json()
	numPlayers = json.get("numPlayers")
	

@app.route('/')
@app.route('/<path:path>')
def serve_react(path=''):
	if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
		return send_from_directory(app.static_folder, path)
	else:
		return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
	app.run(debug=True)