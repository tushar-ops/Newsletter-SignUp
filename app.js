const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})


app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.email;

  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };


  const jsonData = JSON.stringify(data);


 const url ="https://us1.api.mailchimp.com/3.0/lists/a31691f472";

 const options = {
   method :"POST",
   auth : "Tushar:964ee2379fdc503f45bebaa877af86e9-us1"
 }

  const request= https.request(url,options,function(response){

    if(response.statusCode=== 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/");
})




app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
});



  // Api key       964ee2379fdc503f45bebaa877af86e9-us1
  // list id        a31691f472
