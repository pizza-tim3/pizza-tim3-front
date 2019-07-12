import React from 'react';
import loading from '../../assets/loading_pizza.png';

import {
  Wrap,
} from '../../styles/loadingStyles.js';

const Loading = () => {
  console.log('loading')
  return (
    <div>
      <img src={loading} alt={'pizza loading'} id="loading-pizza"/>
      <h1>Loading ...</h1>
    </div>
  )
}

export default Loading;