module.exports = app => {
    
    const  getRandom = (min, max) => {
        let randomNum = Math.random() * (max - min) + min
        return Math.floor(randomNum)
    }

    const nodemailer = require('nodemailer');
    const mySql = require('../models/db')
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fermanallahverdiyev19@gmail.com',
        pass: 'salamsalam1'
    }
    });

    
    
    app.get('/forget', (req,res) => {
        if(!req.session.admin_email){
            res.render('pages/forget')
        }
    })

    app.post('/forget', (req,res) => {
        const email = req.body.email
        let randomNum = String(getRandom(100000,999999))
        const mailOptions = {
            from: 'fermanallahverdiyev19@gmail.com',
            to: email,
            subject: 'Şifrəni yenilə :',
            html:'Sizin 6 rəqməli kodunuz : <strong>' + randomNum + '</strong>'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } 
          })

        res.render('pages/enterpassword',{password:randomNum})
    })

    app.post('/enterpassword', (req,res) => {
        const link = req.body
        if(link.code == link.password){
            res.redirect('/changepassword')
        }
    })
    app.get('/changepassword', (req,res) => {
        res.render('pages/changepassword')
    })

    app.post('/changepassword', (req,res) => {
        const link = req.body
        const sql = 'UPDATE admin SET ?'
        mySql.query(sql,{admin_password:link.password1},err => {
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/')
            }
        })
    })
}