import styles from '../style/nav.module';

import React, { Component } from 'react';

class Nav extends Component {
  state = {
    links: [
      { href: 'https://www.tiiit.cn/', name: '个人站点' },
      { href: 'https://github.com/chenhaihong', name: 'Github' },
    ],
  };
  renderLinks = () => {
    const links = this.state.links.map(({ name, href }) => {
      return (
        <a key={name} className={styles.link} href={href} target='_blank'>
          {name}
        </a>
      );
    });
    return links;
  };
  render() {
    return <nav className={styles.nav}>{this.renderLinks()}</nav>;
  }
}

export default Nav;
