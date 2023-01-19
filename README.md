# Titanium Image Cropping Tool (Android)

Android image crop based on: https://github.com/CanHub/Android-Image-Cropper

<img src="assets/screenshot.jpg"/>

For the <b>iOS version</b> have a look at https://github.com/hansemannn/titanium-image-crop

## 📢 Attention:
You have to use a `lifecycleContainer` like this:
```javascript
var ImageCrop = require('ti.imagecrop').createImageCrop({
	lifecycleContainer: win
});
```

## Methods:

* `createImageCrop`
	* Paremeter:
		* lifecycleContainer
		* showCamera: when `showCropDialog` - `image` is empty it will show/hide the camera option
		* showGallery: when `showCropDialog` - `image` is empty it will show/hide the gallery option
		* blob: pass in a blob if use it as a view

* `showCropDialog`
	* Parameters:
		- `image` (String) - path to file; if empty it will show an image picker

* `cropImage`
 * returns blob

You can now use it as a normal View and load a blob in it:
```js
icv = require('ti.imagecrop').createImageCrop({
	width: 300,
	height: 300,
	blob: yourBlob
});
win.add(icv);
```
## Properties

* `rotation`: rotate the crop view

## Events:

* `done`
	* Parameter: `image` (TiBlob) - cropped image
* `cancel`


## Example:

```javascript
const win = Ti.UI.createWindow();
const img = Ti.UI.createImageView({
	top: 90
});
const btn = Ti.UI.createButton({
	title: "crop image (Ti picker)",
	bottom: 0
});
const btn2 = Ti.UI.createButton({
	title: "select image (module picker)",
	bottom: 50
});
const btn3 = Ti.UI.createButton({
	title: "crop image (blob, view)",
	bottom: 100
});

const btnCrop = Ti.UI.createButton({
	top: 40,
	title: "crop",
})
var icv = null;
btnCrop.addEventListener("click", function() {
	if (icv != null) {
		let blob = icv.cropImage();
		img.image = blob;
		img.width = blob.width;
		img.height = blob.height;
		win.remove(icv);
		icv = null;
	}
})
const slider = Ti.UI.createSlider({
	top: 10,
	min: -180,
	max: 180,
	value: 0
})

const ImageCrop = require('ti.imagecrop').createImageCrop({
	lifecycleContainer: win,
	// showCamera: true,
	// showGallery: true
});
ImageCrop.addEventListener("done", function(e) {
	img.image = e.image;
});
ImageCrop.addEventListener("cancel", function(e) {
	alert("cancel");
});


win.add([img, btn, btn2, btn3, btnCrop, slider]);
btn.addEventListener("click", function() {
	Ti.Media.openPhotoGallery({
		success: function(e) {
			// crop image
			ImageCrop.showCropDialog({
				image: e.media.nativePath
			})
		}
	})
})
slider.addEventListener("change", function() {
	if (icv) {
		icv.rotation = slider.value
	}
})
btn2.addEventListener("click", function() {
	// show image picker
	ImageCrop.showCropDialog({})
})


btn3.addEventListener("click", function() {
	// download file and use crop view
	let client = Titanium.Network.createHTTPClient({
		onload: function() {
			icv = require('ti.imagecrop').createImageCrop({
				width: 300,
				height: 300,
				blob: this.responseData
			});
			win.add(icv);
		},
		timeout: 30000
	});
	client.open('GET', 'https://picsum.photos/300/300');
	client.send();
});

win.open();

```

## TODO

`Android-Image-Cropper` has lots of customization options (e.g. disable/allow rotation, predefined ratios).

## Author
Michael Gangolf (<a href="https://github.com/m1ga">@MichaelGangolf</a> / <a href="https://www.migaweb.de">Web</a>)


<span class="badge-buymeacoffee"><a href="https://www.buymeacoffee.com/miga" title="donate"><img src="https://img.shields.io/badge/buy%20me%20a%20coke-donate-orange.svg" alt="Buy Me A Coke donate button" /></a></span>
