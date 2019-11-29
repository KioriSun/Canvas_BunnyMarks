const Thread = new Worker('wtrial.js')
const canvas = document.createElement("canvas");
let cWidth = canvas.width = 800;
let cHeight = canvas.height = 600;

document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const Bunny = new Image()
Bunny.src = "bunny.png"

canvas.addEventListener("mousedown", (e) => {
    Thread.postMessage("started")


})
Thread.onmessage = (msg) => {
    console.log(msg.data)
    ctx.drawImage(Bunny, 400, 300)
}