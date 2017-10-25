let http = require('http');

let fs = require('fs');

let path = require('path');

let mime = require('mime');

let server = http.createServer();

server.listen(3000, () => {
    console.log('监听成功，服务器启动')
});

server.on('request', (req, res) => {
    // console.log(req.url); //  /
    if (req.url == '/') {
        res.writeHeader(200, {
            'Content-Type': 'text/html;chartset=UTF-8'
        });
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            if (!err) {
                res.write(data);
                res.end();
            }
        })
    }else{
        let realPath=path.join('./',req.url);
        fs.readFile(realPath,(err,data)=>{
            // console.log(mime.getType(realPath));//多个响应头
            if(!err){
                res.writeHeader(200,{
                    // 通过第三方模块mime获得不同类型资源的mime
                    'Content-Type':mime.getType(realPath)
                })
                // 响应结果
                res.write(data);
                // 结束响应
                res.end();
            }
            
        })
    }
})