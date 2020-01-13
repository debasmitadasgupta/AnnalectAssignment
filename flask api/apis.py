from flask import Flask, request, render_template, send_from_directory, jsonify
from flask_cors import CORS
import json
import datetime
from datetime import date

app = Flask(__name__)
cors = CORS(app)
app.config['origin'] = "*"

class CustomException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        print("The payload is", payload)
        self.payload = payload

    def to_dict(self):
        rv = dict()
        rv['payload'] = str(self.payload)
        rv['message'] = self.message
        rv['status_code'] = self.status_code
        return rv


@app.errorhandler(CustomException)
def handle_invalid_usage(error):
    response = error.to_dict()
    print("the response is--->", response)
    response['status_code'] = error.status_code
    return response, error.status_code


@app.route("/api/listActors", methods=['GET'])
def list_actors():
    with open('./actors.json') as actor_file:
        data = json.load(actor_file)
        return json.dumps(data)

@app.route("/api/saveActor", methods=['POST'])
def save_actor():
    print(request.json)
    actor= request.json
    # try:

    with open('./actors.json') as actor_file:
        actors = json.load(actor_file)
    actors.append(actor)
    print(actors)
    with open('./actors.json', 'w') as f:
        json.dump(actors, f, ensure_ascii=False)
    return json.dumps({'status':200})

@app.route("/api/listMovies", methods=['GET'])
def list_movies():
    with open('./movies.json') as movie_file:
        data = json.load(movie_file)
        return json.dumps(data)

@app.route("/api/saveMovie", methods=['POST'])
def save_movie():
    print(request.json)
    movie= request.json
    # try:

    with open('./movies.json') as movie_file:
        movies = json.load(movie_file)
    movies.append(movie)
    print(movies)
    with open('./movies.json', 'w') as f:
        json.dump(movies, f, ensure_ascii=False)
    return json.dumps({'status':200})

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)

