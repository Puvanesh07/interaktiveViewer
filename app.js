var gltfsrcValue;

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 
mongoose.connect("mongodb+srv://admin-farha:Test123@interaktivecluster.ixp18.mongodb.net/interaktiveDB?retryWrites=true&w=majority",{useNewUrlParser: true,  useUnifiedTopology: true,});

const urlSchema = new mongoose.Schema({
  _id: Number,
  urls: {
    type: Map,
    of:String
  }
})

const usersSchema = new mongoose.Schema({
  _id: Number,
  first_name: String,
  last_name: String,
  api_key: String,
  gltf_models: urlSchema
})

const URL = mongoose.model("Url",urlSchema);
const USER = mongoose.model("User", usersSchema);

const url2 = new URL({  
 _id: 2,
  urls:{
    url1: "This is the URL of user2"
    }
})

//url2.save();

const user1 = new USER({
  _id: 2,
  first_name: "Max",
  last_name : "Vestappan",
  api_key : "test5",
  gltf_models: url2
 })
 
 //user1.save();

   app.get('/viewer', function (req, res) {

   USER.find({api_key: req.query.ApiKey},{_id:1}, function(err, users){
        if (err)
        console.log(err);
        else{
          URL.find({_id: users},{urls:1, _id:0} ,function(err2, urlLinks){
            if(err2)
              console.log(err2);
              else{  
                console.log(urlLinks)          
              urlLinks.forEach(function(urlLink){              
                 gltfsrcValue = urlLink.urls.get(req.query.UrlKey);       
                console.log(gltfsrcValue)
               })
               res.render("createCanvas.ejs",{gltfsrc : gltfsrcValue});
                }
               
              })
        }
          
    })
    console.log(gltfsrcValue);
  })

  let port = process.env.PORT;
if (port == null || port == "") {
  port = 5001;
}
app.listen(port, ()=> console.log("Listening on port from heroku" +port + __dirname))
