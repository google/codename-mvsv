function FireBall() {
  this.animTime = Math.random();
  this.actor = new Actor();
  this.actor.gravity = 0;
  this.actor.drag = 0;
  this.actor.width = 12/32.0;
  this.actor.height = 12/32.0;
  this.actor.hitSound = new Audio('sfx/hit3.mp3');
  this.sizzlingSound = new Audio('sfx/sizzling.mp3');
  this.world = null;
}

FireBall.prototype.touch = function() {
  return false;
};

FireBall.prototype.accelerate = function(x) {
  this.actor.accelerate(x * FireBall.speed);
};

FireBall.prototype.water = function() {
  this.world.removeActor(this);
  this.sizzlingSound.play();
};

FireBall.prototype.tick = function(delta, world) {
  this.animTime += delta;
  this.actor.tick(delta, world);
  this.node.style.top = this.actor.y * C.size - 10 + 'px';
  this.node.style.left = this.actor.x * C.size - 10 + 'px';
  this.node.src = 'gfx/firestream' + (
      Utils.getAnimationStep(this.animTime, FireBall.animStep, 4) + 1) + '.png';
  var used = this.world.fire(
    this.actor.x, this.actor.y,
    this.actor.x + this.actor.width, this.actor.y + this.actor.height);
  if (used) this.actor.hitSound.play();
  if (!this.actor.hitSound.paused) {
    this.world.removeActor(this);
  }
  if (!(Math.round(this.actor.x) < world.tiles.length &&
        Math.round(this.actor.y) < world.tiles[0].length))
    return;
  var tile = world.tiles[Math.round(this.actor.x)][Math.round(this.actor.y)];
  if (tile.actorAction) {
    tile.actorAction(this);
  }
};

FireBall.prototype.draw = function(container) {
  Tile.draw(this, container, this.actor.x, this.actor.y, 'firestream1.png');
};

FireBall.animStep = 0.037;
FireBall.speed = 100;
