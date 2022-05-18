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
from urllib.parse import unquote

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

# TODO: Add real 'output_dir' option instead of static 'app_dumps' databases path
output_dir = os.path.join('.','app_dumps')

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

@app.route('/', methods=['GET'])
def landing_page():
    global APP_LIST, DB_MAP
    APP_LIST.clear()

    for root, dirs, files in os.walk(output_dir):
        path = root.split(os.sep)
        for file in files:
            file_path = os.path.join(root, file)
            if file_path.endswith('.db'):
                APP_LIST.append(file.replace('.db', ''))

    return render_template('index.html', apps=APP_LIST)

@app.route('/monitor/', methods=['GET'])
def monitor_page():
    app_name = request.args.get('app')
    return render_template('monitor.html', app_name=app_name)

@app.route('/api/fetch', methods=['GET'])
def read_db():
    index = request.args.get('id')
    if request.args.get('reportdb'):
        db_name = request.args.get('reportdb')
    else:
        db_name = request.args.get('app')
    grouped = request.args.get('grouped')
    db_name = unquote(db_name)
    db_path = os.path.join(output_dir, str(db_name) + '.db')
    #print('db_path: %s, index: %s' % (db_path, index), flush=True)
    response = db.read_from_database(db_path, index, grouped)
    #response = open('static/data.json').read()
    return response

@app.route('/api/clear_table', methods=['GET'])
def clear_db():
    if request.args.get('reportdb'):
        db_name = request.args.get('reportdb')
    else:
        db_name = request.args.get('app')
    # URL decode
    db_name = unquote(db_name)
    db_path = os.path.join(output_dir, str(db_name) + '.db')
    response = str(db.delete_all_from_table(db_path))
    return response

app.run()
