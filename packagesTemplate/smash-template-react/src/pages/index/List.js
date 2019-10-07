import './style/List.less';

import React from 'react';

export default function List(props) {
  const { data = [] } = props;
  const lis = data.map((item) => {
    return <li key={item.name}>{item.name}</li>;
  });

  return <ul>{lis}</ul>;
}
