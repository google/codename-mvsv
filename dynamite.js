function Dynamite() {
  this.animTime = 0;
  this.actor = new Actor();
  this.actor.drag = 3;
  this.actor.height = .3;
  this.actor.width = .3;
  this.beepSound = new Audio('sfx/beep.mp3');
  this.explosionSound = new Audio('sfx/explosion.mp3');
  this.detonationTime = Math.random() * 3 + 2;
}

Dynamite.prototype.touch = function() {
  return false;
};

Dynamite.prototype.accelerate = function(x) {
  this.actor.accelerate(x);
};

Dynamite.prototype.tick = function(delta, world) {
  if (this.animTime <= Math.ceil(this.animTime) &&
      this.animTime + delta > Math.ceil(this.animTime) &&
      this.explosionSound.paused) {
    this.beepSound.play();
  }
  this.animTime += delta;
  this.actor.tick(delta, world);
  this.node.style.top = this.actor.y * C.size - 20 + 'px';
  this.node.style.left = this.actor.x * C.size - 20 + 'px';
  if (this.animTime > this.detonationTime) {
    if (this.explosionSound.paused) {
      this.explosionSound.play();
      this.beepSound.pause();
    }
    this.node.src = 'gfx/explosion' +
       (Utils.getAnimationStep(this.animTime - this.detonationTime, Dynamite.explosionAnimStep, 8)
       + 1) + '.png';
    if (this.explosionSound.ended) {
      world.removeActor(this);
      world.destroy(this.actor.x, this.actor.y);
    }
  }
}

Dynamite.explosionAnimStep = 0.43;

Dynamite.prototype.draw = function(container) {
  Tile.draw(this, container, this.actor.x, this.actor.y, 'dynamite.png');
};


