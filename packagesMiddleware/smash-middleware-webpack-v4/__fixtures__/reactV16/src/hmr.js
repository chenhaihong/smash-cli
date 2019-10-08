import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './components/HelloWorld';

function render() {
  ReactDOM.render(<HelloWorld title='hello world!' desc={'nice to see you.'} />, document.getElementById('root'));
}
render();

// Re-render on Webpack HMR update:
if (module.hot) module.hot.accept(render);
