# Boing
Boing is a Node.js file server based on node-static and ImageMagick. It can server all static files, but excels at images. 
It converts image files into other formats and resizes them to your needs. Generated files are cached for high performance. Boing grants you very highly flexibility in designing routes to your files for SEO or other purposes.

## Setup
TODO

## Configuration
Default configuration is done in ```/app/settings.js```

### Static files
```js
static: {
    srcDir: './src_files/static/',
    targetDir: 'static'
}
```
Place your static files in src_files/static/ to access them through Boing as /static. Boing creates a symlink in the cache directory pointing to the sources.
ON WINDOWS: Make sure you start Boing as Admin, otherwise creating the symlink will result in a permission error.

### Image files
```js
image: {
  srcDir: './src_files/image/',
  requestPatterns: [
    '/img/<width>/<height>/<imgId>.<fileType>',
    '/complex/<width>/<height>/<imgId>-<extent>_<extentColor>.<fileType>',
    '/<width>x<height>/<jpgQuality>/<imgId>--<sometext>.<fileType>',
    {
      pattern: '/preset1/<imgId>.<fileType>',
      preset: {
        width: 500,
        height: 500,
        extent: 'center'
      }
    }
  ]
}
```
srcDir is the directory in which image files can be found. Boing identifies the file by the file name without extension (called ImgID).
In requestPatterns you define routes to your images. Through variables or ```<placeholder>``` you have absolute flexibility in requesting images in different formats and sizes. You can define as many patterns as you like. Boing understands 2 options of patterns: Direct patterns and presets.

### Placeholders
Boing knows following placeholders:
```html
<imgId> (required)       name of image in srcDir (without extension)
<fileType> (required)    png | jpg | gif
<width>                  int in px
<height>                 int in px
<jpgQuality>             int, default = 60
<extent>                 center | no (use with height + width)
<extentColor>            hexadecimal color, e.g. ffffff (use with extent)
```

#### Direct Patterns
Just design your URL as you like using the placeholders. A pattern like ```/img/<width>/<height>/<imgId>.<fileType>``` would match a file like this: ```/img/300/300/someimage.jpg```. Boing would find any image file (someimage.gif, someimage.png or someimage.png), convert it to a 300x300px jpeg file and deliver it to the user.

You can use other undefined placeholders as well for different reasons. You could for example put some SEO keywords, that Boing will ignore in the URL like this: ```/img/<imgId>-<SeoFriendlyImageNameThatBoingWillIgnore>.<fileType>``` and request it like this: ```/img/img147-SEO_friendlyName.jpg```

#### Presets
If your images share certain properties, as the size and you don't need to change those per request, you can use presets. They work as the direct patterns, but you can predefine shared settings for images that follow this pattern.

Example:
```js
{
  pattern: '/preset1/<imgId>.<fileType>',
  preset: {
    width: 500,
    height: 500
  }
}
```
If a user requests ```/preset1/someimage.gif``` Boing would deliver a 500x500px gif file, even if the user did not specify the size.
