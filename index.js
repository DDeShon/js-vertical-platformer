const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "red";
ctx.fillRect(200, 100, 100, 100);

function animate() {
  window.requestAnimationFrame(animate);
  console.log("go");
}

animate();
