var fileSystem = require('fs');
var express = require('express');
var app = express();

var serviceport = 8080;
app.get('/login',(req,resp)=>{
    console.log("login enter");
    fileSystem.readFile('./index.html',null, function(error, fileContent){
 
        if(error){
                        resp.writeHead(500, {'Content-Type': 'text/plain'});
                        resp.end('Error');
                    }
                    else{
                        resp.writeHead(200, {'Content-Type': 'text/html'});
                        resp.write(fileContent);
                        resp.end();
                    }
    });
});
app.listen(serviceport,function(req,res){
	console.log('server listen port is '+serviceport);
});
