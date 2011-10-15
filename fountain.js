function FountainTile() {
  this.passible = false;
  this.frost_ = new Frost();
  this.frozen = false;
  this.x = 0;
  this.y = 0;
  this.world = null;
}

FountainTile.prototype.draw = function(container, x, y, world) {
  this.x = x;
  this.y = y;
  this.world = world;
  if (!this.frozen) {
    name = "fountain.png";
  } else {
    name = "fountain_frozen.png";
  }
  Tile.draw(this, container, x, y, name);
}
FountainTile.prototype.tick = function(delta) {
  this.frost_.tick(delta, this.x, this.y, this.world);
}

FountainTile.prototype.freeze = function() {
  this.frozen = true;
  this.node.src = "gfx/fountain_frozen.png";
  this.frost_.start();
}