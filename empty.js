
var Empty = function() {
};

Empty.prototype.draw = function(container, x, y) {
  this.node = document.createElement('img');
  this.node.style.top = x * C.size + 'px';
  this.node.style.left = y * C.size + 'px';
  this.node.src = 'gfx/magician_ltor1.png';
  this.node.className = 'tile';

  container.appendChild(this.node);
};
