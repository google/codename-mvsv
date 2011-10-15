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
  if (Math.ceil(this.x) >= world.tiles.length ||
      !world.tiles[Math.ceil(this.x)][Math.floor(this.y)].passible) {
    this.x = Math.floor(this.x);
    this.speed = 0;
  }
  if (Math.floor(this.x) < 0 ||
      !world.tiles[Math.floor(this.x)][Math.floor(this.y)].passible) {
    this.x = Math.ceil(this.x);
    this.speed = 0;
  }

  this.vspeed += C.gravity; 
  this.y += this.vspeed; 
  if (Math.ceil(this.y) >= world ||
      !world.tiles[Math.floor(this.x)][Math.ceil(this.y)].passible) {
    this.y = Math.floor(this.y);
    
};
