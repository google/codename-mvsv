function WoodenTile() {
  this.passible = false;
  this.burning = false;
  this.burned = 0;
  this.x = 0;
  this.y = 0;
  this.world = null;
}

WoodenTile.prototype.fire = function() {
  this.burning = true;
}

WoodenTile.prototype.draw = function(container, x, y, world) {
  var name = "wall_wood_full.png";
  var topmost = false;
  this.x = x;
  this.y = y;
  this.world = world;
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

WoodenTile.prototype.tick = function(delta) {
  if (!this.burning) return;
  this.burned += delta;
  if (this.burned > WoodenTile.timeToSpread &&
      this.y > 1 && this.world[x][y - 1].fire) {
    this.world[x][y - 1].fire();
  }
  if (this.burned > WoodenTile.timeToSpreadSide) {
    if (this.x > 1 && this.world[x - 1][y].fire)
      this.world[x - 1][y].fire();
    if (this.x + 1 < this.world.length && this.world[x + 1][y].fire)
      this.world[x + 1][y].fire();
  }
}

WoodenTile.timeToSpreadUp = 2;
WoodenTile.timeToSpreadSide = 8;
