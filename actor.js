function Actor() {
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.vspeed = 0;
  this.maxSpeed = C.defaultMaxSpeed;
  this.drag = C.defaultDrag;
  this.gravity = C.gravity;
  this.animTime = 0;
  this.direction = 1;
  this.width = 0.999;
  this.height = 0.95;
  this.crashed = false;
  this.hitSound = new Audio('sfx/hit.mp3');
};

Actor.prototype.touch = function(x, y, x1, y1) {
  if (!!x1 && !!y1) {
    return (((this.x < x && x < this.x + this.width) ||
             (this.x < x1 && x1 < this.x + this.width) ||
             (x < this.x && this.x < x1) ||
             (x < this.x +this.width && this.x + this.width < x1)) &&
            ((this.y < y && y < this.y + this.height) ||
             (this.y < y1 && y1 < this.y + this.height) ||
             (y < this.y && this.y < y1) ||
             (y < this.y +this.height && this.y + this.height < y1)));
  }
  return Math.abs(this.x - x) + Math.abs(this.y - y) < 1;
}

Actor.prototype.accelerate = function(x) {
  this.speed += x;
  if (this.speed > this.maxSpeed) {
    this.speed = this.maxSpeed;
  }
  if (this.speed < -this.maxSpeed) {
    this.speed = -this.maxSpeed;
  }
  if (this.speed < 0) this.direction = -1;
  if (this.speed > 0) this.direction = 1;
};

Actor.prototype.tick = function(delta, world) {
  this.animTime += delta;
  if (this.speed > this.drag * delta) {
    this.speed -= this.drag * delta;
  } else if (this.speed < -this.drag * delta) {
    this.speed += this.drag * delta;
  } else {
    this.speed = 0;
  }
  var lastSpeed = Math.abs(this.speed) + Math.abs(this.vspeed);
  var x = this.x;
  var y = this.y;
  this.x += this.speed * delta;
  this.vspeed += this.gravity * delta;
  fallingSpeed = Math.abs(this.vspeed);
  this.y += this.vspeed * delta;
  var colided = false;
  // Don't get out of the world.
  if (Math.floor(this.x + this.width) >= world.tiles.length) {
    this.x = world.tiles.length - this.width - 0.0001;
    colided = true;
    this.speed = 0;
  }
  if (this.x < 0) {
    this.x = 0;
    colided = true;
    this.speed = 0;
  }
  if (Math.floor(this.y + this.height) >= world.tiles[0].length) {
    this.y = world.tiles[0].length - this.height - 0.0001;
    colided = true;
    this.vspeed = 0;
  }
  if (this.y < 0) {
    this.y = 0;
    colided = true;
    this.vspeed = 0;
  }

  if (this.speed > 0 && (
      !world.tiles[Math.floor(this.x + this.width)][
          Math.floor(y + this.height)].passible &&
      !world.tiles[Math.floor(this.x + this.width)][Math.floor(y)].passible)) {
    this.x = Math.ceil(this.x) - this.width - 0.0001;
    colided = true;
    this.speed = 0.0001;  // Keep the animation going.
  }
  if (this.speed < 0 && (
      !world.tiles[Math.floor(this.x)][Math.floor(y + this.height)].passible &&
      !world.tiles[Math.floor(this.x)][Math.floor(y)].passible)) {
    this.x = Math.ceil(this.x) + 0.0001;
    colided = true;
    this.speed = -0.0001;  // Keep the animation going.
  }
  if (this.vspeed > 0 && (
      !world.tiles[Math.floor(this.x)][Math.floor(this.y + this.height)].passible ||
      !world.tiles[Math.floor(this.x + this.width)][Math.floor(this.y + this.height)].passible)) {
    this.y = Math.ceil(this.y) - this.height - 0.0001;
    colided = true;
    this.vspeed = 0;
  }
  if (this.vspeed < 0 && (
      !world.tiles[Math.floor(this.x)][Math.floor(this.y)].passible ||
      !world.tiles[Math.floor(this.x + this.width)][Math.floor(this.y)].passible)) {
    this.y = Math.ceil(this.y) + 0.0001;
    colided = true;
    this.vspeed = 0;
  }
  if (this.speed > 0 && (
      !world.tiles[Math.floor(this.x + this.width)][
          Math.floor(this.y + this.height)].passible &&
      !world.tiles[Math.floor(this.x + this.width)][Math.floor(this.y)].passible)) {
    this.x = Math.ceil(this.x) - this.width - 0.0001;
    colided = true;
    this.speed = 0.0001;  // Keep the animation going.
  }
  if (this.speed < 0 && (
      !world.tiles[Math.floor(this.x)][Math.floor(this.y + this.height)].passible &&
      !world.tiles[Math.floor(this.x)][Math.floor(this.y)].passible)) {
    this.x = Math.ceil(this.x) + 0.0001;
    colided = true;
    this.speed = -0.0001;  // Keep the animation going.
  }
  if (colided && fallingSpeed > C.killingFallSpeed) {
    this.crashed = true;
  }
  if (Math.abs(this.speed) + Math.abs(this.vspeed) < 0.1 && colided &&
      lastSpeed > 0.1 && (this.hitSound.ended || this.hitSound.paused)) {
    this.hitSound.play()
  }
};
