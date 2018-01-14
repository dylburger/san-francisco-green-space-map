import json
import requests

DATA_SF_PARKS_JSON_URL = 'https://data.sfgov.org/resource/94uf-amnx.json'
JSON_OUTFILE = '../public/data/sf_parks_metadata.json'

print("Fetching Parks JSON file from %s" % DATA_SF_PARKS_JSON_URL)
parks = requests.get(DATA_SF_PARKS_JSON_URL).json()


def filter_camp_mather(park):
    if park.get('parkname') != 'CAMP MATHER':
        return park
    else:
        return {'parkname': 'CAMP MATHER'}


filtered_park_data = list(map(filter_camp_mather, parks))

with open(JSON_OUTFILE, 'w') as outfile:
    json.dump(filtered_park_data, outfile)

print("Saved parks JSON in %s" % (JSON_OUTFILE))
