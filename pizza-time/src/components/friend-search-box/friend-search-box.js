import React from "react";
import axios from "axios";
import NewFriend from "./NewFriend.js"

import { Wrap } from '../../styles/friendSearchBoxStyles.js';

class FriendSearchBox extends React.Component{
        constructor(props){
          super(props);
          this.state={

            searchName : "",
            matchedUsers:[]

          }
        }
        searchHandler=(event)=>{
          event.preventDefault();
            const name=this.state.searchName
          if(name.length===0){
            return
          }


         const id =localStorage.getItem("firebase_uid")


          axios.post(`https://pizza-tim3-be.herokuapp.com/api/users/find/name/`, {
            "first_name":name,
            "user_id" : id
          }).then (res =>{
              console.log(" NEW FRIEND RESPONSE",res)
              this.setState({matchedUsers:res.data.result})
          }).catch(error=>{
               console.log(error);
          })
        }
        inputHandler=(event)=>{
          this.setState({searchName:event.target.value})
        }

     render(){

        return (
         <Wrap>
          <form onSubmit={this.searchHandler}>
            <input type="text" name="name" placeholder="Find a new friend" onChange={this.inputHandler} />
            <button>Search</button>
            {this.state.matchedUsers.map(user=>{
              return   <NewFriend key={user.id} user={user}/>
              })
            }
          </form>
        </Wrap>
        )
     }

}
export default FriendSearchBox
