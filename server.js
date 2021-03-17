const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const port = process.env.PORT || 3000
const fileUpload = require('express-fileupload')
app.use(express.static((__dirname + '/public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(expressSession({
    secret:'session',
    resave:false,
    saveUninitialized:true
}))
app.set('view engine','ejs')
app.use(fileUpload())
require("./app/routes/login.routes.js")(app)
require("./app/routes/forget.routes.js")(app)
require("./app/routes/workers.routes.js")(app)
require("./app/routes/branches.routes.js")(app)
require("./app/routes/settings.routes.js")(app)
require("./app/routes/drugs.routes.js")(app)

app.listen(port,() => {
    console.log(`Applikasiya ${port} portunda çalışır...`)
})