import json

with open('exerciseinfo_raw.json','r') as r:
    raw = json.load(r)

# load equipments
with open('../../app/core/data/db/equipment.json','r') as r:
    equipments = json.load(r)
def get_equip(apiId):
    return list(filter(lambda eq: eq['__sourceId'] == apiId, equipments))[0]

data = []

for obj in raw:
    data.append({
        "_id": obj['uuid'],
        "name": obj['name'],
        "hasWeight": True,
        "description": obj['description'],
        "bodyArea": obj['category']['name'],
        "primaryMuscles": [muscle['name'] for muscle in obj['muscles']],
        "secondaryMuscles": [muscle['name'] for muscle in obj['muscles_secondary']],
        "equipmentIds": [get_equip(e['id'])['_id'] for e in obj['equipment']],
    })

with open('../../app/core/data/db/exercise.json','w') as w:
    json.dump(data, w)

