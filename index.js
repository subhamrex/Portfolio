const express = require('express');
const app = express();
const parser = require('body-parser');
const server = require('http').Server(app);
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())



app.set("view engine","ejs");
app.use(express.static('public'));

app.get('/',(req,res) => {
    res.render("index",{});
})

app.get('/CV',(req,res) => {
    res.render("cv",{});
})

app.get('/Portfolio',(req,res) => {
    res.render("portfolio",{});
})

app.get('/Contact',(req,res) => {
    res.render("contact",{msg:""});
})

app.get('/send',(req,res) => {
    res.render("contact",{msg:""})
})

app.post('/send',(req,res) =>{
     var data = {
        Name: req.body.name,
        Email: req.body.email,
        Msg: req.body.msg,
    }
    "use strict";
var nodemailer = require("nodemailer");


  // create reusable transporter object using the default SMTP transport
  var transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "subhamrex000@gmail.com",
    pass: "********"
  }
});

const message = {
   // Sender address
    from: 'System <subhamrex000@gmail.com>', //
    to: 'subhamkundu486@gmail.com',         // List of recipients
    subject: 'Form Submission', // Subject line
    text: `Name:${data.Name}\n Email:${data.Email} \n Message:${data.Msg}` // Plain text body
};
transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
});
res.render('contact',{msg:"Msg Sent"});

})

 




server.listen(process.env.PORT||3030);
