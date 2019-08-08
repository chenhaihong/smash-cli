import './index.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { create$store, bindProvider, bindConsumer } from '../lib/index.jsx';

create$store({
  count: 0,
});

// 全局使用一次
@bindProvider
class App extends React.Component {
  render() {
    return <HelloWorld />;
  }
}

// 可以在任何需要用到全局状态的组件上添加装饰
@bindConsumer
class HelloWorld extends React.Component {
  handleClick = () => {
    this.props.update$store((preStore) => {
      const { count } = preStore;
      return {
        count: count + 1,
      };
    });
  };
  render() {
    const { $store } = this.props;
    const { count } = $store;
    return (
      <div>
        <h1>使用示例：单一全局状态管理库</h1>
        <h2>这是一个全局数据：{count}</h2>
        <button onClick={this.handleClick}>点击更新全局状态</button>
      </div>
    );
  }
}

function init() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
init();

// Re-render on Webpack HMR update:
if (module.hot) module.hot.accept(init);
