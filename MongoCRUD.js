import mongoose from 'mongoose';
import express from 'express';
import path from 'path';  //The Path module provides a way of working with directories and file paths.
import  bcrypt from 'bcrypt';

const app = express();

const port = 5500;

mongoose.connect("mongodb://localhost:27017",{
   "dbName":"MongoTut"
}).then(()=> console.log("mongoDb is live!!")).catch(()=> console.log("Error occured!!"));


const msgSchema = new mongoose.Schema({
   name:String,
   email:String,
})

// Collection AKA model

const newColoumn = mongoose.model("newColoumn" ,msgSchema)


// this is to send data by creating  a new collection inside mongoBd by the name of MongoTut 
app.get('/add', async (req,res)=>{
   await  newColoumn.create({ 
       name: 'Nagendra_Mohan',
       email: 'nagendra.mohan.5@gmail.com@gmail.com'
    }).then(()=> res.send("hey there it is working!!") , console.log("Data has been sent successfully"));  
 
});

app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({ extended:true})); 
// crud Assigment starts here!!
app.get('/home',(req,res)=>{
   res.render("cRud")

})


// for saving users into our databse we need to create a new collectio name Users

// mongoose.connect("mongodb://localhost:27017",{
//    "dbName": "Users"
// }).then(()=> console.log("Users is live")).catch(()=> console.log("Some error has been occured in Users"))



app.post('/home', async (req,res)=>{
   // now we need to hash the password
   try{
      const hP = await bcrypt.hash(req.body.password ,10);

      const user ={
         name : req.body.email,
         password : hP
      }
      // console.log(user); //our password has been hashed sucessfully 

      // now we need to push the user(email and password) into our database!! (for temp we use existing collection newColumns)
      await newColoumn.create({
         name:user.name,
         email:user.password
      }).then(()=> console.log("data has been registered")).catch(()=> console.log("data has not been registered"))


   }catch{
      console.log("error has been occured during hashing");
      res.status(500).send();

   }



   
   res.redirect("/done")

});

app.get('/done',(req,res)=>{
   res.render("done");
});




// To  perform searching of already existing user 

app.get('/findUser',(req,res) => {
   res.render("find");
});


app.post('/findUser',(req,res)=>{
   console.log(req.body);
});


   


app.listen(port,()=>{
   console.log("Server is listening on port", port);
})
