
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

import dataset, json, time
from xml.sax.saxutils import escape

def save_to_database(db_path, str_json):
  try:
    str_json = json.loads(str_json.replace("\n", "<br />").replace("\r", "<br />"), strict=False)
    db = dataset.connect('sqlite:///%s' % (db_path.replace("'", "_")))
    table = db['api_captures']
    table.insert(dict(time=time.strftime('%b %d %Y %l:%M %p', time.localtime()),
      operation=str_json['txnType'],
      artifact=json.dumps(str_json['artifact']),
      method=str_json['method'],
      module=str_json['lib'],
      remark=''))
  except Exception as e:
    print str(e)
    print str_json

def stringify(data):
  str_data = ""
  if type(data) == dict or type(data) == list:
    return json.dumps(data)
  else:
    try:
      str_data = str(data)
      return str_data
    except Exception as e:
      return data

def read_from_database(db_path, index=0):
  result_set = {}
  parent_holder = []
  db = dataset.connect('sqlite:///./app_dumps/%s.db' % (db_path))
  api_captures = db.query('SELECT * FROM api_captures GROUP BY artifact')
  for capture in api_captures:
    child_holder = []
    child_holder.append(capture['operation'])
    child_holder.append(capture['module'])
    child_holder.append(capture['method'])
    str_artifact = ''
    artifacts = json.loads(capture['artifact'])
    
    for artifact in artifacts:
      if "name" in artifact:
        artifact_name = artifact['name']
      else:
        artifact_name = ""
      if "value" in artifact:
        artifact_value = artifact['value']
        artifact_value = artifact_value.replace("<", "&lt;").replace(">", "&gt;")
      else:
        artifact_value = ""
      str_artifact += 'Name: ' + stringify(artifact_name) + '\n' + stringify(artifact_value) + '\n\n' # artifact['value'], str(artifact['argSeq'])
      #str_artifact = str_artifact.replace("<", "&lt;").replace(">", "&gt;")
      str_artifact = str_artifact.replace('\n', '<br/>').replace('Name: ', '<b>Name: </b>')

    #print str_artifact

    child_holder.append(str_artifact)
    child_holder.append(capture['time'])
    child_holder.append(capture['id'])
    child_holder.append(capture['remark'])
    parent_holder.append(child_holder)
  result_set['data'] = parent_holder
  return json.dumps(result_set)
