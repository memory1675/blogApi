const { v4: uuidv4 } = require('uuid')
const chain = (router,conn) => {
    router.get('/getallchain', function(req, res, err) {
        conn.query('select * from chain order by sort',function(err, result) {
            if(!err) res.send(result)
            else console.log(this.sql);
        })
    })
    
    router.put('/addchain', function(req, res, err) {
        const id = uuidv4();
        const { chainname, url, logourl, sort } = req.query
        const arr = [id, chainname, url, logourl, parseInt(sort)]
        conn.query('insert into chain values(?,?,?,?,?)', arr, function (error, result) {
            if (!error) {
                res.send(result.affectedRows > 0 ? { flag: true, message: '添加成功' } : { flag: false, message: 'fail' })
            } else console.log(this.sql);
        })
    })
    
    router.get('/modifychain', function(req, res, err) {
        const { id, chainname, url, logourl, sort } = req.query
        const arr = { chainname, url, logourl, sort }
        conn.query('update chain set ? where id = ?', [arr, id], function (error, result) {
            if (!error) {
                res.send(result.affectedRows > 0 ? { flag: true, message: '修改成功' } : { flag: false, message: 'fail' })
            } else console.log(this.sql);
        })
    })
    
    router.delete('/deletechain/:id', (req, res, err) => {
        if (req.params.id) {
            conn.query('delete from chain where id = ?', [req.params.id], (error, result) => {
                if (!error) res.send(result.affectedRows > 0 ? { flag: true, message: '删除成功' } : { flag: false, message: 'fail' })
                else throw error
            })
        } else res.send('id not exist!')
    })
}

module.exports = chain