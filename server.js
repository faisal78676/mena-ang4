const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const path = require('path');
const port = '3000';
const router = express.Router();
const authentication = require('./routes/authentication')(router);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/authentication',authentication);
app.use(express.static(__dirname + '/client/dist/')); // Provide static directory for frontend

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err)=>{
    if(err){
            console.log('could not connect to database');
    }
    else{
            // console.log('crypto',config.secret);
            console.log('connect to database');
    }
})

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
    // res.send('hi from node ');
    
});

app.listen(port,(err)=>{
  if(err)  {
    console.log('could not connect to server');
  }
  else{
      console.log('server connected on port number'+port);
  }
});