import React from "react";
import axios from "axios";

class DashComment extends React.Component{
      constructor(props){
      super(props)
     this.state={
      
     }

      }
    render(){

      return (
           <div>
              <p>{this.props.comment.time}</p>
              <p>{this.props.comment.first_name}</p>
              <p>{this.props.comment.message}</p>
              
           </div>
      )
    }


    
}
export default DashComment