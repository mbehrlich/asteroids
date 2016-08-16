const Util = {
  inherits (childClass, parentClass) {
    function Surrogate(){ }
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },
  randomVec(length) {
    let a = (Math.random()*(length * 2)) - length;
    let b = Math.sqrt(Math.pow(length, 2) - Math.pow(a, 2));
    let dir = Math.floor(Math.random() * 2);
    if (dir === 0) {
      b = b * -1;
    }
    return [a, b];
  },
  dist(pos1, pos2){
    let a = pos1[0] - pos2[0];
    let b = pos1[1] - pos2[1];
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  }
};




module.exports = Util;
