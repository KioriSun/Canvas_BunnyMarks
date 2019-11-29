const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const Bunny = new Image()
Bunny.src = "bunny.png"


let bunLimX;
let bunLimY;
let bunnyCount = 0;
let bunNum = 100;

let imgEvent = ["load", () => loadIMG()];
Bunny.addEventListener(...imgEvent);
function loadIMG() {
    bunLimX = canvas.width - Bunny.width;
    bunLimY = canvas.height - Bunny.height;
    console.log("loaded")
    Bunny.removeEventListener(...imgEvent);


    canvas.addEventListener("mousedown", (e) => {
        // console.log("canvas " + canvas.width + ", " + canvas.height)
        // console.log("canvasOffset " + canvas.offsetWidth + ", " + canvas.offsetHeight)
        // console.log("e " + e.x + ", " + e.y)
        // console.log("eOffset " + e.offsetX + ", " + e.offsetY)

        let x = bunLimX;
        let y = bunLimY;
        if (e.offsetX < x) x = e.offsetX;
        if (e.offsetY < y) y = e.offsetY;

        for (let i = 0; i < bunNum; i++) {
            let newBunny = new bunny(x, y);
            bunnies.push(newBunny);
            ++bunnyCount;
        }

    })

    requestAnimationFrame(render)
}




let bunnies = []
let randX = 3
let randY = 2

//Bunny obj with randomly assigned dirX,dirY values and directions(signs)
function bunny(x, y) {
    this.x = x;
    this.y = y;
    let signX = Math.random() < 0.5 ? -1 : 1;
    let signY = Math.random() < 0.5 ? -1 : 1;
    this.dy = Math.random() * randX * signX
    this.dx = Math.random() * randY * signY

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


function render(time) {
    // console.log("runing")
    Time = time;
    delta = Time - oldTime
    oldTime = Time
    FPS = 1000 / delta
    // dt = delta / 1000
    // console.log(dt.toString())

    //handling fps when n°frames is multiple of framelimit(60), and restart the count
    // if (frame >= frameLimit) {
    //     console.log(frame)
    //     //converting ms to seconds
    //     let frameElapsed = (Time - frameStart) / 1000;
    //     FPS = frameLimit / frameElapsed;
    //     frameStart = Time;
    //     frame = 0;
    //     // console.log("FPS: " + FPS)
    // }



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "white"
    // ctx.fillRect(0, 0, canvas.width, canvas.height)


    //Loop
    // bunnies.forEach(bun => {
    //     if (bun.x > bunLimX || bun.x < 0) bun.dx *= -1;
    //     if (bun.y > bunLimY || bun.y < 0) bun.dy *= -1;
    //     // bun.y += grav
    //     bun.x += bun.dx
    //     bun.y += bun.dy

    //     ctx.drawImage(Bunny, bun.x, bun.y)


    // })

    for (let i = 0; i < bunnies.length; i++) {
        const bun = bunnies[i];
        if (bun.x > bunLimX || bun.x < 0) bun.dx *= -1;
        if (bun.y > bunLimY || bun.y < 0) bun.dy *= -1;
        // bun.y += grav
        bun.x += bun.dx
        bun.y += bun.dy

        ctx.drawImage(Bunny, bun.x, bun.y)
    }


    ctx.fillStyle = "black";
    ctx.font = "3em arial"
    ctx.fillText("Bunnies: " + bunnyCount, 50, 50);
    ctx.fillStyle = "red";
    ctx.font = "2em arial"
    ctx.fillText("FPS :" + FPS.toFixed(0), 80, 80);
    // ctx.drawImage(Bunny, 300, 300)
    frame++;

    requestAnimationFrame(render)
}


