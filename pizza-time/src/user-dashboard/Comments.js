import React from "react";
import axios from "axios";


class Comments extends React.Component{
  constructor(){
    super(props);
    this.state= {
        comments:""

    }

    getComments=()=>{
      if (Comments.length>0){
          console.log(comments.length)
          axios.get("http://localhost:5500/api/comments/event/1")
          .then(res=>{
              console.log("COMMENTS RESPONSE",res)
              this.setState({comments:res.data.message})
          })
          .catch(err =>{
              this.setState({err})
          }
      }

    }
  }
  render(){
     return(
      <div>
         


      </div>
     )
     


  }


}