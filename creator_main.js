
var world_creator = new WorldCreator();
creator_container = document.getElementById("world_creator")
container = document.getElementById("world")
world_creator.tiles = [new WoodenTile(), new StoneTile(), new GroundTile(), new FreeTile()]
world_creator.players = [new MagicianTile(), new ScientistTile()];
world_creator.draw(creator_container);
world_creator.drawWorld(container);

World.prototype.setUpWorldClickHandlers = function() {
 for (var i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      this.tiles[i][j].node.addEventListener("mousedown", this.tileClicked.bind(this, i, j)) 
      this.tiles[i][j].node.addEventListener("mouseover", this.tileOver.bind(this, i, j))
    }
  }
}

World.prototype.tileOver = function(x, y, e) {  
  if (e.which != 0) {
    this.tileClicked(x, y, e);
  }
}

World.prototype.tileClicked = function(x, y, e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.cancelBubble != null) e.cancelBubble = true;
  if (e.preventDefault) e.preventDefault();
  if (world_creator.currentTile) {
    if ( Utils.getObjectClass(world_creator.currentTile) == "String") {
      if (world_creator.currentTile == "magician") {
	if (!world_creator.magician) {
	  world_creator.magician = new Magician();
	}
	world_creator.magician.actor.x = x;
	world_creator.magician.actor.y = y;
	world_creator.magician.draw(container);
      }else {
	if (!world_creator.scientist) {
	  world_creator.scientist = new Scientist();
	}
	world_creator.scientist.actor.x = x;
	world_creator.scientist.actor.y = y;
	world_creator.scientist.draw(container);
      }
      
    } else {
      if (Utils.getObjectClass(this.tiles[x][y]) !=
          Utils.getObjectClass(world_creator.currentTile)) {
        this.tiles[x][y] = world_creator.currentTile;
        this.tiles[x][y].draw(container, x, y, this);
      }
    }
  }
/*  for (var i = 0; i < this.actors.length; i++) {
    this.actors[i].draw(container);
  }*/
} 

world_creator.setUpWorldCreatorClickHandlers();
world_creator.world.setUpWorldClickHandlers();

creator_container.appendChild(document.createElement("br"));
var save_button = document.createElement("button");
save_button.appendChild(document.createTextNode("Save"));
creator_container.appendChild(save_button);
save_button.addEventListener("click", function() {
  var save = document.getElementById("save-text");
  save.innerHTML = "";
  save.appendChild(document.createTextNode(
      world_creator.getWorldRepr()));
  });

var load_button = document.createElement("button");
load_button.appendChild(document.createTextNode("Load"));
creator_container.appendChild(load_button);
load_button.addEventListener("click", function() {
    var area = document.getElementById("world_text_area");
    if (!area) {
      area = document.createElement("textarea");
      creator_container.appendChild(area);
      area.id = "world_text_area";
      return;
    }
    var str = area.value;
    area.parentElement.removeChild(area);
    var tiles = eval("(" + str + ")");
    world_creator.world.tiles = tiles;
    for (; container.firstChild;) {
      container.removeChild(container.firstChild);
    }
    world_creator.drawWorld(container);
    world_creator.world.setUpWorldClickHandlers();
  });

