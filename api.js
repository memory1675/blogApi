const express = require('express')
const app = express()
const mysql = require('mysql')
const { exec } = require('child_process')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = express.Router();
const file = express.Router();
const aboutFile = express.Router();

//文章
const article = require('./articleApi')
//留言
const comment = require('./commentApi')
//友链
const chain = require('./chainApi')
//日常
const about = require('./aboutApi')
const conn = mysql.createConnection({
    host: 'localhost',
    post: '3306',
    user: 'root',
    password: 'root',
    database: 'myproject'
})

app.use(function (req, res, next) {
    //跨域设置(同源访问策略)
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.get('', (req, res) => {
    res.send('404')
})

app.get('/rename', (req, res) => {
    exec(`rename ${req.query.beforename}.md ${req.query.aftername}.md`, { cwd: path.resolve(__dirname, 'article') }, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send('yes')
        }
    })
})

app.use('/api', router)
app.use('/file', file)
app.use('/aboutfile', aboutFile)
app.use(express.static('./note'))
file.use(express.static('./static'))
file.use(express.static('./article'))
const upload1 = multer({
    dest: './article',
    preservePath: true,
    fileFilter(req, file, callback) {
        // 解决中文名乱码的问题
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
        );
        callback(null, true);
    },
})
const upload2 = multer({
    dest: './static',
    preservePath: true,
    fileFilter(req, file, callback) {
        // 解决中文名乱码的问题
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
        );
        callback(null, true);
    },
})
file.use(upload1.any())
aboutFile.use(upload2.any())
file.post('/load', (req, res) => {
    const file = req.files[0]
    fs.rename(path.resolve(__dirname, file.path), path.resolve(__dirname, `article/${file.originalname}`), (err) => {
        if (!err) {
            res.send({ flag: true, message: '上传成功！' })
        }
    })
})

const getData = (sql) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, function (err, result) {
            if (!err) resolve(result)
            else reject(this.sql)
        })
    })
}

router.get('/getall', async (req, res) => {
    const result = {}
    try {
        result.article = await getData('select * from article order by date desc')
        result.tag = await getData('select * from tags')
        result.type = await getData('select * from type')
        result.chain = await getData('select * from chain')
        result.comment = await getData('select * from comment')
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

router.get('/gettypes', (req, res) => {
    conn.query('select * from type', (err, result) => {
        if (!err) res.send(result)
        else throw new Error(err)
    })
})

router.get('/gettags', (req, res) => {
    conn.query('select * from tags order by id', (err, result) => {
        if (!err) res.send(result)
        else throw new Error(err)
    })
})

router.put('/addtag', (req, res) => {
    const tag = req.query.tag
    const id = uuidv4();
    conn.query('insert into tags values(?,?)', [id, tag], function (err, result) {
        if (!err) res.send(result.affectedRows > 0 ? { flag: true, message: '添加成功' } : { flag: false, message: 'fail' })
        else console.log(this.sql);
    })
})

router.put('/addtype', (req, res) => {
    const type = req.query.type
    const id = uuidv4();
    conn.query('insert into type values(?,?)', [id, type], function (err, result) {
        if (!err) res.send(result.affectedRows > 0 ? { flag: true, message: '添加成功' } : { flag: false, message: 'fail' })
        else console.log(this.sql);
    })
})

router.delete('/deletetype/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        conn.query('delete from type where id =?', [id], function (err, result) {
            if (!err) res.send(result.affectedRows > 0 ? { flag: true, message: '删除成功' } : { flag: false, message: 'fail' })
            else console.log(this.sql);
        })
    }
})

router.delete('/deletetag/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        conn.query('delete from tags where id =?', [id], function (err, result) {
            if (!err) res.send(result.affectedRows > 0 ? { flag: true, message: '删除成功' } : { flag: false, message: 'fail' })
            else console.log(this.sql);
        })
    }
})

article(router, conn)
comment(router, conn)
chain(router, conn)
about(router, conn, aboutFile)
app.listen('8002', () => {
    console.log('服务器启动成功！=>http://localhost:8002');
})