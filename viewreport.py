#!/usr/bin/python

###
 # Copyright (c) 2016 Nishant Das Patnaik.
 #
 # Licensed under the Apache License, Version 2.0 (the "License");
 # you may not use this file except in compliance with the License.
 # You may obtain a copy of the License at
 #
 #  http://www.apache.org/licenses/LICENSE-2.0
 #
 # Unless required by applicable law or agreed to in writing, software
 # distributed under the License is distributed on an "AS IS" BASIS,
 # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 # See the License for the specific language governing permissions and
 # limitations under the License.
###

import os, sys, argparse, time, codecs, binascii, json, traceback
from flask import Flask, request, render_template
from termcolor import colored
import database as db

print("""
     ___      .______   .______   .___  ___.   ______   .__   __. 
    /   \     |   _  \  |   _  \  |   \/   |  /  __  \  |  \ |  | 
   /  ^  \    |  |_)  | |  |_)  | |  \  /  | |  |  |  | |   \|  | 
  /  /_\  \   |   ___/  |   ___/  |  |\/|  | |  |  |  | |  . `  | 
 /  _____  \  |  |      |  |      |  |  |  | |  `--'  | |  |\   | 
/__/     \__\ | _|      | _|      |__|  |__|  \______/  |__| \__| 
                        github.com/dpnishant
                                                                  
""")
APP_LIST = []
app = Flask(__name__, static_url_path='/static')
#app.debug = True

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route('/api/fetch', methods=['GET'])
def serve_json():
    index = request.args.get('id')
    db_name = request.args.get('app')
    response = db.read_from_database(db_name, index)
    #response = open('static/data.json').read()
    return response

@app.route('/monitor/', methods=['GET'])
def monitor_page():
    app_name = request.args.get('app')
    return render_template('monitor.html', app_name=app_name)

@app.route('/', methods=['GET'])
def landing_page():
    global APP_LIST
    global DB_MAP
    APP_LIST = []
    
    app_dumps_dir = os.path.join('.','app_dumps')
    for root, dirs, files in os.walk(app_dumps_dir):
        path = root.split(os.sep)
        for file in files:
            file_path = os.path.join(root, file)
            if file_path.endswith('.db'):
                APP_LIST.append(file.replace('.db', ''))

    return render_template('index.html', apps=APP_LIST)

app.run()