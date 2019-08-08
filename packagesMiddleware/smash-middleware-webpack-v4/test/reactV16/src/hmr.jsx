import './index.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Hello world!',
    };
  }
  componentWillMount() {}
  componentDidMount() {}
  render() {
    const { title: defaultTitle } = this.state;
    const { title, desc } = this.props;
    return (
      <React.Fragment>
        <h1>{title || defaultTitle}</h1>
        {desc && <p>{desc}</p>}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<HelloWorld title='hello world!' desc={'nice to see you.'} />, document.getElementById('root'));

if (module.hot) {
  // module.hot.accept();
  module.hot.dispose(() => {
    ReactDOM.render(<HelloWorld title='hello world!' desc={'nice to see you.'} />, document.getElementById('root'));
  });
}
