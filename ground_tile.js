function GroundTile() {
  this.passible = false;
}

GroundTile.prototype.draw = function(container, x, y, world) {
  // uncomment following line if you need a default graphic for debugging; otherwise redundant
  // name = "inner_checkers_mid" + (Math.floor(Math.random()*2)+1) + "_continuous.png";

  if (world) {
    var leftmost= false;
    var rightmost = false;
    var topmost = false;
    var bottommost = false;

    if (x == 0 || Utils.getObjectClass(world.tiles[x-1][y]) != "GroundTile") {
      leftmost = true;
    }
    if (x + 1 == world.tiles.length || Utils.getObjectClass(world.tiles[x+1][y]) != "GroundTile") {
      rightmost = true;
    }
    if (y == 0 || Utils.getObjectClass(world.tiles[x][y-1]) != "GroundTile") {
      topmost = true;
    }
    if (y + 1 == world.tiles[x].length || Utils.getObjectClass(world.tiles[x][y+1]) != "GroundTile") {
      bottommost = true;
    }

    if (topmost) {
      if (bottommost) {
	if (leftmost) {
	  if (rightmost) {
	    // single tile
	    name = "ground_checkers_single.png";
	  }
	  else {
	    // left tile of height 1
	    name = "ground_checkers_left.png";
	  }
	}
	else if (rightmost) {
	  // right tile of height 1
	  name = "ground_checkers_right.png";
	}
	else {
	  // middle tile of height 1
	  name = "ground_checkers_mid" + (Math.random() < 0.05 ? "2" : Math.random() < 0.1? "3" : "1") + ".png";
	}
      }
      else { // topmost level, with tiles continuing below
	if (leftmost) {
	  if (rightmost) {
	    // single tile, continuous
	    name = "ground_checkers_single_continuous.png";
	  }
	  else {
	    // left tile, continuous
	    name = "ground_checkers_left_continuous.png";
	  }
	}
	else if (rightmost) {
	  // right tile, continuous
	  name = "ground_checkers_right_continuous.png";
	}
	else {
	  // middle tile, continuous
	    name = "ground_checkers_mid" + (Math.random() < 0.05 ? "2" : Math.random() < 0.1? "3" : "1") +"_continuous.png";
	}
      }
    }

    else { // inner tile
      if (bottommost) {
	if (leftmost) {
	  if (rightmost) {
	    // bottommost tile in a single column
	    name = "inner_checkers_single.png";
	  }
	  else {
	    // left, bottommost inner tile
	    name = "inner_checkers_left.png";
	  }
	}
	else if (rightmost) {
	  // right, bottommost inner tile
	  name = "inner_checkers_right.png";
	}
	else {
	  // bottommost middle tile not at top
          name = "inner_checkers_mid" + (Math.random() < 0.05 ? "2" : "1") + ".png";
	}
      }
      else { // inner level, with tiles continuing below
	if (leftmost) {
	  if (rightmost) {
	    // single column, inner continuous tile
	    name = "inner_checkers_single_continuous.png";
	  }
	  else {
	    // left tile, inner continuous
	    name = "inner_checkers_left_continuous.png";
	  }
	}
	else if (rightmost) {
	  // right tile, inner continuous
	  name = "inner_checkers_right_continuous.png";
	}
	else {
	  // middle tile, inner continuous
	  name = "inner_checkers_mid" + (Math.random() < 0.05 ? "2" : "1") +"_continuous.png";
	}
      }
    }

  }

  Tile.draw(this, container, x, y, name);
}
