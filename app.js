var gltfsrcValue = "https://interaktive10.github.io/hosted-assets/Collar_Animation.glb";
var viewerLinkValue;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// mongoose.connect("mongodb+srv://admin-farha:Test123@interaktivecluster.ixp18.mongodb.net/interaktiveDB?retryWrites=true&w=majority",{useNewUrlParser: true,  useUnifiedTopology: true,});
// const urlSchema = new mongoose.Schema({
//   _id: Number,
//   urls: {
//     type: Map,
//     of:String
//   }
// })
// const usersSchema = new mongoose.Schema({
//   _id: Number,
//   first_name: String,
//   last_name: String,
//   api_key: String,
// })
// const URL = mongoose.model("Url",urlSchema);
// const USER = mongoose.model("User", usersSchema);
app.get("/", function(req,res){
  res.send("Interaktive Viewer is up and running");
})
app.get("/view", function(req,res){
//   USER.find({api_key: req.query.ApiKey},{_id:1}, function(err, users){
//     if (err)
//     console.log(err);
//     else{
//       URL.find({_id: users},{urls:1, _id:0} ,function(err2, urlLinks){
//         if(err2)
//           console.log(err2);
//           else{
//           urlLinks.forEach(function(urlLink){
//              gltfsrcValue = urlLink.urls.get(req.query.UrlKey);
//            })
//            res.render("createUserCanvas.ejs",{gltfsrc : gltfsrcValue});
//             }
//           })
//     }
// })
// }
    console.log("test");
res.render("createUserCanvas.ejs",{gltfsrc : gltfsrcValue});
})
// app.get('/viewer', function (req, res) {
//    USER.find({api_key: req.query.ApiKey},{_id:1}, function(err, users){
//         if (err)
//         console.log(err);
//         else{
//           URL.find({_id: users},{urls:1, _id:0} ,function(err2, urlLinks){
//             if(err2)
//               console.log(err2);
//               else{
//               urlLinks.forEach(function(urlLink){
//                  gltfsrcValue = urlLink.urls.get(req.query.UrlKey);
//                  viewerLinkValue = "https://interaktive-viewer.herokuapp.com/view?ApiKey="+req.query.ApiKey+"&UrlKey="+req.query.UrlKey;
//                })
//                res.render("createCanvas.ejs",{gltfsrc : gltfsrcValue, viewerLink: viewerLinkValue});
//                 }
//               })
//         }
//     })
//   })
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5001;
}
app.listen(port, ()=> console.log("Listening on port from heroku" +port + __dirname))
