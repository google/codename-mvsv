function WoodenTile() {
  this.passible = false;
}

WoodenTile.prototype.draw = function(container, x, y, world) {
  var name = "wall_wood_full.png";
  var topmost = false;
  if (world) {
    if (y == 0 || Utils.getObjectClass(world.tiles[x][y - 1]) != "WoodenTile" ) {
      topmost = true;
    }
    if (topmost) {
      name = "wall_wood_top.png";
    }
  }
  Tile.draw(this, container, x, y, name);
}
