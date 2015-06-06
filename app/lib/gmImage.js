var gm = require('gm').subClass({'imageMagick': true});

gmImage = {
    apply: function(srcFile, data) {
        var magick = gm(srcFile).noProfile();
        
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

        var quality = data['jpgQuality'] || 60;
        magick.quality(quality);
        
        
        
        return magick;
    }
};

module.exports = gmImage;  