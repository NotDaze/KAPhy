# Image System Documentation
## Images
This is an object linking image names to KA image URLs. It makes it much easier to find and load images.
## Draw.loadImage(imageName, onLoad)
This loads an image. The first argument is the image name, whereas the second is a function called when the image loads.
## Draw.loadImageSet(image1, image2..., [onFinish])
This loads a set of images. If onFinish is specified, it calls onFinish when all of the images are loaded. In onFinish(), `this` will represent an array of the loaded images.
## Draw.image(image, x, y, w, h, sx, sy, sw, sh)
This draws an image on the canvas. The first five (image, x, y, w, h) are straightforward. The last four (sx, sy, sw, sh) are optionally used to specify a section of the image that will actually be used.
