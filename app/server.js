var static = require('node-static'),
    settings = require('./settings').settings;

var BoingRequest = require('./lib/BoingRequest');
var reqHandler = require('./lib/ReqHandler');
var Logger = require('./lib/Logger');


// Create symlink to serve static files
// TODO: place somewhere else and make reusable
try {
    var mkdirp = require('mkdirp');
    mkdirp.sync(settings.cacheDir);
    var fs = require('fs');
    fs.symlinkSync( fs.realpathSync(settings.static.srcDir), settings.cacheDir + settings.static.targetDir, 'dir', function() {
        console.log('done')
    });
} catch (exception) {
    console.error(exception);
}

var fileServer = new static.Server(settings.cacheDir, { cache: 3600,  serverInfo: "Boing File Server", gzip: false});
require('http').createServer(function (request, response) {
    fileServer.serve(request, response, function (e, res) {
        
        if (res && res.status === 200) { // if file was found
            Logger.logAccess(200, request.url, res.headers['Content-Length']);
        }
        
        if (e && (e.status === 404)) { // If the file wasn't found 
            
            // TODO check if it is a request for a static file, then we dont need to match routes
            
            var bReq = new BoingRequest(request);
            reqHandler.process(bReq, response);
        }
    });
}).listen(settings.server.port);

console.info('Boing server running...');



/*
 // https://gist.github.com/hakobera/3931679
 var cluster = require('cluster'),
 http = require('http'),
 static = require('node-static');

 var file = new(static.Server)(__dirname + '/');

 var numCPUs = parseInt(process.argv[2]);

 if (cluster.isMaster) {
 for (var i = 0; i < numCPUs; i++) {
 cluster.fork();
 }

 cluster.on('exit', function(worker, code, signal) {
 console.log('worker ' + worker.process.pid + ' died');
 });
 } else {
 var server = http.createServer(function(req, res) {
 file.serve(req, res);
 });
 server.listen(process.env.PORT || 18081);
 } 
 */
