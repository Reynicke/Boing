var settings = {
    server: {
        port: 80
    },

    cacheDir: './cache/',

    image: {
        srcDir: './src_files/image/',
           
        /**
         * Available variables in pattern:
         * - imgId (required)       name of image in srcDir (without extension)
         * - fileType (required)    png | jpg | gif
         * - width                  int in px
         * - height                 int in px
         * - extent                 center | no (use with height + width)
         * - extentColor            hexadecimal color, e.g. ffffff (use with extent)
         */
        requestPatterns: [
            '/img/<width>/<height>/<imgId>.<fileType>',
            '/complex/<width>/<height>/<imgId>-<extent>_<extentColor>.<fileType>',
            '/<width>x<height>/<imgId>--<sometext>.<fileType>',
            {
                pattern: '/preset1/<imgId>.<fileType>',
                preset: {
                     width: 500,
                     height: 500,
                     extent: 'center'
                }
            }
        ]
    },
    
    static: {
        srcDir: './src_files/static/',
        targetDir: 'static'
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


