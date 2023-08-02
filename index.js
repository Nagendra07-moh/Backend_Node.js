// BACKEND IS NOTHING BUT A COMBINATION OF 1.SERVER 2.API 3.DATABASE
                                                   // 1.SERVER

// HOW TO CREATE A SERVER
// import gfName from "./features.js";

// CODE STARTS HERE
// import * as gfFeatures from "./features.js";
// import http from 'http';
// import { func1 } from "./features.js";

 
// // console.log(func1());

// const server = http.createServer((rq,rs)=>{
//    console.log("Server is working");
//    // console.log(rq.url);
//    if(rq.url ==="/home"){
//       rs.end(`<H1>${func1()}</H1>`);
//    }else if (rq.url ==="/index"){
//       rs.end("welcome to index");
//    }else{
//       rs.end("<h1>404</h1>")
//    }
// });

// const port = 5000
// server.listen(port,()=>{
//    console.log("Server is listening on port", port);  
// })

                                 // EXPRESS

import express from 'express';
import { type } from 'os';
import path from 'path';   
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017",{
   "dbName": "Backend",
}).then(()=> console.log("Database connection established")).catch(()=> console.log("Error happened!!" ));

// WE NEED TO DEFINE A SCHEMA FOR STORING DATA INTO MONGODB

const msgSchema = new mongoose.Schema({
   name:String,
   email:String,
})

// Collection AKA model

const newCol = mongoose.model("newCol" ,msgSchema)
   


const app = express();

app.set("view engine", "ejs"); // "view engine is a setting in Express.js that allows you to specify the template engine you want to use for rendering dynamic web pages. In this case, the template engine being set is EJS (Embedded JavaScript), hence the value "ejs".

const port = 5000;

// TO use Static files present in the public folder (every user can be able to acess files that are present in the public folder)
// using middlewares
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({ extended:true})); // to read the data coming from form submission 


app.post('/login',(req, res) => {
   res.send("hiii")
   res.cookie("token","IamIn")
   // ,{
   //    httpOnly:true,
   //    expires:Date(Date.now()+60 *1000),
   // });
   res.redirect("/login ");
});






app.get('/home',(req,res)=>{

// send any html file to a specific route
   // const pathlocation = path.resolve();  //this is to grap the path of the directory
   // res.sendFile(path.join(pathlocation,'./index.html'),); //to concatinate the path of directory and the file
   // console.log(req.query); //
   res.render("login");
     //to pass a dinamic variable using backend node to html page   
});

const  arr = [];


app.post('/home', async (req,res)=>{
   // console.log(req.body);
   // res.send({
   //    "send": "sucess", 
   //    "data": "none"
   // });
   console.log(req.body);
   console.log(typeof(req.body));

   // this is how we push data into mongoDB 
   await newCol.create({
      name: req.body.text,
      email: req.body.email

   }).then(()=>console.log("Your entry has been added into the database sucessully!!"), console.log("Some error has been occured!!"));

   arr.push(req.body);
   console.log(arr);
   // res.render("new");
   // res.redirect("/new");

   res.redirect("/users");
   // res.render("${req.body}");
   
})

app.get("/new", (req, res) => {

   res.render("new");

});

app.get('/users',(req,res)=>{
   res.json({
      arr,
   })
});

app.get('/add', async (req,res)=>{
  await  newCol.create({
      name: 'Nagendra_Mohan',
      email: 'nagendra.mohan.5@gmail.com@gmail.com'
   }).then(()=> res.send("hey there it is working!!") , console.log("Data has been sent successfully"));  

   });

app.listen(port,()=>{
   console.log("Server is listening on port", port);
})

