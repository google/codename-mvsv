function WorldCreator() {
  this.tiles = [];
  this.currentTile = null;
  this.world = new World();
  this.world.tiles = [];
  for (var i = 0; i < C.width; ++i) {
    this.world.tiles.push([]);
    for (var j = 0; j< C.height; ++j) {
      this.world.tiles[i].push(new FreeTile());
    }
  }
}

WorldCreator.prototype.draw = function(container) { 
 for (i = 0; i < this.tiles.length ; ++i) {
   this.tiles[i].draw(container, 300, 50 + i*100);
 }
}

WorldCreator.prototype.drawWorld = function(container) { 
 this.world.draw(container);
}

WorldCreator.prototype.setUpWorldCreatorClickHandlers = function() {
 for (var i = 0; i < this.tiles.length; i++) {
      this.tiles[i].node.addEventListener("click", this.creatorTileClicked.bind(this, i)) 
 }
}

WorldCreator.prototype.creatorTileClicked = function(x) {
  this.currentTile = this.tiles[x];
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
