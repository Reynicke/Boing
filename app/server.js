var static = require('node-static'),
    settings = require('./settings').settings;

var BoingRequest = require('./lib/BoingRequest');
var reqHandler = require('./lib/ReqHandler');

var fileServer = new static.Server('./cache', { cache: 3600 });
require('http').createServer(function (request, response) {
    fileServer.serve(request, response, function (e, res) {
        if (e && (e.status === 404)) { // If the file wasn't found 
            var bReq = new BoingRequest(request);
            reqHandler.process(bReq, response);
        }
    });
}).listen(settings.server.port);
