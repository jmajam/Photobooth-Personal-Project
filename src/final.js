const img = document.getElementById("finalPreview");
const end = document.getElementById("end");
const change = document.getElementById("changeTemplate");
const form = document.getElementById("emailForm");

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

let modalBtn = [...document.querySelectorAll(".button")];
modalBtn.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.getAttribute("data-modal");
        document.getElementById(modal).style.display = "block";
    };
});
let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.closest(".modal");
        modal.style.display = "none";
    };
});
window.onclick = function (event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
};

form.addEventListener("submit", function (event) {
    console.log(form.elements["emails"]);
});

getImage();