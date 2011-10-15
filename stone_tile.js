function StoneTile() {
  this.passible = false;
}

StoneTile.prototype.draw = function(container, x, y, world) {
  name = "wall_stone_full.png";
  Tile.draw(this, container, x, y, name);
}
