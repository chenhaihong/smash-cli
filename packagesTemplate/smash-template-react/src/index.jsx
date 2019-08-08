import './index.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';

function getModalRoot() {
  let el = document.getElementById('modal-root');
  if (!el) {
    el = document.createElement('div');
    el.id = 'modal-root';
    document.body.appendChild(el);
  }
  return el;
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.className = 'modal';
  }

  componentDidMount() {
    getModalRoot().appendChild(this.el);
  }

  componentWillUnmount() {
    getModalRoot().removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Hello world!',
    };
  }
  render() {
    return (
      <React.Fragment>
        <h1>Hello world!</h1>
        <p>Nice to meet you.</p>
        <Modal>
          <p>This is a Modal Portal.</p>
        </Modal>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
