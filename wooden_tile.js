function WoodenTile() {
  this.x = 0;
  this.y = 0;
  this.world = null;
  this.fire_ = new Fire(); 
  this.topmost = false;
}

WoodenTile.prototype.fire = function() {
  this.fire_.start();
}

WoodenTile.prototype.draw = function(container, x, y, world) {
  var name = "wall_wood_full.png";
  this.topmost = false;
  this.x = x;
  this.y = y;
  this.world = world;
  if (world) {
    if (y == 0 || Utils.getObjectClass(world.tiles[x][y - 1]) != "WoodenTile" ) {
      this.topmost = true;
    }
    if (this.topmost) {
      name = "wall_wood_top.png";
    }
  }
  Tile.draw(this, container, x, y, name);
}

WoodenTile.prototype.tick = function(delta) {
  this.fire_.tick(delta, this.x, this.y, this.world);
  if (this.fire_.finished && this.fire_.burning) {
    this.fire_.stop();
    this.passible = true;
    if (this.node.src.indexOf('top') == -1) {
      this.node.src = 'gfx/wall_wood_full_burnt.png';
    } else {
      this.node.src = 'gfx/wall_wood_top_burnt.png';
    }
  }
}

