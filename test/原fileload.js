file.post('/load', (req, res) => {
    const file = req.files[0]
    console.log(file);
    fs.rename(path.resolve(__dirname,file.path),path.resolve(__dirname,`article/${file.originalname}`),(err) => {
        if(!err){
            res.send({flag:true,message:'上传成功！'})
        }
    })
    // console.log(req.body);
    // console.log(req.body);
    /* console.log(req.headers);
    console.log(req.body); */
    /* const form = formidable({
        multiples: true,
        uploadDir: path.resolve(__dirname,'article'),
        keepExtensions: true
    })
    console.log(form);
    res.send('123') */
    /* const f = ctx.request.files
    if (f){
        console.log('文件',f.file.originalFilename, f.file.size);
        if (f.file){
             const reader = fs.createReadStream(f.file.filepath)
             const upStream = fs.createWriteStream('./article/' + f.file.originalFilename)
             reader.pipe(upStream)
        }
    }
    ctx.body = ctx.request.body */
})