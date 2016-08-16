var MovingObject = require("./moving_object.js");
var Util = require("./utils.js");
var Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Asteroid(options) {
  options.color = "#808080";
  options.radius = 25;
  options.vel = Util.randomVec(5);
  MovingObject.call(this, options);

}



Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject){
  
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

module.exports = Asteroid;
