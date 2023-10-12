const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

class Player {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
  }
}

let y = 100;

function animate() {
  window.requestAnimationFrame(animate);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(200, y, 100, 100);
  y++;
}

animate();
