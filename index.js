const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const gravity = 0.5;

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionBlocks,
  imageSrc: "./img/warrior/Idle.png",
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: "./img/warrior/Idle.png",
      frameRate: 8,
      frameBuffer: 3,
    },
    IdleLeft: {
      imageSrc: "./img/warrior/IdleLeft.png",
      frameRate: 8,
      frameBuffer: 3,
    },
    Run: {
      imageSrc: "./img/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    RunLeft: {
      imageSrc: "./img/warrior/RunLeft.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: "./img/warrior/Jump.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: "./img/warrior/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: "./img/warrior/Fall.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: "./img/warrior/FallLeft.png",
      frameRate: 2,
      frameBuffer: 3,
    },
  },
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

function animate() {
  window.requestAnimationFrame(animate);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(4, 4);
  ctx.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  collisionBlocks.forEach((CollisionBlock) => {
    CollisionBlock.update();
  });
  platformCollisionBlocks.forEach((CollisionBlock) => {
    CollisionBlock.update();
  });
  player.update();

  // animate player movement left/right
  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.switchSprite("Run");
    player.velocity.x = 2;
    player.lastDirection = "right";
  } else if (keys.a.pressed) {
    player.switchSprite("RunLeft");
    player.velocity.x = -2;
    player.lastDirection = "left";
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") {
      player.switchSprite("Idle");
    } else {
      player.switchSprite("IdleLeft");
    }
  }

  // animate player jumps
  if (player.velocity.y < 0) {
    if (player.lastDirection === "right") {
      player.switchSprite("Jump");
    } else {
      player.switchSprite("JumpLeft");
    }
  } else if (player.velocity.y > 0) {
    if (player.lastDirection === "right") {
      player.switchSprite("Fall");
    } else {
      player.switchSprite("FallLeft");
    }
  }

  ctx.restore();
}

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -8;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      player.switchSprite("Idle");
      keys.d.pressed = false;
      break;
    case "a":
      player.switchSprite("IdleLeft");
      keys.a.pressed = false;
      break;
  }
});
