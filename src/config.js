//takes in the name of the template with file ext
async function changeTemplate(template){
    let locationPrefix = "../configs/";
    let path = locationPrefix + template;
    let outputJson;
    // fetch(`${path}`).then(response => json = response.json());
    //fetch("../configs").then(response => json = response.json());
    let res = await fetch(`${path}`)
    return res.json();
}







export {changeTemplate};


