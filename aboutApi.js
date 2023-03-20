const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
module.exports = function (router, conn, aboutFile) {
    router.get('/getabout', function (req, res) {
        conn.query('SELECT * FROM about order by time desc', function (err, result) {
            if (err) console.log(this.sql);
            res.send(result)
        })
    })

    aboutFile.post('/load', (req, res) => {
        const files = req.files
        let i = 0
        files.forEach((file) => {
            fs.rename(path.resolve(__dirname, file.path), path.resolve(__dirname, `static/${file.originalname}`), (err) => {
                if (err) {
                    i = 1;
                }
            })
        })
        i == 0 ? res.send({ flag: true, message: '上传成功！' }) : res.send({ flag: false, message: '失败' })
    })

    router.put('/addabout', function (req, res) {
        const id = uuidv4()
        const { title, imagename, videoname, platform, type } = req.query
        const time = new Date().toLocaleString().replaceAll('/', '-')
        switch(type){
            case '0':{
                const arr = [id, title, platform, type, time]
                conn.query('INSERT INTO about(id,title,platform,type,time) values(?,?,?,?,?)', arr, function (err, result) {
                    if (err) console.log(this.sql);
                    res.send(result.affectedRows > 0 ? { flag: true, message: '添加成功' } : { flag: false, message: 'fail' })
                })
                break
            }
            case '1':{
                const arr = [id, title, imagename, platform, type, time]
                conn.query('INSERT INTO about(id,title,imagename,platform,type,time) values(?,?,?,?,?,?)', arr, function (err, result) {
                    if (err) console.log(this.sql);
                    res.send(result.affectedRows > 0? { flag: true, message: '添加成功' } : { flag: false, message: 'fail' })
                })
                break
            }
            case '2':{
                const arr = [id, title, videoname, platform, type, time]
                conn.query('INSERT INTO about(id,title,videoname,platform,type,time) values(?,?,?,?,?,?)', arr, function (err, result) {
                    if (err) console.log(this.sql);
                    res.send(result.affectedRows > 0? { flag: true, message: '添加成功' } : { flag: false, message: 'fail' })
                })
                break
            }
        }

    })

    /* router.get('/modifyabout', function (req, res, err) {
        const { title, imagename, videoname, platform, type } = req.query
    }) */

    router.delete('/deleteabout/:id', (req, res, err) => {
        if (req.params.id) {
            conn.query('delete from about where id = ?', [req.params.id], function (error, result) {
                if (!error) res.send(result.affectedRows > 0 ? { flag: true, message: '删除成功' } : { flag: false, message: 'fail' })
                else console.log(this.sql);
            })
        } else res.send('dont have id')
    })
}

