module.exports = BoingRequest;

var settings = require('./../settings').settings;

// Define request types
BoingRequest.TYPE_IMAGE = 'image';
BoingRequest.TYPE_ADMIN = 'admin';

function BoingRequest(request) {
    this.match = {
        'route': '',
        'pattern': '',
        'file': '',
        'data': {}
    };

    this.originalRequest = request;
    this.type = null;
    
    this.matchRoutes = function(patterns, type) {
        var index,
            preset,
            requestUrl = this.originalRequest.url;
        
        for (index in patterns) {
            var reqPattern = patterns[index];
            
            // Check if pattern is string or a defined preset
            if (typeof(reqPattern) == 'object' && 'pattern' in reqPattern && 'preset' in reqPattern) {
                preset = reqPattern;
                reqPattern = preset.pattern;
                var options = preset.preset;
            }

            // Prepare Regex for matching 
            var regexVariables = /<[^>]*>/g,
                variablesInPattern = reqPattern.match(regexVariables);
            var regexRouteStr = reqPattern.replace('.', '\\.');                 // escape dots
            regexRouteStr = regexRouteStr.replace(regexVariables, '(.*)');      // replace variables through valid regex
            var regexRoute = new RegExp('^' + regexRouteStr + '$');

            // See if route matches
            var match = requestUrl.match(regexRoute);

            if (match) {
                var result = {
                    'route': requestUrl,
                    'pattern': reqPattern,
                    'data': {}
                };
                
                // Check if we have preset data
                if (preset) {
                    // Apply options from preset
                    for (var prop in options) {
                        result['data'][prop] = options[prop];
                    }
                }
                
                // Apply options from URL
                for (var i = 0; i < variablesInPattern.length; i++) {
                    var cleanVariableName = variablesInPattern[i].replace(/[<|>]/g, '');
                    result['data'][cleanVariableName] = match[i+1];
                }

                this.match = result;
                this.type = type;
                return true;
            }
        }

        this.match = null;
        return false;
    };

    this.setFile = function() {
        if (this.match) {
            this.match.file = settings.cacheDir + this.match.route;
        }
    };

    
    ///////// Constructor start ////////////
    if (!this.matchRoutes(settings.image.requestPatterns, BoingRequest.TYPE_IMAGE)) {
        this.matchRoutes(settings.admin.requestPatterns, BoingRequest.TYPE_ADMIN)
    }
    
    this.setFile();
}
