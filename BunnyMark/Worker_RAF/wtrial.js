onmessage = (msg) => {
    console.log(msg.data)
    postMessage("go")
}