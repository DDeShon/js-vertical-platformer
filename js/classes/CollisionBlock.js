class CollisionBlock {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 16;
    this.height = 16;
  }

  draw() {
    if (!this.image) {
      return;
    }
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}
