function WaterTile() {
  this.passible = true;
  this.frost_ = new Frost();
  this.time = Math.random();
  this.world = null;
  this.frozen = false;
  this.x = 0;
  this.y = 0;
  this.type = "center";
  this.leftmost = false;
  this.rightmost = false;
  this.above_fountain = false;
  
}

WaterTile.prototype.tick = function(delta) {
  this.time += delta;
  if (!this.frozen) {
    var something = Utils.getAnimationStep(this.time, C.animStep, 5) + 1;
    this.node.src = "gfx/" + this.type + something + ".png";
  } 
  this.frost_.tick(delta, this.x, this.y, this.world);
}

WaterTile.prototype.draw = function(container, x, y, world) {
  this.x = x;
  this.y = y;
  this.world = world;
  if (!this.frozen) {
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
  }
  this.leftmost= false;
  this.rightmost = false;
  if (x == 0 || (Utils.getObjectClass(world.tiles[x-1][y]) != "WaterTile" && Utils.getObjectClass(world.tiles[x-1][y]) != "FrozenWaterTile")) {
    this.leftmost = true;
  }
  if (x + 1 == world.tiles.length || (Utils.getObjectClass(world.tiles[x+1][y]) != "WaterTile" && Utils.getObjectClass(world.tiles[x+1][y]) != "FrozenWaterTile")) {
    this.rightmost = true;
  }
  

  this.above_fountain = false;
  if (y + 1 != world.tiles[0].length && (Utils.getObjectClass(world.tiles[x][y + 1]) == "FountainTile"  || Utils.getObjectClass(world.tiles[x][y + 1]) == "FrozenFountainTile") ) {
    this.above_fountain = true;
  }

name = this.determineName();
  Tile.draw(this, container, x, y, name);
}

WaterTile.prototype.determineName = function() {
  name ="";
  if (this.frozen) {
    if (this.above_fountain) {
      name = "fountain_above_frozen.png";
    } else if (this.leftmost) {
      name = "water_left_frozen.png";
    } else if(this.rightmost) {
      name = "water_right_frozen.png"
    } else {
      name = "water_center_frozen.png"
    }
    
  } else {
    if (this.above_fountain) {
      this.type = "fountain_above";
    } else if (this.leftmost) {
      this.type = "water_left";
    } else if (this.rightmost) {
      this.type = "water_right";
    } else {
      this.type = "water_center";
    }

    name = this.type + "1.png";
  }
  return name;
}

WaterTile.prototype.freeze = function() {
  this.passible = false;
  this.frozen = true;
  this.node.src = "gfx/" +  this.determineName();
  this.frost_.start();
}
