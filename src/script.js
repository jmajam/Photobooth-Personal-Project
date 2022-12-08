let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas1 = document.querySelector("#canvas1");
let canvases = document.getElementsByClassName("canvas");

import mergeImages from 'merge-images';

let images = [];
const sleep = ms => new Promise(r => setTimeout(r, ms));

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

click_button.addEventListener('click', async function() {
    await insertImage();
    mergeImages([
        { src: images[0], x: 0, y: 0 },
        { src: 'eyes.png', x: 32, y: 0 },
        { src: 'mouth.png', x: 16, y: 0 }
      ])
        .then(b64 => document.querySelector('img').src = b64);
    

});

async function insertImage(){
    
    for (var i = 0; i < canvases.length; i++) {
        canvases[i].getContext('2d').drawImage(video, 0, 0, canvases[i].width, canvases[i].height);
        let image_data_url = canvas1.toDataURL('image/jpeg');
        images.push(image_data_url);
   	    // data url of the image
        
           await sleep(500);
    }
    console.log(images.length);
}