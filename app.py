from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai


def configuration():
    load_dotenv()
    openai.api_key = os.getenv('OPENAI_API_KEY')


app = Flask(__name__, static_folder="/client/dist", static_url_path="/")
CORS(app)


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/ask", methods=["GET"])
def ask():
    configuration()

    prompt_input = request.args.get('q')
    conversation = [
        {"role": "system", "content": "You are a helpful chatbot."},
        {"role": "user", "content": prompt_input}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation,
        temperature=0.5,
        max_tokens=440,
        top_p=1,
        frequency_penalty=0.0,
        presence_penalty=0.6
    )

    message = response.choices[0].message['content'].strip()

    return {"answers": message}


if __name__ == "__main__":
    app.run()
