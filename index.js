import express from "express";
import userRouter from "./Router/userRouter.js";
import blogRouter from "./Router/blogRouter.js";
import parser from "body-parser";
import isActiveRoute from "./Helpers/routeHelpers.js";
import session from "express-session";
import { POST, authenticateToken} from "./Auth/login.js";
import signup from './Auth/signup.js';

const port = 3000;
const app = express();

app.use(parser.json());
app.use(express.json());

// Mounting userRouter at '/users' base path
app.use('/users', userRouter);

// Mounting blogRouter at '/blog' base path
app.use('/blog', blogRouter);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "d283hej1io2kmsxni32r239uejsan",
}))

app.post('/signup', signup)
app.post('/login', POST);
app.get('/protected', authenticateToken, (req,res) => {
    res.json({message: "Authenticated", user: req.user});
});
app.post('/logout', authenticateToken, (req,res)=> {
    res.json({message: "Logout successfull"});
})
app.locals.isActiveRoute = isActiveRoute;

const myMiddleware = (req, res, next) => {
    console.log('This is a middleware function');
    next(); // Call next to pass control to the next middleware in the stack
  };
  
  // Register middleware globally
app.use(myMiddleware);

app.listen(port,()=>{
    console.log('listening on port : ' + port);
})