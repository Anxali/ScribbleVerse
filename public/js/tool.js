// connect to socket server
const socket = io.connect("https://scribbleverse.onrender.com");
// ----------Basic Setup
const board = document.querySelector(".board");
board.height = window.innerHeight;
board.width = window.innerWidth;
// canvasRenderingContext2d=> tool
const ctx = board.getContext("2d");
ctx.strokeStyle = "white";
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
ctx.imageSmoothingQuality = "high";
ctx.lineWidth = 3;

// ************************Change Size**************************//
function sizeChange(value) {
  ctx.lineWidth = value;
  socket.emit("size", value);
}

// **tool Change***************************************************//
function handleLocaltoolChange(tool) {
  handleToolChange(tool);
  if (tool != "sticky");
  socket.emit("toolchange", tool);
}
// ******************handle color****************************
function handleColorChange(color) {
  ctx.strokeStyle = color;
  socket.emit("color", color);
}

const slider = document.querySelector(".slider");
const toolPanel = document.querySelector(".toolPanel");
slider.addEventListener("click", function () {
  handleslider()
  socket.emit("slider");
});
