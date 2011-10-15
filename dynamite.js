function Dynamite() {
  this.actor = new Actor();
  this.actor.drag = 3;
  this.actor.height = .3;
  this.actor.width = .3;
}

Dynamite.prototype.touch = function() {
  return false;
};

Dynamite.prototype.accelerate = function(x) {
  this.actor.accelerate(x);
};

Dynamite.prototype.tick = function(delta, world) {
  this.actor.tick(delta, world);
  this.node.style.top = this.actor.y * C.size - 20 + 'px';
  this.node.style.left = this.actor.x * C.size - 20 + 'px';
}

Dynamite.prototype.draw = function(container) {
  Tile.draw(this, container, this.actor.x, this.actor.y, 'dynamite.png');
};
