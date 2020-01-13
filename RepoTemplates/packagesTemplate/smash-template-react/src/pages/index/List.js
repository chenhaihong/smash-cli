import styles from './style/List.module.less';

import React from 'react';

export default function List(props) {
  const { data = [] } = props;
  const lis = data.map((item) => {
    return (
      <li className={styles.item} key={item.name}>
        {item.name}
      </li>
    );
  });

  return <ul className={styles.list}>{lis}</ul>;
}
