
var world = new World();

var world_creator = new WorldCreator();
var container = document.getElementById('world');

world.tiles = [
    [new Empty(), new Empty()],
    [new Empty(), new Empty()],
    ]

world.draw(container);
creator_container = document.getElementById("world_creator")
world_creator.draw(creator_container)
world.setUpWorldClickHandlers();
