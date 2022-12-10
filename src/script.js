let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let counter = document.querySelector("#counter");
let output = document.querySelector("#final");


import mergeImages from 'merge-images';

let images = [];
let lastFilename = "";
let canvases = [];
let currentTemplate = JSON.parse(sessionStorage.getItem("template"));

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
    if(name === lastFilename){
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


let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
video.srcObject = stream;
currentTemplate = JSON.parse(sessionStorage.getItem("template"));

click_button.addEventListener('click', async function() {
    await insertImage();
    let modifiedLink = "." + currentTemplate.src;
    await mergeImages([
        { src: modifiedLink, x: 0, y: 0 },
        { src: images[0], x: currentTemplate.locations[0].x, y: currentTemplate.locations[0].y },
        { src: images[1], x: currentTemplate.locations[1].x, y: currentTemplate.locations[1].y },
        { src: images[2], x: currentTemplate.locations[2].x, y: currentTemplate.locations[2].y },
        { src: images[3], x: currentTemplate.locations[3].x, y: currentTemplate.locations[3].y }
      ])
        .then(async b64 =>
            //download image
        {
            //document.querySelector('img').src = b64;
            let name = makeFileName();
            download(b64, name);
            await sessionStorage.setItem("final", b64);
            lastFilename = name;
            images = [];
            await sleep(300);
            window.location ="result.html";
        });
    

});



 async function flash(){
     return new Promise((resolve) => {
         console.log("FLASH");
         video.style.filter = "brightness(400%)";
         setInterval(() => {
             video.style.filter = "brightness(100%)";
         }, 200);
         resolve();
     });

}

 async function countDown(length){
     return new Promise(async (resolve, reject) => {
         let timeleft = length;
         let downloadTimer = setInterval(async function () {
             if (timeleft <= 0) {
                 document.getElementById("counter").innerHTML = "";
                 resolve();
                 clearInterval(downloadTimer);
             } else {
                 document.getElementById("counter").innerHTML = timeleft;
             }
             timeleft -= 1;
         }, 1000);
     });
}




async function insertImage(){
    console.log(currentTemplate);
    counter.style.visibility = "visible";
    let pSizes = currentTemplate.sizes;
    for (let i = 0; i < pSizes.length; i++) {
        //display images
        counter.style.visibility = "visible";
        let canvas = document.createElement("canvas");
        canvas.width = `${pSizes[i].x}`;
        canvas.height = `${pSizes[i].y}`;
        await countDown(5);
        await flash();
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/png');
        images.push(image_data_url);
    }
}

