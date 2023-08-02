import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import path from 'path';
import ejs from 'ejs';
import  bcrypt from 'bcrypt';



const app = express();

app.use(express.json());  // This will allow us to accept json
app.use(cors());

app.set("view engine", "ejs");

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
bodyParser.urlencoded({extended: false});

app.use(express.static(path.join(path.resolve(),"public")));

const post = [
   {
      username: 'Nagendra',
      title: 'devTools'
   },
   {
      username: 'Mohan',
      title: 'sde-1'
   }
]


app.get('/home',(req, res, next) =>{
   res.render("login");
});



// PASSWORD HASHING USING BYCRYPT 
app.post('/users', async (req, res) => {
   //main work will be done here like hashing the credentials
   try{
      // const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      
      const user = {
         name: req.body.email,
         password: hashedPassword,
      }

      // console.log(user);
      users.push(user);
      res.json(user);
      console.log(user);
   }catch{
      res.status(500).send();
   }


});




const users = [
   {
      "email": "NaguIdCodeForces",
      "password": "$2b$10$QJmQPrmXuEJDIAY7uY.VU.pCw8OXiQrHV39l/WPjHcLjBZAYk8YK."
    }
];
// console.log(users)

app.post('/main', (req, res) => {
   const user = {
      email: req.body.email,
      password: req.body.password
   }

   users.push(user);

   // res.json(users);
   res.status(200).send("Done!!");
});


// to  match the password entered by user compare it with already existing password by searching the id form the existing array ( users)


app.post('/user/login', async (req, res) => {
   const user = users.find(user => { return user.email === req.body.email});
   console.log("This is user",user);
   console.log("This is body",req.body)
   if(user == null) {
      
      return res.status(404).send("User not found");
   }
   try{
       if(await bcrypt.compare(req.body.password, user.password)){
         // res.send("Sucess");
         res.json({
            "success": true,   
         })
         // console.log(res.json);
       }else{
         // res.send("Not allowed");
         res.json({
            "sucess": false,
         })
       }
   }catch{
         res.json(404).send("Someting failed");
   }
});

app.get('/test', (req, res)=>{
   res.json(users);
});


// {
//    "email": "NaguIdCodeForces",
//    "password": "123456789"
// } 





























const port = 4000;
app.listen(port,()=>{
   console.log("server listening on port",port);
});