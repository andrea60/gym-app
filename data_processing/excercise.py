import json 

with open('../src/assets/data/exercise_raw.json','r') as f:
    dataset:list = json.load(f)

no_muscles = list(filter(lambda ex: len(ex['muscles']) == 0 and len(ex['muscles_secondary']) == 0, dataset))
print('Muscles-less exercises ', len(no_muscles))