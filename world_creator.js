function WorldCreator() {
  this.tiles = [];
  this.players = [];
  this.currentTile = null;
  this.world = new World();
  this.world.tiles = [];
  this.scientist = null;
  this.magician = null;
  for (var i = 0; i < C.width; ++i) {
    this.world.tiles.push([]);
    for (var j = 0; j< C.height; ++j) {
      this.world.tiles[i].push(new FreeTile());
    }
  }
}

WorldCreator.prototype.draw = function(container) { 
 for (i = 0; i < this.tiles.length ; ++i) {
   this.tiles[i].draw(container, 1, 1, this.world);
 }
 for (var i = 0; i < this.players.length; ++i) {
   this.players[i].draw(container, 300,  50 + + this.tiles.length*100 + i*100, this.world);
 }
 if (this.scientist) {
  this.scientist.draw(container);
 }
 if (this.magician) {
  this.magician.draw(container);
 }
}

WorldCreator.prototype.drawWorld = function(container) { 
 this.world.draw(container);
}

WorldCreator.prototype.setUpWorldCreatorClickHandlers = function() {
  this.world.draw(container);
 for (var i = 0; i < this.tiles.length; i++) {
   this.tiles[i].node.addEventListener("click", this.creatorTileClicked.bind(this, i)) 

 }
 for (var i = 0; i < this.players.length; ++i) {
   this.players[i].node.addEventListener("click", this.creatorPlayerClicked.bind(this, i))
 }
}

WorldCreator.prototype.creatorTileClicked = function(x) {
  this.currentTile = this.tiles[x];
} 

WorldCreator.prototype.creatorPlayerClicked = function(x) {
  if (x == 1) {
    this.currentTile = "scientist";
  } else {
    this.currentTile = "magician";
  }
} 

WorldCreator.prototype.getWorldRepr = function() {
  var rows = [];
  for (var i = 0; i < this.world.tiles.length; i++) {
    var cells = [];
    for (var j = 0; j < this.world.tiles[i].length; j++ ) {
      var cell = "new " + Utils.getObjectClass(this.world.tiles[i][j]) +"()";
      cells.push(cell);
    }
    rows.push("[" + cells.join(", ") + "]");
  }
  return "[" + rows.join(", ") + "]";
};
