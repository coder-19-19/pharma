module.exports = app => {
    const mySql = require('../models/db')


    app.post('/', (req,res) => {
        const link = req.body
        const sql = 'SELECT * FROM admin'
        mySql.query(sql,(err,data) => {
            if(err){
                console.log('Xəta : ' + err)
            }
            else{
                if(data[0].admin_email == link.email && data[0].admin_password == link.password){
                    req.session.admin_email = data[0].admin_email
                    req.session.admin_password = data[0].admin_password
                    req.session.admin_name = data[0].admin_name
                    req.session.admin_id = data[0].admin_id
                    req.session.admin_time = data[0].admin_time
                    res.redirect('/workers')
                }
                else{
                    let error = "Email və ya şifrə yalnışdır"
                    res.render('pages/login',{error:error})
                }
            }
        })
    })

    app.get('/', (req,res) => {
        if(req.session.admin_email){
            res.redirect('/workers')
        }
        else{
            res.render('pages/login',{error:""})
        }
    })

    app.get('/logout', (req,res) => {
        req.session.admin_email = null
        req.session.admin_password = null
        req.session.admin_name = null
        req.session.admin_id = null
        req.session.admin_time = null
        res.redirect('/')
    })

    
}