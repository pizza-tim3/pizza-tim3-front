import React from 'react';

import Envelope from '../../assets/envelope.svg';
import Comment from '../../assets/comment.svg';
import {
  CardBox,
  Inner,
  Content,
  Action,
} from '../../styles/cardStyles.js';


const Card = () => {
  return (
    <CardBox>
      <Inner>
        <Content>
          <img src={Envelope} />
          <div className="content">
            <p><span>Location:</span> Pizza Hut</p>
            <p><span>Date:</span> May 30, 2019</p>
            <p><span>Attending:</span> User1, User2</p>
          </div>
        </Content>
        <Action>
          <div className="comment">
            <img src={Comment} />
            <p>2</p>
          </div>
          <div className="buttons">
            <button>Let's Go!</button>
            <button>Not This Time</button>
          </div>
        </Action>
      </Inner>

    </CardBox>
  );
};

export default Card;