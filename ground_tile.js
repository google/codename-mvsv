function GroundTile() {
  this.passible = false;
}

GroundTile.prototype.draw = function(container, x, y, world) {
  name = "wall_checkers_full.png";
  if (world) {
    var leftmost= false;
    var rightmost = false;
    if (x == 0 || Utils.getObjectClass(world.tiles[x-1][y]) != "GroundTile") {
      leftmost = true;
    }
    if (x + 1 == world.tiles.length || Utils.getObjectClass(world.tiles[x+1][y]) != "GroundTile") {
      rightmost = true;
    }
    topmost = false
    if (y == 0 || Utils.getObjectClass(world.tiles[x][y-1]) != "GroundTile") {
      topmost = true;
    } 
    if (topmost) {
      if (leftmost) {
	name = "ground_checkers_left.png";
      } else if(rightmost) {
	name = "ground_checkers_right.png";
      } else {
	name = "ground_checkers_mid" + (Math.floor(Math.random()*2.9999)+1) + ".png";
      }
    } else {
      if (leftmost) {
	name = "wall_checkers_left.png";
      } else if (rightmost) {
	name = "wall_checkers_right.png";
      }
    }
  }
  Tile.draw(this, container, x, y, name);
}
