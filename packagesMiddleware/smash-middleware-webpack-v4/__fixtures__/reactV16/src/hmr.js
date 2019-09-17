import './index.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './components/HelloWorld';

ReactDOM.render(
  <HelloWorld title='hello world!' desc={'nice to see you.'} />,
  document.getElementById('root')
);

if (module.hot) {
  // module.hot.accept();
  module.hot.dispose(() => {
    ReactDOM.render(
      <HelloWorld title='hello world!' desc={'nice to see you.'} />,
      document.getElementById('root')
    );
  });
}
