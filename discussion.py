##########################################
#
# Create in Arlington Texas
# Created by Janet and Bruce
#
##########################################


import os
from flask import Flask, render_template
from config import DEBUG
from flask import request
from flask_pymongo import PyMongo
from datetime import datetime

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost:27017/Message"
UPLOAD_FOLDER = 'static/upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
mongo = PyMongo(app)
basedir = os.path.abspath(os.path.dirname(__file__))
basedir.replace("\\", "/")


@app.route("/")
def index2():
    d = mongo.db.users.find().limit(10)
    v = mongo.db.vote.find({}, {"_id": 0, 'time': 0}).limit(5)

    return render_template("content.html", data=d, vote=v)


@app.route('/create', methods=['POST'])
def create():
    image = request.files['image']

    file_dir = os.path.join(basedir, app.config['UPLOAD_FOLDER'])

    if not os.path.exists(file_dir):
        os.makedirs(file_dir)

    file_path = ""
    if image:
        file_path = UPLOAD_FOLDER + '/' + image.filename
        image.save(os.path.join(file_dir, image.filename))

    mongo.db.users.insert({'username': request.form.get('username'),
                           'message': request.form.get('message'),
                           'image': file_path,
                           'time': datetime.now(),
                           })

    return render_template("create.html")


@app.route('/create_vote', methods=['POST'])
def create_vote():

    time = datetime.now()
    t = str(time).replace(" ", "").replace(".", "") + "@"

    if request.form.get('option4'):

        mongo.db.vote.insert({'username': request.form.get('username'),
                              'question': request.form.get('question'),
                              'option1': request.form.get('option1'),
                              'option2': request.form.get('option2'),
                              'option3': request.form.get('option3'),
                              'option4': request.form.get('option4'),
                              'num1': 0,
                              'num2': 0,
                              'num3': 0,
                              'num4': 0,
                              'time': time,
                              'vid1': t + 'vid1@num1@' + request.form.get('option1'),
                              'vid2': t + 'vid2@num2@' + request.form.get('option2'),
                              'vid3': t + 'vid3@num3@' + request.form.get('option3'),
                              'vid4': t + 'vid4@num4@' + request.form.get('option4'),
                              })
    elif request.form.get('option3'):

        mongo.db.vote.insert({'username': request.form.get('username'),
                              'question': request.form.get('question'),
                              'option1': request.form.get('option1'),
                              'option2': request.form.get('option2'),
                              'option3': request.form.get('option3'),
                              'num1': 0,
                              'num2': 0,
                              'num3': 0,
                              'time': time,
                              'vid1': t + 'vid1@num1@' + request.form.get('option1'),
                              'vid2': t + 'vid2@num2@' + request.form.get('option2'),
                              'vid3': t + 'vid3@num3@' + request.form.get('option3'),
                              })
    else:
        mongo.db.vote.insert({'username': request.form.get('username'),
                              'question': request.form.get('question'),
                              'option1': request.form.get('option1'),
                              'option2': request.form.get('option2'),
                              'num1': 0,
                              'num2': 0,
                              'time': time,
                              'vid1': t + 'vid1@num1@' + request.form.get('option1'),
                              'vid2': t + 'vid2@num2@' + request.form.get('option2'),
                              })

    return render_template("create_vote.html")


@app.route('/voted', methods=['POST'])
def vote():

    # print(request.form)
    test = request.form
    # print(test)
    for each in test:

        forward, vid, n, op = each.split("@")
        ques = mongo.db.vote.update_one({vid: each}, {'$inc': {n: 1}})

    d = mongo.db.users.find().limit(10)
    v = mongo.db.vote.find({}, {"_id": 0, 'time': 0}).limit(5)

    return render_template("content.html", data=d, vote=v)

# Original page, just for test
# @app.route('/dis')
# def dis():
#     return render_template('discussion.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=DEBUG)
