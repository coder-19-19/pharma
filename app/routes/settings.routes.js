module.exports = app => {
    const mySql = require('../models/db')

    app.get('/settings' , (req,res) => {
        if(req.session.admin_email){
            res.render('pages/settings')
        }
    })
}