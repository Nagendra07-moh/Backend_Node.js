import express from 'express';


const app  = express();

// const bodyParser =  require('body-parser')
import bodyParser from 'body-parser';
import cors from 'cors';
app.use(express.json); // This will allow us to accept json
app.use(cors())


// create application/json parser
app.use(bodyParser.json())

// create application/x-www-form-urlencoded parser
 bodyParser.urlencoded({ extended: false })
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

app.get('/home',(req, res) => {
   res.reder("Welcome")
   // res.send(post);
})

app.post('/users', (req, res) => {
   //main word will be done here like hashing the credentials
   const user = {
      name: req.body.email,
      password: req.body.password
   }
   console.log(req.body);
   users.push(user);


   res.status(200).send(users);
   // res.json(users);
   

});
// LEARN AUTHENTICATION STARTS HERE!!
const users = []
app.get('/users', (req, res) => {
   res.json(users)
});




// LEARN AUTHENTICATION ENDS HERE!!

app.get('/posts', (req, res) =>{
   // res.json(post);
})

app.get('/login', (req, res) =>{
   // Authentication of the user
})





const port = 3000;
app.listen(port,()=>{
   console.log("server listening on port",port);
});