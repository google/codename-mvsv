function ExitTile() {
  this.passible = true;
  this.leftmost = false;
  this.rightmost = false;
  this.topmost = false;
  this.chars = [];
  this.world = null;
}

ExitTile.prototype.actorAction = function(actor) {
  var name = Utils.getObjectClass(actor);
  if (name != "Scientist" && name != "Magician") return;
  var found = false;
  for (var i = 0; i < this.chars.length; i++) {
    if (this.chars[i] == actor) {
      found = true;
      break;
    }
  }
  if (found) return;
  this.chars.push(actor);
  if (this.chars.length == 2) {
    this.world.win();
  }
}

ExitTile.prototype.draw = function(container, x, y, world) {
  this.world = world;
  this.leftmost= false;
  this.rightmost = false;
  if (x == 0 || Utils.getObjectClass(world.tiles[x-1][y]) != "ExitTile") {
    this.leftmost = true;
  }
  if (x + 1 == world.tiles.length || Utils.getObjectClass(world.tiles[x+1][y]) != "ExitTile") {
    this.rightmost = true;
  }
  if (y == 0 ||  Utils.getObjectClass(world.tiles[x][y-1]) != "ExitTile") {
    this.topmost = true;
  }
  name = "";
  if (this.topmost) {
    if (this.leftmost) {
      name = "level_exit_ul.png"
    } else {
      name = "level_exit_ur.png"
    }
  } else { 
    if (this.leftmost) {
      name = "level_exit_ll.png"
    } else {
      name = "level_exit_lr.png"
    }
  }
    
  Tile.draw(this, container, x, y, name);
}
