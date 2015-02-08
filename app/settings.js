var settings = {
    server: {
        port: '80'
    },

    imgDir: './static_img/',
    cacheDir: './cache/',
    
    requestPatterns: [
        '/img/<width>/<height>/<imgId>.<fileType>',
        '/<width>/<height>/<imgId>.<fileType>'
     ]
};

exports.settings = settings;


