const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();
class Mailer{
    constructor(name, surname, text, emailFrom, passwordFrom, emailTo){
        this.emailFrom = emailFrom;
        this.passwordFrom = passwordFrom;
        this.emailTo = emailTo;
        this.text = text;
        this.username = name;
        this.surname = surname;
    }

    send(){
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: this.emailFrom,
                pass: this.passwordFrom
            }
        });

        let mailOptions = {
            from: this.emailFrom,
            to: this.emailTo,
            subject: `A message to you from ${this.emailFrom}`,
            text: `This email is sent from ${this.username} ${this.surname} to you.\n`+
                `Here is msg:\n ${this.text}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error.toString());
            }else{
                console.log('Email sent' + info.response.toString());
            }
        });
    }

}


const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

let emailFrom = process.env.EMAIL_FROM;
let passwordFrom = process.env.PASSWORD_FROM;
let emailTo = process.env.EMAIL_TO;//by default




let requiredInfo = {
    name: '',
    surname: '',
    text: '',
    emailTo:''
}

let lastTime = 0;
let timer = 30000;//how many milliseconds will be between two messages(minimum)

app.post('/send_info/', (request, response)=>{
    if(Date.now() - lastTime > timer) {//timer
        requiredInfo = request.body;
        const mailer = new Mailer(requiredInfo.name, requiredInfo.surname, requiredInfo.text, emailFrom, passwordFrom, emailTo);
        console.log(requiredInfo);
        mailer.send();
        lastTime = Date.now();
        response.status(200).send({permission: 'yes', sent: true});
    }else{
        response.status(200).send({permission: 'no', sent: false});
    }
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT,
    ()=>{
        console.log(`Server started working ${PORT}`)
    }
);