function WaterTile() {
  this.passible = true;
  this.time = Math.random();
  this.type = "center";
}

WaterTile.prototype.tick = function(delta) {
  var something = Utils.getAnimationStep(this.time, C.animStep, 5) + 1;
  this.time += delta;
  this.node.src = "gfx/" + this.type + something + ".png";
}

WaterTile.prototype.draw = function(container, x, y, world) {
    var leftmost= false;
    var rightmost = false;
    if (x == 0 || Utils.getObjectClass(world.tiles[x-1][y]) != "WaterTile") {
      leftmost = true;
    }
    if (x + 1 == world.tiles.length || Utils.getObjectClass(world.tiles[x+1][y]) != "WaterTile") {
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
    if (y + 1 != world.tiles[0].length && Utils.getObjectClass(world.tiles[x][y + 1]) == "FountainTile" ) {
      above_fountain = true;
    }
    for (var i=0;i<C.neighbours.length; ++i) {
      var tx = x + C.neighbours[i][0];
      var ty = y + C.neighbours[i][1];
      if (tx < 0 || tx >= world.tiles.length) {
	continue;
      }
      if (ty < 0 || ty >= world.tiles[0].length) {
	continue;
      }
      
      if (Utils.getObjectClass(world.tiles[tx][ty]) == "WaterTile") {
	this.time = world.tiles[tx][ty].time;
	break;
      }
    }
  if (above_fountain) {
    this.type = "fountain_above";
  }
  name = this.type + "1.png";
  
  Tile.draw(this, container, x, y, name);
}