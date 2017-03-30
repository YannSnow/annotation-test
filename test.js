window.onload = function() {
	//document.getElementById('go').addEventListener('click', loadPredefinedPanorama, false);

	document.getElementById('pano').addEventListener('change', upload, false);
	//document.getElementById('generate').onclick = function () {saveFile()};
	

};



// Load a panorama stored on the user's computer
function upload() {
	// Retrieve the chosen file and create the FileReader object
	var file = document.getElementById('pano').files[0];
	var reader = new FileReader();

	reader.onload = function() {
		PSV = new PhotoSphereViewer({
			// Panorama, given in base 64
			panorama: reader.result,

			// Container
			container: 'your-pano',

			// Deactivate the animation
			time_anim: false,

			// Display the navigation bar
			navbar: true,

			// Resize the panorama
			size: {
				width: '900px',
				height: '700px'
			},

			// No XMP data
			usexmpdata: false,

			inputname: file.name

		});
	};
	reader.readAsDataURL(file);

	//console.log(reader.readyState);
}


// function saveFile() {
// 	console.log(PSV);
// 	// PSV.deletetst(1);
// 	var f = PSV.getOutput();
// }

// Yep, an ugly global variable (to make tests with the console)
var PSV;
