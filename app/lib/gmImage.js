var gm = require('gm').subClass({'imageMagick': true});

gmImage = {
    apply: function(srcFile, data) {
        var magick = gm(srcFile);
        
        // apply width and height
        if (data['width'] && data['height']) {
            magick.resize(data['width'], data['height'])
        }
        else if (data['width']) {
            magick.resize(data['width'])
        }
        else if (data['height']) {
            magick.resize(data['height'])
        }
        
        if (data['extent'] == 'center' && data['width'] && data['height']) {
            magick.gravity('Center');
            magick.extent(data['width'], data['height']);
        }
        
        if (data['extentColor']) {
            magick.background("#" + data['extentColor']);
        }
        
        
        
        return magick;
    }
};

module.exports = gmImage;  