var express=require('express');
var app=express();
var http =require('http');
const fs=require('fs');
const { json } = require('express');
var serviceport = process.env.SERVICEPORT;
var servicehost = process.env.SERVICEHOST; 

console.log("connecting to Service host" + servicehost);
app.get('/users',(req,res)=>{
	var api_response;
	var options={
		host:servicehost,
		port:serviceport,
		path:'/getAllUsers',
		method:'GET'
	}
	
	callback=function(response){
		response.on('data',function(jsondata){
			api_response=JSON.parse(jsondata); 
			console.log("response"+jsondata);
			console.log("No. of users"+api_response.length); 
		});
	
	response.on('end',function(){
		 for(var i=0 ; i<api_response.length;i++){
                 fs.appendFileSync('result.html',"<tr><td>"+api_response[i].name+"</td>		<td>"+api_response[i].email+"</td><td>"+api_response[i].role+"</td></tr>")
                  }
                  fs.appendFileSync('result.html',"</table>")
		 
		});	
		
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	var req=http.request(options,callback);
	req.end();
        fs.readFile('./header.html', null, function (error, header) {
        if (error) {
            res.writeHead(404);
            res.write('file not found');
        } else {
		  res.write(header);
        }
      })
	fs.readFile('./result.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('file not found');
        } else {
		  res.write(data);
        }
      })
      fs.readFile('./footer.html', null, function (error, footer) {
        if (error) {
            res.writeHead(404);
            res.write('file not found');
        } else {
		  res.end(footer);
        }
      })
});

app.listen(serviceport,function(req,res){
	console.log('server listen port is '+serviceport);
});
