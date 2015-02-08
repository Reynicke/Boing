var settings = {
    server: {
        port: '80'
    },

    imgDir: './static_img/',
    cacheDir: './cache/',

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
};

exports.settings = settings;


