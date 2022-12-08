let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvases = document.getElementsByClassName("canvas");

import mergeImages from 'merge-images';

let images = [];
let lastFilename = "";
const sleep = ms => new Promise(r => setTimeout(r, ms));

function makeFileName(){
    let finalName = "";
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let name = `${year}${month}${day}${hours}${minutes}`;
    //check if same name
    if(name == lastFilename){
        finalName = `${year}${month}${day}${hours}${minutes}${seconds}`;
    } else {
        finalName = `${year}${month}${day}${hours}${minutes}`;
    }
    return finalName;

}

function download(dataurl, filename) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = filename;
    link.click();
}

camera_button.addEventListener('click', async function() {
    //get video stream
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

click_button.addEventListener('click', async function() {
    await insertImage();
    mergeImages([
        { src: './images/christmas_background.png', x: 0, y: 0 },
        { src: images[images.length-3], x: 960, y: 155 },
        { src: images[images.length-2], x: 1722, y: 155 },
        { src: images[images.length-1], x: 1040, y: 683 }
      ])
        .then(b64 =>
            //download image
            {document.querySelector('img').src = b64;
            let name = makeFileName();
            download(b64,name);
            lastFilename = name;
        });
    

});

async function insertImage(){
    
    for (var i = 0; i < canvases.length; i++) {
        //display images
        canvases[i].getContext('2d').drawImage(video, 0, 0, canvases[i].width, canvases[i].height);
        let image_data_url = canvases[i].toDataURL('image/png');
        images.push(image_data_url);
   	    // data url of the image
        
           await sleep(1000);
    }
    console.log(images.length);
}