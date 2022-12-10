let img = document.getElementById("finalPreview");

function getImage(){
    let source = sessionStorage.getItem("final");
    console.log(source);
    img.src = source;
}

getImage();