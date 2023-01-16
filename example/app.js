const win = Ti.UI.createWindow();
const img = Ti.UI.createImageView({
	top: 0
});
const btn = Ti.UI.createButton({
	title: "crop image (Ti picker)",
	bottom: 0
});
const btn2 = Ti.UI.createButton({
	title: "select image (module picker)",
	bottom: 50
});

const ImageCrop = require('ti.imagecrop').createImageCrop({
	lifecycleContainer: win,
	showCamera: true,
	showGallery: true
});
ImageCrop.addEventListener("done", function(e) {
	img.image = e.image;
});
ImageCrop.addEventListener("cancel", function(e) {
	alert("cancel");
});


win.add([img, btn, btn2]);
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
btn2.addEventListener("click", function() {
	// show image picker
	ImageCrop.showCropDialog({})
})

win.open();
