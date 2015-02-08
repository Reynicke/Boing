var fs = require('fs'),
    BoingRequest = require('./BoingRequest'),
    settings = require('./../settings').settings;


var blacklist = ['/favicon.ico'],
    fileTypes = ['jpg', 'png', 'gif'];

/**
 * 
 * @param {BoingRequest} request
 * @param response
 */
function process(request, response) {
    if (blacklist.indexOf(request.originalRequest.url) != -1) {
        response.end();
        return;
    }

    if (!request.match) {
        send404(response);
        return;
    }
    
    console.info(request.match.data)
    
    // Find source file
    var reqData = request.match.data;
    var fileSrc = settings.imgDir + reqData.imgId + '.' + reqData.fileType;
    fs.exists(fileSrc, function(exists) {
        console.log(exists, fileSrc);

        if (exists) {
            fs.readFile(fileSrc, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': 'image/' + 'jpeg' });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            send404(response);
        }
    });
    
    // Manipulate source file
    
    // Save source file
    
    // Deliver source file
}

function send404(response) {
    response.writeHeader(404, {"Content-Type": "text/plain"});
    response.end("404 Not Found\n");
}




function checkFile(path) {
    fileTypes.forEach(function(fileType) {
        var testUrl = path + '.' + fileType;
        console.log(testUrl)
        fs.exists(testUrl, function(exists) {
            console.log(exists, testUrl);
        });
    });
}

exports.process = process;

