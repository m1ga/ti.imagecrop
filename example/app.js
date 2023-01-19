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
