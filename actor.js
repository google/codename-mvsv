function Actor() {
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.vspeed = 0;
  this.maxSpeed = C.defaultMaxSpeed;
  this.drag = C.defaultDrag;
  this.animTime = 0;
  this.direction = 1;
};

Actor.prototype.touch = function(x, y) {
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
  this.x += this.speed * delta;
  this.vspeed += C.gravity * delta; 
  this.y += this.vspeed * delta; 
  // Don't get out of the world.
  if (Math.ceil(this.x) >= world.tiles.length) {
    this.x = world.tiles.length - 1;
    this.speed = 0;
  }
  if (this.x < 0) {
    this.x = 0;
    this.speed = 0;
  }
  if (Math.ceil(this.y) >= world.tiles[0].length) {
    this.y = world.tiles[0].length - 1;
    this.vspeed = 0;
  }
  if (this.y < 0) {
    this.y = 0;
    this.vspeed = 0;
  }

  if (this.vspeed > 0 && (
      !world.tiles[Math.floor(this.x)][Math.ceil(this.y)].passible ||
      !world.tiles[Math.ceil(this.x)][Math.ceil(this.y)].passible)) {
    this.y = Math.floor(this.y);
    this.vspeed = 0;
  }
  if (this.vspeed < 0 && (
      !world.tiles[Math.floor(this.x)][Math.floor(this.y)].passible ||
      !world.tiles[Math.ceil(this.x)][Math.floor(this.y)].passible)) {
    this.y = Math.ceil(this.y);
    this.vspeed = 0;
  }
  if (this.speed > 0 && (
      !world.tiles[Math.ceil(this.x)][Math.ceil(this.y)].passible ||
      !world.tiles[Math.ceil(this.x)][Math.floor(this.y)].passible)) {
    this.x = Math.floor(this.x);
    this.speed = 0.0001;  // Keep the animation going.
  }
  if (this.speed < 0 && (
      !world.tiles[Math.floor(this.x)][Math.ceil(this.y)].passible ||
      !world.tiles[Math.floor(this.x)][Math.floor(this.y)].passible)) {
     this.x = Math.ceil(this.x);
    this.speed = -0.0001;  // Keep the animation going.
  }
};
