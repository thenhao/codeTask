import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import './search.css'
import useDebounce from './debounce';
import ProfileContainer from './profileContainer';




function Search(){
    
    
    //Finding and setting users
    const [users, setUsers] = useState([]);
    //Getting and setting input text values
    const [text, setText] = useState('');
    //Getting and setting suggestions values
    const [suggestions, setSuggetions] = useState([]);
    //Getting and setting suggestion state, to show suggestions or not
    const [suggestionsValue, setSuggestionsValue] = useState(true);
    //Getting and setting the searchterm from the form submission
    const [searchResult, setSearchResult] = useState([]);
   

    

    
    useEffect(()=>{
        let matches= [];
        matches = users.filter(user=>{
            //const regex = new RegExp(`${text}`, "gi");
            //regex that specifies it contains characters and the settings are global, ignore case and match whole string
            const regex = new RegExp("\\S",'gim');
            //console.log(user.login);
            return user.login.match(regex);
        });
        
        //once filtered, suggestions values will be set for the autocomplete
        setSuggetions(matches);

    },[users]);

    

    function onTextChange(e){
         
        //condition to check if there is no text value
        if(e.target.value.length < 1){
            setText('');
            setSuggetions([]);
            setUsers([]);
        }
        
        //set the text value when text change
        setText(e.target.value);
        //set the suggestion state to be on for the debouncing for autocomplete
        setSuggestionsValue(true);
    }

    function onSuggest(e){
        //when suggestion value displayed is clicked we set the text value
        //set the suggestions value to empty
        //set the debouncing for autocomplete to be false
        console.log(e.target.textContent);
        setText(e.target.textContent);
        setSuggetions([]);
        setSuggestionsValue(false);
    }

    function whenBlur(){
        //Time out to ensure no clashing of updating of values
        //set suggestions to empty if user clicks outside of the suggestions area
        console.log("clicked outside of div");
        setTimeout(()=>{
            setSuggetions([]);
        }, 100);
    }

    function prepSearchQuery(text){
        //function to encode the URI from the text value that is passed into the function
        const textUrl = `https://api.github.com/search/users?q=${text}`;
        return encodeURI(textUrl);
    }

    async function searchApi(){
        //function to search the api everytime user hits a key

        //if empty or not text we return
        if(!text || text === '')
        return;
        //check for non white space characters
        //if white spaces found we return and set the users and suggestions value to default
        const regex = new RegExp("\\S",'m');
        if(!text.match(regex)){
            console.log('this whitespace regex fired in typing');
            setUsers([]);
            setSuggetions([]);
            return;
        }
        //encode the URL
        const URL = prepSearchQuery(text);
        console.log(URL);
        //use axios to do a call to the API and return the results
        const response = await axios.get(URL).catch((err)=>{
            console.log(err);
        });
        //setting the user data values in user
        setUsers(response.data.items);
    }

    //hook imported to cater to debouncing
    //to fire after user stop typing and the timer will timeout and the api will be called
    useDebounce(text, 500, searchApi, suggestionsValue);
   
    async function toSubmit(e){
        //function for form submit 

        //set the suggestions value to true to activate the debouncing for next typing
        console.log('function submit fired');
        setSuggestionsValue(true);
        //We do not want the default behaviour of form so we use preventDefault
        e.preventDefault();

        //If text value is not what we want we set the users, text, 
        //suggestions and searchresult value to default
        if(!text || text === ''){
            setUsers([]);
            setText('');
            setSuggetions([]);
            setSearchResult([]);
            return;
        }
        
    
        //const regex = new RegExp("\\s", 'g');
        //check for non white space characters
        //clear suggestion value when submit
        const regex = new RegExp("\\S",'m');
        if(!text.match(regex)){
            console.log('this whitespace regex fired in onsubmit');
            setUsers([]);
            setText('');
            setSuggetions([]);
            setSearchResult([]);
            return;
        }else{
            console.log('did not fire inside submit section');
            setSuggetions([]); 
        }
        
        //Using fetch to do a call to the route specified
        const response = await fetch('/searchUser', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({searchTerm:text})
        });

        //change the response to a json format to store the searchresult
        const result = await response.json();
        //const result = await response;
        //console.log('search result is',result);
        setSearchResult(result);
    }

    return(<div>
        <form onSubmit={toSubmit}>
            <h1>{suggestionsValue}</h1>
            <input type="text"
            onChange={onTextChange}
            onBlur={whenBlur} 
            value={text}/>
            <button >Search</button>
            <div className='suggestionContainer'>
                {suggestions && suggestions.map((suggestion,i)=>{
                    return <div className='suggestion' key={i} onClick={onSuggest} >{suggestion.login}</div>
                })}
            </div>
            
             <ProfileContainer searchResult={searchResult}/>
        </form>
    </div>)
}
export default Search;