import styles from '../style/hero.module';

import React, { Component } from 'react';

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className={styles.hero}>
        <div className={styles.avatar}>
          <figure>
            <img src='/images/avatar.jpg' />
          </figure>
        </div>
        <h1 className={styles.name}>陈海宏</h1>
        <h2 className={styles.desc}>Web FE at Guangzhou</h2>
      </section>
    );
  }
}

export default Hero;
