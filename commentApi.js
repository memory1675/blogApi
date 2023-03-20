const { v4: uuidv4 } = require('uuid')
const comments = (router, conn) => {
    router.get('/getallcomment', (req, res, err) => {
        conn.query('select * from comment', function (err, result) {
            if (!err) res.send(result)
            else console.log(this.sql);
        })
    })

    router.put('/addcomment', function(req, res, err) {
        const id = uuidv4();
        const { username, comment, email, articleid, show } = req.query
        const date = new Date().toLocaleString().replaceAll('/', '-');
        const arr = [id, username, comment, email, articleid, show, date]
        conn.query('insert into comment values(?,?,?,?,?,?,?)', arr, function (error, result) {
            if (!error) {
                res.send(result.affectedRows > 0 ? { flag: true, message: '添加成功' } : { flag: false, message: 'fail' })
            } else console.log(this.sql);
        })
    })


    router.get('/modifycomment', function(req, res, err) {
        const { id, username, comment, email, show } = req.query
        const arr = { username, comment, email, show }
        conn.query('update comment set ? where id = ?', [arr, id], function (error, result) {
            if (!error) {
                res.send(result.affectedRows > 0 ? { flag: true, message: '修改成功' } : { flag: false, message: 'fail' })
            } else console.log(this.sql);
        })
    })

    router.delete('/deletecomment/:id', (req, res, err) => {
        if (req.params.id) {
            conn.query('delete from comment where id = ?', [req.params.id], (error, result) => {
                if (!error) res.send(result.affectedRows > 0 ? { flag: true, message: '删除成功' } : { flag: false, message: 'fail' })
                else throw error
            })
        } else res.send('id not exist!')
    })
}

module.exports = comments