import React from 'react';
import ReactDOM from 'react-dom';
import Pageindex from './pages/index';

function render() {
  ReactDOM.render(<Pageindex />, document.getElementById('root'));
}
render();

// Re-render on Webpack HMR update:
if (module.hot) module.hot.accept(render);
