function ScientistTile() {
}

ScientistTile.prototype.draw = function(container, x, y, world) {
  name = "scientist_ltor1.png";
  Tile.draw(this, container, x, y, name);
}

function MagicianTile() {
}

MagicianTile.prototype.draw = function(container, x, y, world) {
  name = "magician_ltor1.png";
  Tile.draw(this, container, x, y, name);
}