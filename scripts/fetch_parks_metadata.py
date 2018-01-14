import json
import requests

DATA_SF_PARKS_JSON_URL = 'https://data.sfgov.org/resource/94uf-amnx.json'
JSON_OUTFILE = '../public/data/sf_parks_metadata.json'


def filter_camp_mather(park):
    """ We do not want to include Camp Mather in our dataset, since
        it's outside of the SF city limits.
    """
    return park.get('parkname') != 'CAMP MATHER'


def filter_park(park):
    return filter_camp_mather(park)


print("Fetching Parks JSON file from %s" % DATA_SF_PARKS_JSON_URL)
parks = requests.get(DATA_SF_PARKS_JSON_URL).json()
filtered_park_data = list(filter(filter_park, parks))

with open(JSON_OUTFILE, 'w') as outfile:
    json.dump(filtered_park_data, outfile)

print("Saved parks JSON in %s" % (JSON_OUTFILE))
