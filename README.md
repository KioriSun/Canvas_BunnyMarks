# Canvas_BunnyMarks
Many rendering and performance tests around canvas_2d api for the web.

SingleThread - Uses regular RAF(requestAnimationFrame) all in one script.
<br/>Worker_RAF - Uses a mix of worker logic, with the final calculations and rendering done through RAF.
<br/>Worker_stivl - Uses a full typed array system, moving the data around for maximum speed.
<br/>Worker_stivl_i - trades some speed for a light ease of use with the typedArrays + number ids(could have been strings, but I noticed performance penalties from that, needs further testing)
