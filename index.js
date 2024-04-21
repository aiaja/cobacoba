import express from "express";
import { users } from "./Controllers/users.js";
import { POST, authenticateToken} from "./Auth/login.js";
import signup from './Auth/signup.js';
import parser from "body-parser";

const port = 3000;
const app = express();

app.use(parser.json())
app.use('/users',users)

app.listen(port,()=>{
    console.log('listening on port : ' + port);
})

users.post('/', (req,res) => {
    console.log("user post : ", req.body)
    res.sendStatus(201)
})

app.post('/signup', signup)
app.post('/login', POST);
app.get('/protected', authenticateToken, (req,res) => {
    res.json({message: "Authenticated", user: req.user});
});
app.post('/logout', authenticateToken, (req,res)=> {
    res.json({message: "Logout successfull"});
})