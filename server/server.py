from flask import Flask, request, jsonify
from flask_cors import cross_origin
from dotenv import load_dotenv
import os
import openai


def configuration():
    load_dotenv()
    openai.api_key = os.getenv('OPENAI_API_KEY')


app = Flask(__name__)


@app.route("/ask")
@cross_origin()
def ask():
    configuration()
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="Does this work?",
        temperature=0.9,
        max_tokens=400,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.6,
        stop=[" Human:", " AI:"]
    )
    message = response.choices[0].text.strip()
    return {"answers": message}


if __name__ == "__main__":
    app.run(debug=True)
