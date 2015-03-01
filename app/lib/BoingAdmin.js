module.exports.handle = handle;

var fs = require('fs'),
    settings = require('./../settings').settings;

/**
 * Handle admin requests 
 * @param {BoingRequest} request
 * @param callback
 */
function handle(request, callback) {
    var method = request.match.data.method;
    var params = request.match.data.params;

    if (method in AdminMethods) {
        console.info('ADMIN: ' + method + ' ' + params);
        AdminMethods[method](params, callback);
    }
    else {
        callback(false);
    }
    
}

AdminMethods = {
    clearCache: function(params, callback) {
        var rmdir = require('rimraf');
        rmdir(settings.cacheDir, function(status) {
            if (!status) status = 'ok';
            callback(status);
        });
    }
};