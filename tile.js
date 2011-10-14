var Tile = {};
Tile.draw = function(tile, container, x, y, name) {
  tile.node = document.createElement("img")
  tile.node.style.top = y;
  tile.node.style.left = x
  tile.node.src = "gfx/" + name;
  tile.node.className = "tile";
  container.appendChild(tile.node);
}

