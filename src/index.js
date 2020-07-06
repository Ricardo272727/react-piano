import React from 'react';
import ReactDOM from 'react-dom';
import Piano from './Piano';
import tiles from './tiles.json';

ReactDOM.render(
  <React.StrictMode>
    <Piano tiles={tiles}/>
  </React.StrictMode>,
  document.getElementById('root')
);

