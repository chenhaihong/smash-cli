import React from 'react';

// 唯一上下文
let Context = null,
  default$store = null,
  // 唯一更新全局$store的纯函数，在20行初始化
  update$store = null;

// 上下文初始化器
export function create$store(defaultValue) {
  default$store = defaultValue;
  Context = React.createContext(defaultValue || {});
}

// 装饰在应用的顶层
export function bindProvider(Component) {
  return class ProviderComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = default$store || {}; // => 整个state就是$store
      default$store = null;
      update$store = this.setState.bind(this); // 显示绑定this到ProviderComponent实例
    }
    render() {
      return (
        <Context.Provider value={this.state}>
          <Component {...this.props} $store={this.state} update$store={update$store} />
        </Context.Provider>
      );
    }
  };
}

// 装饰在每个需要用到全局状态的子组件
export function bindConsumer(Component) {
  return function ConsumerComponent(props) {
    return (
      <Context.Consumer>
        {($store) => <Component {...props} $store={$store} update$store={update$store} />}
      </Context.Consumer>
    );
  };
}
