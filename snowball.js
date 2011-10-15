function SnowBall() {
  this.animTime = Math.random();
  this.actor = new Actor();
  this.actor.gravity = 0;
  this.actor.drag = 0;
  this.actor.hitSound = new Audio('sfx/hit3.mp3');
  this.world = null;
}

SnowBall.prototype.touch = function() {
  return false;
};

SnowBall.prototype.accelerate = function(x) {
  this.actor.accelerate(x * SnowBall.speed);
};

SnowBall.prototype.tick = function(delta) {
  this.animTime += delta;
  this.actor.tick(delta, world);
  this.node.style.top = this.actor.y * C.size + Math.random()*3 - 1.5 + 'px';
  this.node.style.left = this.actor.x * C.size + Math.random()*3 - 1.5 + 'px';
  this.node.src = 'gfx/snowball.png';
  this.world.freeze(this.actor.x + delta * this.actor.speed, this.actor.y)
  if (!this.actor.hitSound.paused) {
    this.world.removeActor(this);
  }
};

SnowBall.prototype.draw = function(container) {
  Tile.draw(this, container, this.x, this.y, 'snowball.png');
};

SnowBall.animStep = 0.037;
SnowBall.speed = 100;
