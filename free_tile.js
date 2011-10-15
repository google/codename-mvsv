function FreeTile() {
  this.passible = true;
}
FreeTile.prototype.draw = function(container, x, y) {
  Tile.draw(this, container, x, y, "empty.png");
}
