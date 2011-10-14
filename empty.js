
var Empty = function() {
};

Empty.prototype.draw = function(container, x, y) {
  this.node = document.createElement('img');
  this.node.style.top = x * C.size + 'px';
  this.node.style.left = y * C.size + 'px';
  this.node.className = 'tile';

  container.appendChild(this.node);
};
