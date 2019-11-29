// This one has strings(actually numbers, makes a difference) as identifiers on the copy arrays
const Thread = new Worker('worker.js')
const canvas = document.createElement("canvas");
let cWidth = canvas.width = 800;
let cHeight = canvas.height = 600;

document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const Bunny = new Image()
Bunny.src = "bunny.png"
let bWidth, bHeight



let imgEvent = ["load", () => loadIMG()];
Bunny.addEventListener(...imgEvent);
function loadIMG() {
    //setting bunLimitX/Y
    bWidth = Bunny.width
    bHeight = Bunny.height
    // 1 = canvas size
    const cSize = new Uint16Array([cWidth, cHeight, bWidth, bHeight])
    Thread.postMessage([1, cSize.buffer], [cSize.buffer])
    console.log("loaded")
    Bunny.removeEventListener(...imgEvent);

    canvas.addEventListener("mousedown", (e) => {
        let offsetX = e.offsetX
        let offsetY = e.offsetY
        //Sending inout to genBunnies
        // 0 = input msgs
        const input = new Float32Array([offsetX, offsetY])
        Thread.postMessage([0, input.buffer], [input.buffer])

    })

    // requestAnimationFrame(render)
}







// ctx.fillStyle = "red";
// ctx.fillRect(100, 200, 200, 200)
let Time = 0;
let oldTime = 0;
let dt = 0;
let delta = 0;

let frame = 0;
let frameLimit = 60;
let frameStart = 0;
let FPS = 0;
let grav = 3

let bunnyCount = 0;
let coords = null

Thread.onmessage = (msg) => {

    bunnyCount = msg.data[0]
    coords = new Float32Array(msg.data[1])
    threadRender()
    // requestAnimationFrame(render)
}

Thread.onerror = (err) => {
    console.log("from Main:\n" + err)
}

function threadRender() {

    // Time = new Date().getTime();
    Time = performance.now()
    delta = Time - oldTime;
    oldTime = Time;
    FPS = 1000 / delta


    ctx.clearRect(0, 0, cWidth, cHeight);
    for (let i = 0; i < coords.length; i += 2) {
        let x = coords[i]
        let y = coords[i + 1]
        ctx.drawImage(Bunny, x, y)

    }

    ctx.fillStyle = "black";
    ctx.font = "3em arial"
    ctx.fillText("Bunnies: " + bunnyCount, 50, 50);
    ctx.fillStyle = "red";
    ctx.font = "2em arial"
    ctx.fillText("FPS :" + FPS.toFixed(0), 80, 80);

}

// let Jones = new Worker('worker.js')

// Jones.addEventListener('message', (msg) => {
//     console.log("Main thread received:\n " + msg + ", and \n" + msg.data)
// })

// Jones.postMessage('yahoo!')
