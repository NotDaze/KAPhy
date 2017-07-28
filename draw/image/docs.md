# Image System Documentation
## Images
This is an object linking image names to KA image URLs. It makes it much easier to find and load images.
## Draw.loadImage(imageName, onLoad)
This loads an image. The first argument is the image name, whereas the second is a function called when the image loads.
## Draw.loadImageSet(imageSet, onFinish)
`imageSet` is an array of strings. For every element of `imageSet`, that image will be loaded. When all images are loaded, `onFinish` will be called. From inside onFinish, `this` will be an array of the loaded images.
## Draw.image(image, x, y, [w, h], [sx, sy, sw, sh])
This draws an image on the canvas. The first five (image, x, y, w, and h) are straightforward. The last four (sx, sy, sw, and sh) are optionally used to specify a section of the image that will actually be used. This can essentially "crop" images.
