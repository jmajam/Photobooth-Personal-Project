let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let output = document.querySelector("#final");


import mergeImages from 'merge-images';

let images = [];
let lastFilename = "";
let canvases = [];
let currentTemplate;

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
    currentTemplate = JSON.parse(sessionStorage.getItem("template")); 
});

click_button.addEventListener('click', async function() {
    await insertImage();
    let modifiedLink = "." + currentTemplate.src;
    mergeImages([
        { src: modifiedLink, x: 0, y: 0 },
        { src: images[0], x: currentTemplate.locations[0].x, y: currentTemplate.locations[0].y },
        { src: images[1], x: currentTemplate.locations[1].x, y: currentTemplate.locations[1].y },
        { src: images[2], x: currentTemplate.locations[2].x, y: currentTemplate.locations[2].y }
      ])
        .then(b64 =>
            //download image
            {document.querySelector('img').src = b64;
            let name = makeFileName();
            download(b64,name);
            lastFilename = name;
            images = [];
        });
    

});

async function insertImage(){
    console.log(currentTemplate);
    let pSizes = currentTemplate.sizes;
    // pSizes = pSizes.reverse();
    
    for (var i = 0; i < pSizes.length; i++) {
        //display images
        let canvas = document.createElement("canvas");
        canvas.width = `${pSizes[i].x}`;
        canvas.height = `${pSizes[i].y}`;
        console.log(canvas.width);
        console.log(canvas.height);
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/png');
        images.push(image_data_url);
   	    // data url of the image
           await sleep(1000);
    }
}

output.src = "../images/christmas_background.png";