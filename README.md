### react-map-gl-starter

This is a simple starter repository for making [`react-map-gl`](https://github.com/uber/react-map-gl) maps.

## What this includes

* Starter map files in `src/components/maps/`
* All the `npm` dependencies for `react-map-gl`
* webpack 3
* Babel
* ESLint
* `prettier`
* `eslint-config-prettier` to get ESLint and Prettier working nicely
* A `.eslintrc.js` config with some default rules, and paths where I store modules
* `jest`

## Getting this setup

First, you'll need to create your own [Mapbox API token](https://www.mapbox.com/help/how-access-tokens-work/).

All of the data for these maps are tied to a config object, stored in `config/config.js`. First, run

    cp config/config.template.js config/config.js

to copy the config template to a new config file (the code reads from the `config.js` file).

Add your Mapbox API key to this file, in the relevant section:

    mapbox: {
      accessToken: 'your access token here',
    },

If you don't have `node` installed, you'll need to do that (instructions for a Mac are [here](https://nodejs.org/en/download/package-manager/#macos)).

Next, install the necessary dependencies:

    npm i

Finally, build the code:

    npm run dev-build

and launch a local web server. If you're on a Mac:

    python -m SimpleHTTPServer 4000

Finally, visit [http://localhost:4000](http://localhost:4000) to see the example map of San Francisco.
