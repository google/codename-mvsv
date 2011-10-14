function Actor() {
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.maxSpeed = C.defaultMaxSpeed;
  this.drag = C.defaultDrag;
};

Actor.prototype.accelerate = function(x) {
  this.speed += x;
  if (this.speed > this.maxSpeed) {
    this.speed = this.maxSpeed;
  }
  if (this.speed < -this.maxSpeed) {
    this.speed = -this.maxSpeed;
  }
};

Actor.prototype.tick = function(delta) {
  this.x += this.speed / delta;
  if (this.speed > this.drag / delta) {
    this.speed -= this.drag / delta;
  } else if (this.speed < -this.drag / delta) {
    this.speed += this.drag / delta;
  } else {
    this.speed = 0;
  }
};
