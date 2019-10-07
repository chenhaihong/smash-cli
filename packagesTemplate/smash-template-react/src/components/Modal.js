import './style/Modal.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
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

function getModalRoot() {
  let el = document.getElementById('smash-template-react-modal-root');
  if (!el) {
    el = document.createElement('div');
    el.id = 'modal-root';
    document.body.appendChild(el);
  }
  return el;
}
