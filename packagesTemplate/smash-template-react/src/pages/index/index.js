import './style/index.less';

import React, { Component } from 'react';
import List from './List';

import IndexService from '../../services/index.sevice';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.getList();
  }

  async getList() {
    const list = await IndexService.getList();
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    return (
      <div className={'container'}>
        <h1>samsh-template-react</h1>
        <List data={list} />
      </div>
    );
  }
}
