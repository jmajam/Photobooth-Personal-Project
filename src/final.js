let img = document.getElementById("finalPreview");
let end = document.getElementById("end");
let change = document.getElementById("changeTemplate");

end.addEventListener("click",() =>{
    window.location ="booth.html"
})

change.addEventListener("click",() =>{
    window.location ="../index.html"
})

function getImage(){
    let source = sessionStorage.getItem("final");
    console.log(source);
    img.src = source;
}

getImage();