function FireBall() {
  this.animTime = Math.random();
  this.actor = new Actor();
  this.actor.gravity = 0;
  this.actor.drag = 0;
  this.actor.hitSound = new Audio('sfx/hit3.mp3');
  this.world = null;
}

FireBall.prototype.touch = function() {
  return false;
};

FireBall.prototype.accelerate = function(x) {
  this.actor.accelerate(x * FireBall.speed);
};

FireBall.prototype.tick = function(delta) {
  this.animTime += delta;
  this.actor.tick(delta, world);
  this.node.style.top = this.actor.y * C.size + 'px';
  this.node.style.left = this.actor.x * C.size + 'px';
  this.node.src = 'gfx/firestream' + (
      Utils.getAnimationStep(this.animTime, FireBall.animStep, 4) + 1) + '.png';
  this.world.fire(this.actor.x + delta * this.actor.speed, this.actor.y)
  if (!this.actor.hitSound.paused) {
    this.world.removeActor(this);
  }
};

FireBall.prototype.draw = function(container) {
  Tile.draw(this, container, this.x, this.y, 'firestream1.png');
};

FireBall.animStep = 0.037;
FireBall.speed = 100;
