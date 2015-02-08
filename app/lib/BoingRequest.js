var settings = require('./../settings').settings;

function BoingRequest(request) {
    this.match = {
        'route': '',
        'pattern': '',
        'file': '',
        'data': {}
    };

    this.originalRequest = request;
    this.patterns = settings.requestPatterns;

    this.matchRoutes = function() {
        var index,
            requestUrl = this.originalRequest.url;
        for (index in this.patterns) {
            var reqPattern = this.patterns[index],
                regexVariables = /<[^>]*>/g,
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
                for (var i = 0; i < variablesInPattern.length; i++) {
                    var cleanVariableName = variablesInPattern[i].replace(/[<|>]/g, '');
                    result['data'][cleanVariableName] = match[i+1];
                }

                this.match = result;
                return;
            }
        }

        this.match = null;
    };

    this.setFile = function() {
        if (this.match) {
            this.match.file = settings.cacheDir + this.match.route;
        }
    };

    this.matchRoutes();
    this.setFile();
}

module.exports = exports = BoingRequest;