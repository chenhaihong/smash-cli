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
    const { title, desc } = this.props;
    return (
      <React.Fragment>
        <h1>{title || defaultTitle}</h1>
        {desc && <p>{desc}</p>}
      </React.Fragment>
    );
  }
}
