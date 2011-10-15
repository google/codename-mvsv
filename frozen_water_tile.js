function FrozenWaterTile() {
  this.passible = true;
  this.time = Math.random();
  this.type = "center";
}



FrozenWaterTile.prototype.draw = function(container, x, y, world) {
  var leftmost= false;
  var rightmost = false;
  if (x == 0 || (Utils.getObjectClass(world.tiles[x-1][y]) != "WaterTile" && Utils.getObjectClass(world.tiles[x-1][y]) != "FrozenWaterTile")) {
    leftmost = true;
  }
  if (x + 1 == world.tiles.length || (Utils.getObjectClass(world.tiles[x+1][y]) != "WaterTile" && Utils.getObjectClass(world.tiles[x+1][y]) != "FrozenWaterTile")) {
    rightmost = true;
  }
  if (leftmost) {
    this.type = "water_left";
  } else if (rightmost) {
    this.type = "water_right";
  } else {
    this.type = "water_center";
  }
  above_fountain = false;
  if (y + 1 != world.tiles[0].length && (Utils.getObjectClass(world.tiles[x][y + 1]) == "FountainTile"  || Utils.getObjectClass(world.tiles[x][y + 1]) == "FrozenFountainTile")) {
    above_fountain = true;
  }
  name = "";
  if (above_fountain) {
    name = "fountain_above_frozen.png";
  } else if (leftmost) {
    name = "water_left_frozen.png";
  } else if(rightmost) {
    name = "water_right_frozen.png"
  } else {
    name = "water_center_frozen.png"
  }
  
  Tile.draw(this, container, x, y, name);
}