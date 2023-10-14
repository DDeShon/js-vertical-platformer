const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 100;
    this.height = 100;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

const player = new Player({
  x: 0,
  y: 0,
});

const player2 = new Player({
  x: 150,
  y: 0,
});

function animate() {
  window.requestAnimationFrame(animate);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  player2.update();
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      player.velocity.x = 1;
      break;
    case "a":
      player.velocity.x = -1;
      break;
    case "w":
      player.velocity.y = -10;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      player.velocity.x = 0;
      break;
    case "a":
      player.velocity.x = 0;
      break;
  }
});
