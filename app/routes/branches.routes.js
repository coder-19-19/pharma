module.exports = app => {
    const mySql = require('../models/db')

    app.get('/branches', (req,res) => {
        if(req.session.admin_email){
            let sort = 'desc'
            const link = req.query
            let sql
            //* id
            if(link.si == 'desc'){
                sql = 'SELECT * FROM branches ORDER BY branch_id DESC'
                sort = 'asc'
            }
            else if(link.si == 'asc'){
                sql = 'SELECT * FROM branches ORDER BY branch_id ASC'
                sort = 'desc'
            }
            //*name
            else if(link.sn == 'desc'){
                sql = 'SELECT * FROM branches ORDER BY branch_name DESC'
                sort = 'asc'
            }
            else if(link.sn == 'asc'){
                sql = 'SELECT * FROM branches ORDER BY branch_name ASC'
                sort = 'desc'
            }
            else if(link.sa == 'desc'){
                sql = 'SELECT * FROM branches ORDER BY branch_address DESC'
                sort = 'asc'
            }
            else{
                sql = 'SELECT * FROM branches'
            }
            mySql.query(sql,(err,data) => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    res.render('pages/branches',{data:data,sort:sort})
                }
            })
        }
        else{
            res.redirect('/')
        }
        
    })
    app.get('/branches/info',(req,res) => {
        if(req.session.admin_email){
            const sql = 'SELECT * FROM workers WHERE worker_branch = ?'
            const sql2 = 'SELECT * FROM branches WHERE branch_name = ?'
            let dataBranches
            const branchName = req.query.branchName
            mySql.query(sql2,branchName,(err,data) => {
                dataBranches = data
            })
            mySql.query(sql,branchName,(err,dataWorkers) => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    res.render('pages/branch',{dataWorkers:dataWorkers,dataBranches:dataBranches,branchName:branchName})
                }
            })
        }
        else{
            res.redirect('/')
        }
        
    })
    app.get('/branches/add',(req,res) => {
        if(req.session.admin_email){
            res.render('pages/addbranch')
        }
        else{
            res.redirect('/')
        }
    })
    app.post('/branches/add',(req,res) => {
        const sql = 'INSERT INTO branches SET ?'
        const data = {
            branch_name:req.body.name.trim(),
            branch_address:req.body.address.trim()
        }
        mySql.query(sql,data,(err) => {
            if(err){
                console.log('Xəta : ' +err )
            }
            else{
                res.redirect('/branches')
            }
        })
    })
    app.post('/branches/edit', (req,res) => {
        const link = req.body
        const data = {
            branch_name : link.name,
            branch_address : link.address
        }
        const branchId = link.id
        const sql = 'UPDATE branches SET ? WHERE branch_id = ?'
        mySql.query(sql,[data,branchId], (err) => {
            if(err){
                console.log('Xəta : ' + err)
            }
            else{
                res.redirect(`/branches/info?branchName=${link.name}`)
            }
        })
    })
    app.get('/branches/delete', (req,res) => {
        if(req.session.admin_email){
            const id = req.query.branchId
            const sql = 'DELETE FROM branches WHERE branch_id = ?'

            mySql.query(sql,id,err => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    res.redirect('/branches')
                }
            })
        }
        else{
            res.redirect('/')
        }
        
    })
}


