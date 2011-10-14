
var world = new World();

var container = document.getElementById('world');

world.tiles = [
    [new Empty(), new Empty()],
    [new Empty(), new Empty()],
    ]


var player = new Player();
world.actors = [new Magician()]
player.actor = world.actors[0];
player.setUpEventHandlers();
world.player = player;

world.draw(container);
world.setUpWorldClickHandlers();
world.loop();
