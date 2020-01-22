import styles from './HelloWorld.m.less';

import React, { Component } from 'react';

export default class HelloWorld extends Component {
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
    const { title } = this.props;
    return (
      <React.Fragment>
        <h1 className={styles.titleAa}>{title || defaultTitle}</h1>
        <p className={styles.p}>Hot module reload.</p>
        <p className={styles.p}>Module CSS.</p>
      </React.Fragment>
    );
  }
}
