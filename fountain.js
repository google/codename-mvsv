function FountainTile() {
  this.passible = false;
}

FountainTile.prototype.draw = function(container, x, y, world) {
  name = "fountain.png";
  Tile.draw(this, container, x, y, name);
}

function FrozenFountainTile() {
  this.passible = false;
}

FrozenFountainTile.prototype.draw = function(container, x, y, world) {
  name = "fountain_frozen.png";
  Tile.draw(this, container, x, y, name);
}