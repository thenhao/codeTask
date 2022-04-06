import React from "react";
import './profile.css'

//profile component where we take the data passed from the container and
//we display the image, the user name and the link to the profile page
export default function Profile(props){
    return(<div className="componentSizing">
        <img src={props.avatar} className="imageStyle"/>
        
        <div className="loginAndProfileContainer">
                <h1 className="profileName">{props.loginUrl}</h1>
                <a href={props.profilePage}><b>Profile page</b></a>
        </div>   
    </div>)
}