import React from "react";
import axios from "axios";

class NewFriend extends React.Component{
    constructor(props){
        super(props);

    }
    inviteHandler=(event)=>{
        event.preventDefault();
        const id =localStorage.getItem("firebase_uid")

        const invite= axios.post(`https://pizza-tim3-be.herokuapp.com/api/friends/request/${id}/${this.props.user.firebase_uid}`)
                           .then(res =>{

                               window.location .reload();
                           })
                           .catch(error=>{

                            console.log(error)
                           })

    }
    render(){
        return (
            <div>
              <b>{this.props.user.first_name}</b>{" "}
             <b> {this.props.user.last_name}</b><br/>
                 {this.props.user.email} {" "}
              <button onClick={this.inviteHandler} > invite </button>
            </div>

    )

    }
}
export default NewFriend