var static = require('node-static'),
    settings = require('./settings').settings;

var BoingRequest = require('./lib/BoingRequest');
var reqHandler = require('./lib/ReqHandler');


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


var fileServer = new static.Server(settings.cacheDir, { cache: 3600 });
require('http').createServer(function (request, response) {
    fileServer.serve(request, response, function (e, res) {
        if (e && (e.status === 404)) { // If the file wasn't found 
            
            // TODO check if it is a request for a static file, then we dont need to match routes
            
            var bReq = new BoingRequest(request);
            reqHandler.process(bReq, response);
        }
    });
}).listen(settings.server.port);

console.info('Boing server running...');
