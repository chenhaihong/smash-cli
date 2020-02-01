import './index.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class HelloWorld extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Hello world!',
    };
  }
  componentWillMount() {}
  async getProfile() {
    // 支持mock
    const res = await axios.get('/user/profile');
    const { data } = res;
    console.log(data);
  }
  async login() {
    // 支持proxy
    const res = await axios.post('/api/user/login', {
      name: 'erye',
      password: '123123123',
    });
    const { data } = res;
    console.log(data);
  }
  componentDidMount() {
    this.getProfile();
    // this.login();

    // 支持动态引用
    import('./helper/math').then((math) => {
      console.log(math.add(16, 26));
      this.setState({
        title: 'Dynamic import "/helper/math" !',
      });
    });
  }
  render() {
    const { title } = this.state;
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <p>nice to see you.</p>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));

// if (module.hot) {
//   module.hot.accept();
//   module.hot.dispose(() => {
//     ReactDOM.render(
//       <HelloWorld title="hello world!" desc={'nice to see you.'} />,
//       document.getElementById('root')
//     );
//   });
// }
