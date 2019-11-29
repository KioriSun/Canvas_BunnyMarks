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
    Thread.postMessage(["cSize", [cWidth, cHeight, bWidth, bHeight]])
    console.log("loaded")
    Bunny.removeEventListener(...imgEvent);

    canvas.addEventListener("mousedown", (e) => {
        let offsetX = e.offsetX
        let offsetY = e.offsetY
        //Sending inout to genBunnies
        Thread.postMessage(["input", [offsetX, offsetY]])

    })

    requestAnimationFrame(render)
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

    coords = msg.data[0]
    bunnyCount = msg.data[1]
    // ctx.clearRect(0, 0, cWidth, cHeight);
    // for (let i = 0; i < coords.length; i += 2) {
    //     let x = coords[i]
    //     let y = coords[i + 1]
    //     ctx.drawImage(Bunny, x, y)

    // }
    // requestAnimationFrame(render)
}

Thread.onerror = (err) => {
    console.log("from Main:\n" + err)
}

function render(time) {
    Thread.postMessage(["update"])
    requestAnimationFrame(render)

    // console.log("runing")
    Time = time;
    delta = Time - oldTime
    oldTime = Time
    FPS = 1000 / delta
    // dt = delta / 1000
    // console.log(dt.toString())

    //handling fps when n°frames is multiple of framelimit(60), and restart the count
    // if (frame >= frameLimit) {
    //     console.log("this frame is :", frame)
    //     //converting ms to seconds
    //     let frameElapsed = (Time - frameStart) / 1000;
    //     FPS = frameLimit / frameElapsed;
    //     frameStart = Time;
    //     frame = 0;
    //     // console.log("FPS: " + FPS)
    // }


    ctx.clearRect(0, 0, cWidth, cHeight);
    // for (let i = 0; i < coords.length; i += 2) {
    //     let x = coords[i]
    //     let y = coords[i + 1]
    //     ctx.drawImage(Bunny, x, y)

    // }

    // // TBC
    if (coords != null) {
        for (let i = 0; i < coords.length; i += 2) {
            const x = coords[i];
            const y = coords[i + 1];
            ctx.drawImage(Bunny, x, y)
        }

    }


    ctx.fillStyle = "black";
    ctx.font = "3em arial"
    ctx.fillText("Bunnies: " + bunnyCount, 50, 50);
    ctx.fillStyle = "red";
    ctx.font = "2em arial"
    ctx.fillText("FPS :" + FPS.toFixed(0), 80, 80);
    // ctx.drawImage(Bunny, 300, 300)
    frame++;


}

// let Jones = new Worker('worker.js')

// Jones.addEventListener('message', (msg) => {
//     console.log("Main thread received:\n " + msg + ", and \n" + msg.data)
// })

// Jones.postMessage('yahoo!')
