
var Empty = function() {
};

Empty.prototype.draw = function(container, x, y) {
  this.node = document.createElement('img');
  this.node.style.top = y * C.size + 'px';
  this.node.style.left = x * C.size + 'px';
  this.node.src = 'gfx/bg_green.png';
  this.node.className = 'tile';

  container.appendChild(this.node);
};
