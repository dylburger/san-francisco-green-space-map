import React from 'react';
import {render} from 'react-dom';
import App from 'components/App';

const runApp = () => {
  render(<App />, document.getElementById('app'));
};

window.onload = runApp;
