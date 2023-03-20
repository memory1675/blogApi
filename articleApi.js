const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const article = (router, conn) => {
    //查询所有
    router.get('/getallarticle', (req, res, err) => {
        conn.query('select * from article order by date desc', (err, result) => {
            if (!err) res.send(JSON.stringify(result))
            else throw new Error(err)
        })
    })
    /* 
    http://localhost:8002/api/addarticle?title=程序员的一天&ty
    pe=日记&tags=['js','vue','json']&views=0&ispub=0&ope
    ncomment=0&route=theday
    
    */
    //增
    router.put('/addarticle', (req, res, err) => {
        const id = uuidv4();
        const { title, type, tags, opencomment, route, text } = req.query
        const views = 0
        const ispub = 0
        const date = new Date().toLocaleString().replaceAll('/', '-')
        const arr = [id, title, text, type, tags, views, ispub, opencomment, route, date]
        conn.query('insert into article values(?,?,?,?,?,?,?,?,?,?)', arr, function (error, result) {
            if (!error) {
                res.send(result.affectedRows > 0 ? { flag: true, message: '添加成功' } : { flag: false, message: 'fail' })
            } else console.log(error);
        })
    })
    //改
    //http://localhost:8002/api/modifyarticle?id=e795b6a0-d0e7-4d82-9825-deac3df5e466
    //&title=程序员的一天&type=日记&tags=['js','vue','json']&ispub=0&opencomment=0&route=theday3
    router.get('/modifyarticle', (req, res, err) => {
        const { id, title, type, tags, ispub, opencomment, route, oldroute } = req.query
        const date = new Date().toLocaleString().replaceAll('/', '-');
        const arr = { title, type, tags, ispub, opencomment, route, date }
        if (route != oldroute) {
            fs.rename(path.resolve(__dirname, `article/${oldroute}.md`), path.resolve(__dirname, `article/${route}.md`), err => {
                if (err) console.log(err);
            })
        }
        conn.query('update article set ? where id = ?', [arr, id], function (error, result) {
            if (!error) {
                res.send(result.affectedRows > 0 ? { flag: true, message: '修改成功' } : { flag: false, message: 'fail' })
            } else console.log(this.sql);
        })
    })
    //删
    //http://localhost:8002/api/deletearticle/e795b6a0-d0e7-4d82-9825-deac3df5e466
    router.delete('/deletearticle/:id', (req, res, err) => {
        if (req.params.id) {
            conn.query('delete from article where id = ?', [req.params.id], (error, result) => {
                if (!error) res.send(result.affectedRows > 0 ? { flag: true, message: '删除成功' } : { flag: false, message: 'fail' })
                else throw error
            })
        } else res.send('dont have id')
    })

}

module.exports = article