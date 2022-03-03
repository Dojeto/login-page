const express = require("express");
const db = require("../db/schema");
const mongo = require("../db/mongoose");
let ejs = require('ejs');
let path = require('path');
const port = process.env.PORT || 3000;
const { use } = require("express/lib/application");
const { default: mongoose } = require("mongoose");
const app = express();

const static_path = path.join(__dirname,"../public")

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');

app.get("/",(req,resp)=>{
    resp.render('home')
})

app.get("/register", async (req, resp) => {

    resp.render('register');
});

app.post('/register',async (req,resp)=>{
    try{
        const psw = req.body.psw;
        const rep_psw = req.body.pswrepeat;

        if(psw === rep_psw)
        {
            const check = await db.find({username : req.body.username})
            if(check == ''){
            const newUser = await db.create({
                username : req.body.username,
                password : req.body.psw
            })
            resp.render('extra');
            }
            else{
                resp.send('<h1>Username already taken</h1>');
            }
        }
        else{
            resp.send("<h1>Both passwords are diffrent</h1>");
        }
    }
    catch(err)
    {
        resp.status(400).send(err);
    }
})

app.get('/login',(req,resp)=>{
    resp.render('login');
})

app.post('/login',async (req,resp)=>{
    const logpsw = req.body.psw;
    const usernamee = req.body.username;
    const checking = await db.find({
        username : usernamee
    })
    const pswchecking = await db.find({
        username : usernamee,
        password : logpsw
    })
    if (checking == '')
    {
        resp.send("<h1>No account with this username Try to register yourself</h1>");
    }
    else if (pswchecking == '')
    {
        resp.send("<h1>your password is incorrenct</h1>");
    }
    else{
        resp.send("<h1>Login succesfully</h1>");
    }
})

app.listen(port, async () => {
  console.log(`working on local host ${port} port`);
});

//some important notes for personal use so ignore it :)

// const test = async()=>{
//     const test2 = await db.find({
//         username:"random"
//     })
//     console.log(test2);
// }

// test();

  //adding new user

//   const user = await db.create({
//     username: "notDojeto",
//     passward: "Dojeto123",
//     userid: mongoose.Types.ObjectId()
//   });

  //delete user
  // const del = await db.deleteOne({
  //     username : "Dojeto"
  // })

  //update user
  // const update = await db.updateOne({
  //     username : "notDojeto"
  // },{
  //     username:"Dojeto",
  //     passward : "notokay"
  // })

  //adding manually
  // const update = new db({username : "Dojeto",
  // passward : "Dojeto123"})
  // await update.save();