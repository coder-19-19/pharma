module.exports = app => {
    const mySql = require('../models/db')

    app.get('/drugs', (req,res) => {
        if(req.session.admin_email){
            res.render('pages/drugs')
        }
        else{
            res.redirect('/')
        }
    })
}