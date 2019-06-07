import React from 'react';
import axios from "axios"

import Envelope from '../../assets/envelope.svg';
import Comment from '../../assets/comment.svg';
import {
  CardBox,
  Inner,
  Content,
  Action,
} from '../../styles/cardStyles.js';

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state={
     
        
        comments:[]
      
    }
  }

 componentDidMount(){
    console.log("REACHED HERE")
    
     axios.get("http://localhost:5500/api/comments/event/messages/1")
     .then( res=>{
       console.log("COUNT RESPONSE",res)
       this.setState({comments : res.data.comments})
       
     })
     .catch(error => {
      this.setState({ error });
    });
    
  }
  commentHandler=()=>{
    const isDisplay=!isDisplay

  }

render () {
  const date = new Date(this.props.event.event_date).toString();
  return (
    <CardBox>
      <Inner>
        <Content>
          <img src={Envelope} />
          <div className="content">
            <p><span>Name:</span> { this.props.event.event_name} </p>
            <p><span>Date:</span> { date}</p>
            <p><span>location:</span> { this.props.event.place} </p>
           <p><span>Attending:</span> User1, User2</p>
          </div>
        </Content>
        <Action>
          <div className="comment">
            <img src={Comment} onClick ={this.commentHandler}
             />
            <p>{this.state.comments.length}</p>
            <div claasName="message"></div>
            
            {this.state.comments.map(comment=>{
                         return[ comment.time,
                        
                               comment.message ]})
                     }
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
}

export default Card;