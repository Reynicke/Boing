var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    gmImage = require('./gmImage'),
    BoingRequest = require('./BoingRequest'),
    settings = require('./../settings').settings;

var blacklist = ['/favicon.ico'],
    fileTypes = ['png', 'jpg', 'gif'];

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
    
    //console.info(request.match.data)
    
    // Find source file
    var srcFilePath = findSourceFile(request.match.data['imgId']); 
    if (!srcFilePath) {
        send404(response, 'id not found');
        return;
    }

    // If we're already working on this url
    if (!progressQueue.add(request.originalRequest.url)) {
        sendWait(response, request.originalRequest.url);
        return;
    }
    
    // Manipulate and save source file
    var requestData = request.match.data; 
    var targetFile = settings.cacheDir + request.originalRequest.url;
    prepareCacheDir(request.originalRequest.url);
    
    gmImage.apply(srcFilePath, requestData)
        .write(targetFile, function(err) {
            if (err) {
                send500(response);                
                return console.dir(arguments);
            }
                       
            console.log(targetFile + " created  ::  " + arguments[3]);
            progressQueue.remove(request.originalRequest.url);
            console.dir(progressQueue._queue)
            
            // Redirect to load original url
            sendRedirect(response, request.originalRequest.url);
    });
}

function findSourceFile(imageId) {
    // Check files with different types in root image dir
    var possibleFiles = [];
    fileTypes.forEach(function(fileType) {
        possibleFiles.push( settings.imgDir + imageId + '.' + fileType );
    });
    
    var i, fileSrc;
    for(i = 0; i < possibleFiles.length; i++) {
        fileSrc = possibleFiles[i];
        if (fs.existsSync(fileSrc)) {
            return fileSrc;
        }
    }
    
    return null;
}

function send404(response, msg) {
    msg = msg || '404 Not Found';
    response.writeHeader(404, {"Content-Type": "text/plain"});
    response.end(msg + "\n");
}

function send500(response, msg) {
    msg = msg || '500 Internal Server Error';
    response.writeHeader(404, {"Content-Type": "text/plain"});
    response.end(msg + "\n");
}

function sendRedirect(response, url) {
    console.log('redirect', url)
    response.writeHead(302, {
        'Location': url
    });
    response.end();
}

function sendWait(response, url) {
    setTimeout(function() {
        sendRedirect(response, url);
    }, 2000);
}

function prepareCacheDir(dir) {
    var targetDir = settings.cacheDir + path.parse(dir).dir;
    mkdirp.sync(targetDir);
}

var progressQueue = {
    _queue: [],
    
    add: function(url) {
        if (this._queue.indexOf(url) === -1) {
            this._queue.push(url);
            return true;
        }
        return false;
    },
    
    remove: function(url) {
        var index = this._queue.indexOf(url);
        this._queue.splice(index, 1);
    }
    
};

exports.process = process;

