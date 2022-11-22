const express = require("express")
const bodyparser = require("body-parser")
const request = require("request")
const https = require("https")
const app = express()

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html")
})

app.post("/", function(req, res){
    const firstName  = req.body.fname
    const lastName  = req.body.lname
    const emailid = req.body.email

    const data = {
        members:[
            {
                email_address: emailid,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)

  
    const url = "https://us14.api.mailchimp.com/3.0/lists/995e24ec60"
    const options ={
        

        method :"POST",
        headers:{
            "Authorization": "punam:6982bfac9af83840a1347aceb6219be3-us14"
        }
    }
    
    const request = https.request(url, options, function(response ){
    
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

   })

    // request.write(jsonData)
    request.end()


   
})

app.post("/failure", function(req, res){
    res.redirect("/")
})








app.listen(3000,function(){
    console.log("server is running on port 3000")
})

//api key
//07fe38288ce481ddb72a803b841ff2e8-us14

// unique id 
//995e24ec60