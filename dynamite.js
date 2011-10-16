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
  if (this.animTime < this.detonationTime) {
    this.actor.tick(delta, world);
    this.node.style.top = this.actor.y * C.size - 20 + 'px';
    this.node.style.left = this.actor.x * C.size - 20 + 'px';
  } else {
    if (this.explosionSound.paused) {
      this.explosionSound.play();
      world.destroy(this.actor.x, this.actor.y);
      this.beepSound.pause();
      this.node.style.left = (this.actor.x + this.actor.width / 2 - 1.5) * C.size +'px';
      this.node.style.top = (this.actor.y + this.actor.height / 2 - 1.5) * C.size + 'px';
      this.node.style.width = 3 * C.size + 'px';
      this.node.style.height = 3 * C.size + 'px';
    }
    this.node.src = 'gfx/big_explosion_' +
       (Utils.getAnimationStep(this.animTime - this.detonationTime,
                               Dynamite.explosionAnimStep, 7)
       + 1) + '.png';
    if (this.explosionSound.ended) {
      world.removeActor(this);
    }
  }
}

Dynamite.explosionAnimStep = 0.43;

Dynamite.prototype.draw = function(container) {
  Tile.draw(this, container, this.actor.x, this.actor.y, 'dynamite.png');
};


