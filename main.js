
var world = new World();

var container = document.getElementById('world');

world.tiles = [
    [new FreeTile(), new FreeTile(), new StoneTile()],
    [new FreeTile(), new FreeTile(), new StoneTile()],
    [new FreeTile(), new StoneTile(), new StoneTile()],
    ]


var player = new Player();
world.actors = [new Magician()]
player.actor = world.actors[0];
player.setUpEventHandlers();
world.player = player;

world.draw(container);
world.loop();
