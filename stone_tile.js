function StoneTile() {
}

StoneTile.prototype.draw = function(container, x, y) {
  Tile.draw(this, container, x, y, "bg_gray.png");
}
