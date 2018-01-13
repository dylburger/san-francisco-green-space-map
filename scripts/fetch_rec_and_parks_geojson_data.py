import json
import requests

DATA_SF_REC_PARKS_GEOJSON_URL = 'https://data.sfgov.org/api/geospatial/strc-rdpj?method=export&format=GeoJSON'
GEOJSON_OUTFILE = '../public/geojson/sf_rec_parks_properties.json'

print("Fetching Parks and Rec GeoJSON file from %s" %
      DATA_SF_REC_PARKS_GEOJSON_URL)
data = requests.get(DATA_SF_REC_PARKS_GEOJSON_URL).json()

# Camp Mather is managed by the SF Rec and Parks dept, but near Yellowstone.
# For this map, we don't want to display Camp Mather, to keep the focus on SF green spaces.

# Add all features to a new feature array, _unless_ that feature is tied to Camp Mather,
# then write those features to a new GeoJSON file
print("Removing Camp Mather from GeoJSON features and writing to new file")
features = data.get('features')
geojson_out = data
geojson_out['features'] = []
for feature in features:
    if not feature['properties']['map_label'] == 'Camp Mather':
        geojson_out['features'].append(feature)

with open(GEOJSON_OUTFILE, 'w') as outfile:
    json.dump(geojson_out, outfile)
