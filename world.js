
function World() {
  this.tiles = [];
};

World.prototype.draw = function(container) {
  for (var i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      this.tiles[i][j].draw(container, i, j);
    }
  }
}
World.prototype.setUpWorldClickHandlers = function() {
 for (var i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      this.tiles[i][j].node.addEventListener("click", this.tileClicked.bind(this, i, j)) 
    }
  }
 
}

World.prototype.tileClicked = function(x, y) {
  alert("you clicked" + x + " ||" + y);
} 
