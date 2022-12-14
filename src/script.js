let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let counter = document.querySelector("#counter");

import mergeImages from 'merge-images';
import {Base64String} from "./compress.js";

let images = [];
let lastFilename = "";
let currentTemplate = JSON.parse(sessionStorage.getItem("template"));

const sleep = ms => new Promise(r => setTimeout(r, ms));

function makeFileName(){
    lastFilename = sessionStorage.getItem("lastFile");
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
    let input = genMergeArg(images,currentTemplate);
    await mergeImages(input).then(async b64 =>
        {
            let name = makeFileName();
            download(b64, name);
            await compressSetImage(b64,name);
            lastFilename = name;
            images = [];
            await sleep(300);
            window.location ="result.html";
        });
});

//generates array for mergeImages to use
function genMergeArg(imageList,currentTemplate){
    let modifiedLink = "." + currentTemplate.src;
    //starts with the template image
    let sources = [{src: modifiedLink, x: 0, y: 0}];
    for (let i = 0; i < imageList.length; i++){
        let imageArg = { src: images[i], x: currentTemplate.locations[i].x, y: currentTemplate.locations[i].y };
        sources.push(imageArg);
    }
    return sources;
}
//takes the b64 image and compresses it for files larger than 4.8mb~~(too big for sessionStorage)
async function compressSetImage(b64,name){
    let raw64 = b64.replace('data:image/png;base64,', '');
    let compressed = Base64String.compressToUTF16(raw64);
    sessionStorage.setItem("lastFile",name);
    sessionStorage.setItem("final", compressed);
}

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

