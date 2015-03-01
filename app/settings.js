var settings = {
    server: {
        port: 80
    },

    cacheDir: './cache/',

    image: {
        srcDir: './static_img/',
           
        /**
         * Available variables in pattern:
         * - imgId (required)       some string
         * - fileType (required)    png | jpg | gif
         * - width                  int in px
         * - height                 int in px
         * - extent                 center | no (use with height + width)
         * - extentColor            hexadecimal color, e.g. ffffff (use with extent)
         */
        requestPatterns: [
            '/img/<width>/<height>/<imgId>.<fileType>',
            '/complex/<width>/<height>/<imgId>-<extent>_<extentColor>.<fileType>',
            '/<width>/<height>/<imgId>--<sometext>.<fileType>'
        ]
    },
    
    static: {
            
    },
    
    admin: {
        /**
         * Available variables in pattern:
         * - method (required)      some admin method
         * - params (required)      params for method
         */
        requestPatterns: [
            '/admin/<method>/<params>'
        ]
    }
};

exports.settings = settings;


