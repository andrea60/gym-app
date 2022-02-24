import json
import uuid
with open('./equipment_raw.json','r') as r:
    raw = json.load(r)

data = []
for item in raw:
    data.append({
        '_id': str(uuid.uuid4()),
        'name': item['name'],
        '__sourceId': item['id']
    })

with open('./equipment.json','w') as file:
    json.dump(data, file)