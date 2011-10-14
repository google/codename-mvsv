
var world_creator = new WorldCreator();
creator_container = document.getElementById("world_creator")
container = document.getElementById("world")
world_creator.tiles = [new WoodenTile(), new StoneTile(), new FreeTile()]
world_creator.draw(creator_container);
world_creator.drawWorld(container);

World.prototype.setUpWorldClickHandlers = function() {
 for (var i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      this.tiles[i][j].node.addEventListener("click", this.tileClicked.bind(this, i, j)) 
    }
  }
}

World.prototype.tileClicked = function(x, y) {
  if (world_creator.currentTile) {
    this.tiles[x][y] = world_creator.currentTile;
    this.tiles[x][y].draw(container, x, y);
  }
  for (var i = 0; i < this.actors.length; i++) {
    this.actors[i].draw(container);
  }
} 

world_creator.setUpWorldCreatorClickHandlers();
world_creator.world.setUpWorldClickHandlers();



