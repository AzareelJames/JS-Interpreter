const input = document.getElementById("input");
const script = document.getElementById("script");
const path = document.getElementById("path");

input.focus();

function write(txt, color="white"){
    script.innerHTML += `<span style="color: ${color}"><xmp>${txt}</xmp></span>`
}


write("JS interpreter");
write("Welcome to JavaScript interpreter!");
write("Run anything in JS!");
write("--------------------------------------------------");

console.log = x => write(x);
console.info = x => write(x, "cyan");
console.warn = x => write(x, "yellow");
console.error = x => write(x, "red");
console.clear = () => script.innerHTML = "";
console.dir = x => write(x);

let done = false;
const URLParam = new URLSearchParams(window.location.search).get("cmd");

const exec = e => {
    if(e.key !== "Enter") return;

    let cmd;

    if((!done) && URLParam){
        cmd = URLParam;

        done = true;
    }else{
        cmd = String(input.value).trim();
    }

    write(`>>> ${cmd}`, "orange");

    (() => {
        try{
            write(new Function(`return ${cmd}`)(), "gray");
        } catch(E){
            console.error(`Uncaught ${E}`);
        }
    })();
  
    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
    input.focus();
}


input.addEventListener("keydown", exec);

if(URLParam){
    exec({"key": "Enter"});
}
