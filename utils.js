var Utils = {};

Utils.getObjectClass = function(obj) {
  if (obj && obj.constructor && obj.constructor.toString) {
    var arr = obj.constructor.toString().match(
        /function\s*(\w+)/);
    if (arr && arr.length == 2) {
      return arr[1];
    }
  }
  return undefined;
}

Utils.getAnimationStep = function(time, step, frames) {
  return Math.floor(time % (step * frames) / step);
}
