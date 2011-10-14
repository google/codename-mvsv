
var Empty = function() {
};

Empty.prototype.draw = function(container, x, y) {
  Tile.draw(this, container, x, y, 'gfx/bg_green.png');
};
