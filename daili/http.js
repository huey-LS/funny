var http = require('http'),
  https = require('https'),
  url = require('url'),
	port = 8892;

http.createServer(function(req, res){
	var body = '';
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', function(){
    var query = url.parse(req.url, true).query;
    if(!query.u) return res.end('muse have fetchUrl!');
    var request_url = query.u;
    var option = url.parse(request_url);
    var httpObj = 'http:'==option.protocol?http:https;

    req.headers.host = option.host;
    option.path = option.path?option.path:option.pathname+(option.search?option.search:'');
    req.headers.path = option.path;
    option.method = req.method;
    option.headers = req.headers;
    httpObj.request(option, function(result){
      for(var key in result.headers){
        res.setHeader(key, result.headers[key]);
      }
      result.on('data', function(chunk){
        res.write(chunk);
      });
      result.on('end', function(){
        res.end();
      });
    }).on('error', function(error){
      res.end('remote http.request error' + error)
    }).end(body);
  });
}).listen(port);
console.log('Http server running at localhost:'+port);