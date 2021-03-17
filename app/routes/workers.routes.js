module.exports = app => {
    const mySql = require('../models/db')

    function Worker(name,surname,address,branch,salary,position,phone) {
        this.worker_name = name.trim(),
        this.worker_surname = surname.trim(),
        this.worker_address = address.trim(),
        this.worker_branch = branch.trim(),
        this.worker_salary = salary,
        this.worker_position = position.trim()
        this.worker_phone = phone
    } 
    //* Bütün satıcılar
    app.get('/workers',(req,res) => {
        if(req.session.admin_email){
            let sql
            let like
            let sort = 'desc'
            const link = req.query
            //id
            if(link.si == 'desc'){
                sql = 'SELECT * FROM workers ORDER BY worker_id DESC'
                sort = 'asc'
            }
            else if(link.si == 'asc'){
                sql = 'SELECT * FROM workers ORDER BY worker_id ASC'
                sort = 'desc'
            }
            //name
            else if(link.sn == 'desc'){
                sql = 'SELECT * FROM workers ORDER BY worker_name DESC'
                sort = 'asc'
            }
            
            else if(link.sn == 'asc'){
                sql = 'SELECT * FROM workers ORDER BY worker_name ASC'
                sort = 'desc'
            }
            //time
            else if(link.st == 'desc'){
                sql = 'SELECT * FROM workers ORDER BY worker_time DESC'
                sort = 'asc'
            }
            else if(link.st == 'asc'){
                sql = 'SELECT * FROM workers ORDER BY worker_time ASC'
                sort = 'desc'
            }
            //address
            else if(link.sa == 'desc'){
                sql = 'SELECT * FROM workers ORDER BY worker_address DESC'
                sort = 'asc'
            }
            
            else if(link.sa == 'asc'){
                sql = 'SELECT * FROM workers ORDER BY worker_address ASC'
                sort = 'desc'
            }
            //salary
            else if(link.ssa == 'desc'){
                sql = 'SELECT * FROM workers ORDER BY worker_salary DESC'
                sort = 'asc'
            }
            
            else if(link.ssa == 'asc'){
                sql = 'SELECT * FROM workers ORDER BY worker_salary ASC'
                sort = 'desc'
            }
            //branch
            else if(link.sb == 'desc'){
                sql = 'SELECT * FROM workers ORDER BY worker_branch DESC'
                sort = 'asc'
            }
            
            else if(link.sb == 'asc'){
                sql = 'SELECT * FROM workers ORDER BY worker_branch ASC'
                sort = 'desc'
            }
            //position
            else if(link.sp == 'desc'){
                sql = 'SELECT * FROM workers ORDER BY worker_position DESC'
                sort = 'asc'
            }
            
            else if(link.sp == 'asc'){
                sql = 'SELECT * FROM workers ORDER BY worker_position ASC'
                sort = 'desc'
            }
            //surname
            else if(link.ss == 'desc'){
                sql = 'SELECT * FROM workers ORDER BY worker_surname DESC'
                sort = 'asc'
            }
            else if(link.searchname){
                sql = 'SELECT * FROM workers WHERE worker_name LIKE ?'
                like = '%' + link.searchname + '%'
            }
            else if(link.searchsurname){
                sql = 'SELECT * FROM workers WHERE worker_surname LIKE ?'
                like = '%' + link.searchsurname + '%'
            }
            else if(link.searchaddress){
                sql = 'SELECT * FROM workers WHERE worker_address LIKE ?'
                like = '%' + link.searchaddress + '%'
            }
            else if(link.searchphone){
                sql = 'SELECT * FROM workers WHERE worker_phone LIKE ?'
                like = '%' + link.searchphone + '%'
            }
            else if(link.searchposition){
                sql = 'SELECT * FROM workers WHERE worker_position LIKE ?'
                like = '%' + link.searchposition + '%'
            }
            else if(link.searchsalary){
                sql = 'SELECT * FROM workers WHERE worker_salary LIKE ?'
                like = '%' + link.searchsalary + '%'
            }
            else if(link.searchbranch){
                sql = 'SELECT * FROM workers WHERE worker_branch LIKE ?'
                like = '%' + link.searchbranch + '%'
            }
            else {
                sql = 'SELECT * FROM workers ORDER BY worker_surname ASC'
            }

            mySql.query(sql,like,(err,data) => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    res.render('pages/workers',{data:data,sort:sort})
                }
            })
        }
        else{
            res.redirect('/')
        }
    })
    //? Güncəlləmək
    app.get('/workers/edit',(req,res) => {
        if(req.session.admin_email){
            const sql = 'SELECT * FROM workers WHERE worker_id = ?'
            const sql2 = 'SELECT * FROM branches'
            
            const workerId  =req.query.workerId
            let branches
            let dataPositions
            const sql3 = 'SELECT * FROM positions'
            mySql.query(sql3,(err,data) => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    dataPositions = data
                }
            })

            mySql.query(sql2,(err,data) => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    branches = data
                }
            })

            mySql.query(sql,workerId,(err,data) => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    res.render('pages/editworker',{data:data,dataBranches:branches,dataPositions:dataPositions})
                }
            })
        }
        else{
            res.redirect('/')
        }
        
    })
    app.post('/workers/edit',(req,res) => {
        const link = req.body
        const worker = new Worker(link.name,link.surname,link.address,link.branch,link.salary,link.position,link.phone)

        const sql = 'UPDATE workers SET ? WHERE worker_id = ?'
   
        mySql.query(sql,[worker,link.id],(err) => {
            if(err){
                console.log('Xəta : ' +err)
            }
            else{
                res.redirect('/workers')
            }
        })
    })
    //! Silmək
    app.get('/workers/delete',(req,res) => {
        if(req.session.admin_email){
            require('fs').unlinkSync('public/img/' )
            const sql = 'DELETE FROM workers WHERE worker_id = ?'
            const workerId = req.query.workerId
            mySql.query(sql,workerId, err => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    res.redirect('/workers')
                }
            })
        }
        else{
            res.redirect('/')
        }
    })
    //? Yeni satıcı
    app.get('/workers/add', (req,res) => {
        if(req.session.admin_email){
            let dataPositions
            const sql = 'SELECT * FROM branches'
            const sql2 = 'SELECT * FROM positions'
            mySql.query(sql2,(err,data) => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    dataPositions = data
                }
            })
            mySql.query(sql,(err,dataBranches) => {
                if(err){
                    console.log('Xəta : ' + err)
                }
                else{
                    res.render('pages/addworker',{dataBranches:dataBranches,dataPositions:dataPositions})
                }
            })
            
        }
        else{
            res.redirect('/')
        }
        
    })
    app.post('/workers/add', (req,res) => {
        const link = req.body


        const worker = new Worker(link.name,link.surname,link.address,link.branch,link.salary,link.position,link.phone)
        const sql = 'INSERT INTO workers SET ?'
        mySql.query(sql,worker,err => {
            if(err){
                console.log('Xəta : ' + err)
            }
            else{
                res.redirect('/workers')
            }
        })
    })

    
    

}
