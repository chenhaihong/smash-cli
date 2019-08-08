import './index.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {}
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <h1>Hello world!</h1>
        <p>Nice to meet you.</p>
      </React.Fragment>
    );
  }
}

function init() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
init();

// Re-render on Webpack HMR update:
if (module.hot) module.hot.accept(init);
