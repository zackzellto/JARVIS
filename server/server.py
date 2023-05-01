from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/ask")
def ask():
    return {"answers": ["Hey World", "My name is", "JARVIS"]}

app.run()