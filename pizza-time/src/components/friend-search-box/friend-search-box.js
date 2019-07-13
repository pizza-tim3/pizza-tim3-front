import React from "react";
import axios from "axios";
import NewFriend from "./NewFriend.js"

//search box to find a new friend
//used in: profile
// export default function FriendSearchBox() {
//   return (
//     <>
//       <form>
//         <input type="text" name="fname" placeholder="Find a new friend" />
//       </form>
//     </>
//   );
// }

class FriendSearchBox extends React.Component{
        constructor(props){
          super(props);
          this.state={
            
            searchName : "",
            matchedUsers:[
            ]
          }
        }
        searchHandler=(event)=>{
          event.preventDefault();
            const name=this.state.searchName
          if(name.length===0){
            return
          }
          
          
         const id =localStorage.getItem("userFireBaseId")
               
          console.log("HERE IS THE ID",id)
          axios.post("https://pizza-tim3-be.herokuapp.com/api/users/find/name/", {
            "first_name":name,
            "user_id" : id
          },{headers:{
            "Access-Control-Allow-Origin": "*"
          }}).then (res =>{
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
        console.log("matchedUsers are ",this.state.matchedUsers);
        return (
         <div>
          <form onSubmit={this.searchHandler}>
           <input type="text" name="name" placeholder="Find a new friend" onChange={this.inputHandler} />
           <button>submit</button>
           {this.state.matchedUsers.map(user=>{
            return   <NewFriend key={user.id} user={user}/>
             })
           }
           
          </form>
        </div>
        )
     }  

}
export default FriendSearchBox
