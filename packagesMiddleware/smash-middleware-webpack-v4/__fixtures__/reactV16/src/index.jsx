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
  componentDidMount() {
    // 支持mock
    axios
      .get('/user/profile')
      .then(function(response) {
        const { data } = response;
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });

    // 支持proxy
    axios
      .post('/api/user/login', {
        name: 'erye',
        password: '123123123',
      })
      .then(function(response) {
        const { data } = response;
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });

    // 支持动态引用
    import('./helper/math').then((math) => {
      console.log(math.add(16, 26));
      this.setState({
        title: 'Hello 动态 import!',
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
