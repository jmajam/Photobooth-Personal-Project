let img = document.getElementById("finalPreview");
let end = document.getElementById("end");
let change = document.getElementById("changeTemplate");

import {Base64String} from "./compress.js";

end.addEventListener("click",() =>{
    window.location ="booth.html"
})

change.addEventListener("click",() =>{
    window.location ="../index.html"
})

function getImage(){
    let output = sessionStorage.getItem("final");
    let sourceString = Base64String.decompressFromUTF16(output);
    img.src = 'data:image/png;base64,' + sourceString;
}

getImage();