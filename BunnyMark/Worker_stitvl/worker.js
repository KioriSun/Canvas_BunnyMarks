// self.addEventListener('message', (msg) => {
//     console.log("worker received:\n " + msg + ", and \n" + msg.data)
//     self.postMessage(msg.data + " is pretty cool")
// })

onmessage = (msg) => {
    let item = new Float32Array(msg.data), type = item[0]

    switch (type) {
        // "input"
        case 0:
            genBunnies(item[1], item[2]);
            break;
        // "Canvas Size"
        case 1:
            setBunLim(item[1], item[2], item[3], item[4]);
            break;
        // case "update":
        //     bunUpdate()
        //     break;
    }
}
onerror = (err) => {
    console.log("from Thread:\n" + err)
}



let bunLimX;
let bunLimY;
let bunnyCount = 0;
let bunNum = 100;
let bunnies = []
let randX = 3
let randY = 2

function bunny(x, y) {
    this.x = x;
    this.y = y;
    let signX = Math.random() < 0.5 ? -1 : 1;
    let signY = Math.random() < 0.5 ? -1 : 1;
    this.dy = Math.random() * randX * signX
    this.dx = Math.random() * randY * signY

}

function setBunLim(cWidth, cHeight, bWidth, bHeight) {
    bunLimX = cWidth - bWidth;
    bunLimY = cHeight - bHeight;
}

function genBunnies(offsetX, offsetY) {
    let x = bunLimX;
    let y = bunLimY;
    if (offsetX < x) x = offsetX;
    if (offsetY < y) y = offsetY;

    for (let i = 0; i < bunNum; i++) {
        let newBunny = new bunny(x, y);
        bunnies.push(newBunny);
        ++bunnyCount;
    }

}

let coords = []
function bunUpdate() {
    // if (new Date().getTime() - startTime > 10000) clearInterval(runner)
    coords = []
    for (let i = 0; i < bunnies.length; i++) {
        const bun = bunnies[i];
        if (bun.x > bunLimX || bun.x < 0) bun.dx *= -1;
        if (bun.y > bunLimY || bun.y < 0) bun.dy *= -1;
        // bun.y += grav
        bun.x += bun.dx
        bun.y += bun.dy
        coords.push(bun.x, bun.y)
    }

    const array = new Float32Array([bunnyCount, ...coords])
    postMessage(array.buffer, [array.buffer])
}

// var startTime = new Date().getTime();
let runner = setInterval(bunUpdate, 1000 / 60)

// function sendCoords() {
//     // let coords = []
//     for (let i = 0; i < bunies.length; i++) {
//         const bun = bunies[i];
//         coords.push(bun.x, bun.y)
//     }

//     postMessage(coords)
// }











