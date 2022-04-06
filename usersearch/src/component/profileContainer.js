import { process_params } from "express/lib/router";
import React from "react";
import Profile from "./profile";
import './profileContainer.css';

//profile container taking in the props from the states defined and passing it
//down to the component and mapping each component out

export default function ProfileContainer(props){
    console.log('in container', typeof props.searchResult);
    console.log('in container',  props.searchResult);
    return(<>
        <h3>Your search has returned {props.searchResult.length} result(s)</h3>
        <div className="searchContainer">
            {props.searchResult && props.searchResult.map((element)=>{
                return <Profile loginUrl={element.login} key={element.id} avatar={element.avatar_url} profilePage={element.html_url}/>
            })}
        </div>
        
    </>)
}