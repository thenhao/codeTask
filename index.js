const axios = require('axios');
//import axios from 'axios';
const express = require("express");
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html'
    //res.send({ user: 'geek' })
})

app.get('/getUser', (req,res)=>{
    res.send({data:'linking success'});
})
//////////////////////////////////////////////////////////
//methods to encode stuff is below
//encode first before posting over
function prepSearchQuery(searchTerm){
    const textUrl = `https://api.github.com/search/users?q=${searchTerm}`;
    return encodeURI(textUrl);
}

async function searchUser(searchTerm){
    const errorBody = {};
    const URL = prepSearchQuery(searchTerm);
    console.log(URL);
    const response = await axios.get(URL).catch((err)=>{
        console.log(err);
        return errorBody;
    });
    
    //console.log('the items is',response.data.items);
    return response.data.items;
}

app.post('/searchUser', async (req,res)=>{
    console.log(req.body);
    console.log(req.body.searchTerm);

    const response = await searchUser(req.body.searchTerm);
    // setUsers(response.data.items);
    //console.log(response);
    res.send(response);

})

////////////////////////////////////////////////////////////////////////
const portNum = 3001;

app.listen(portNum, ()=>{
    console.log("listening to port", portNum)
});