import dataset, json
from xml.sax.saxutils import escape

def save_to_database(db_path, str_json):
  str_json = json.loads(str_json)
  db = dataset.connect('sqlite:///%s' % (db_path.replace("'", "_")))
  table = db['api_captures']
  table.insert(dict(time=str_json['time'],
    operation=str_json['txnType'],
    artifact=json.dumps(str_json['artifact']),
    method=str_json['method'],
    module=str_json['lib'],
    remark=''))

def read_from_database(db_path, index=0):
  result_set = {}
  parent_holder = []
  db = dataset.connect('sqlite:///./app_dumps/%s.db' % (db_path))
  api_captures = db.query('SELECT * FROM api_captures GROUP BY artifact')
  for capture in api_captures:
    child_holder = []
    child_holder.append(capture['id'])
    child_holder.append(capture['time'])
    child_holder.append(capture['operation'])
    child_holder.append(capture['method'])
    child_holder.append(capture['module'])
    child_holder.append(capture['remark'])
    str_artifact = ''
    artifacts = json.loads(capture['artifact'])
    
    for artifact in artifacts:
      str_artifact += 'Name: ' + artifact['name'] + '\n' + artifact['value'] + '\n\n' # artifact['value'], str(artifact['argSeq'])
      #str_artifact = str_artifact.replace("<", "&lt;").replace(">", "&gt;")
      str_artifact = str_artifact.replace('\n', '<br/>').replace('Name: ', '<b>Name: </b>')

    #print str_artifact

    child_holder.append(str_artifact)
    parent_holder.append(child_holder)
  result_set['data'] = parent_holder
  return json.dumps(result_set)
