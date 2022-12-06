let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas1 = document.querySelector("#canvas1");
let canvases = document.getElementsByClassName("canvas");

const sleep = ms => new Promise(r => setTimeout(r, ms));

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

click_button.addEventListener('click', function() {
    insertImage();
});

async function insertImage(){
    
    for (var i = 0; i < canvases.length; i++) {
        canvases[i].getContext('2d').drawImage(video, 0, 0, canvases[i].width, canvases[i].height);
        let image_data_url = canvas1.toDataURL('image/jpeg');

   	    // data url of the image
   	    console.log(image_data_url);
           await sleep(3000);
    }
}