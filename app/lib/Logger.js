

var fs = require('fs'),
    mkdirp = require('mkdirp'),
    settings = require('./../settings').settings;


var Logger = {
    
    logAccess: function(statusCode, url, size) {
        var sizeKb = size ? (size / 1024) + ' kb' : '';
        var seperator = '\t';
        
        var text = url + seperator + statusCode + seperator + sizeKb + '\r\n';
        var fileName = settings.logs.access;
              
        fs.appendFile(fileName, text, function(err) {
            if(err) {
                console.error(err);
            }
        });
    },
    
    _createFile: function(file) {
        mkdirp.sync(file);
    }
    
};

module.exports = Logger;