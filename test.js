/* 
const time = new Date()
console.log(time.toLocaleString().replaceAll('/','-'));
console.log(uuidv4()); */
/* const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    post: '3306',
    user: 'root',
    password: 'root',
    database: 'myproject'
})
const { v4: uuidv4 } = require('uuid')
let post = {id: 1, tag: 'json'}
const query = conn.query('insert into tags set ?',post,(err, results, fields) => {
    if(err) throw err
})

console.log(query.sql);

conn.end() */

/* const { exec } = require('child_process')
const path = require('path') */
/* execFile('theday2.md',[],(err,stdout,stderr) => {
    if(err){
        console.log(err);
        return
    }
    console.log(`studout:${stdout}`);
}) */
/* exec('rename theday1.md theday2.md', { cwd:path.resolve(__dirname,'article') }, (err, stdout, stderr) => {
    if(err) {
        console.log(err);
        return;
    }
}) */
const fs = require('fs')
fs.rename('./article/123.md','./article/234.md',() => {
    
})