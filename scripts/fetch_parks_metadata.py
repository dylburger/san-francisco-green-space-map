import json
import requests

DATA_SF_PARKS_JSON_URL = 'https://data.sfgov.org/resource/94uf-amnx.json'
JSON_OUTFILE = '../public/data/sf_parks_metadata.json'

print("Fetching Parks JSON file from %s" % DATA_SF_PARKS_JSON_URL)
data = requests.get(DATA_SF_PARKS_JSON_URL).json()

with open(JSON_OUTFILE, 'w') as outfile:
    json.dump(data, outfile)

print("Saved parks JSON in %s" % (JSON_OUTFILE))
