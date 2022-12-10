import {changeTemplate} from './config.js'

let choose = document.getElementById("chooseButton");
let prevImg = document.getElementById("templatePreview");
let templateText = document.getElementById("template");
let confirm = document.getElementById("confirm");

choose.addEventListener('click',async ()=>{
    let url = templateText.value;
    let result = url.replace(/^\s+|\s+$/gm,'');
    let json = await changeTemplate(result);
    prevImg.src = json.src;
    let newString = JSON.stringify(json);
    console.log(newString);
    sessionStorage.setItem("template", newString);
});



confirm.addEventListener('click', ()=>{
    console.log("CHANGING");
    window.location ="../pages/booth.html";
})