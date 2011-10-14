
var world_creator = new WorldCreator();
creator_container = document.getElementById("world_creator")

world_creator.tiles = [new WoodenTile(), new StoneTile(), new FreeTile()]
world_creator.draw(creator_container);
