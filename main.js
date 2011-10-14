
var world = new World();

var container = document.getElementById('world');
world.tiles = [
    [new Empty(), new Empty()],
    [new Empty(), new Empty()],
    ]

world.draw(container);
