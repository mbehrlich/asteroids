const MovingObject = require("./moving_object.js");
const Ship = require("./ship.js");
const Asteroid = require("./asteroid.js");
const Util = require("./utils.js");

function Bullet(options) {
    options.color = "#FFFF00";
    options.radius = 5;
    MovingObject.call(this, options);
    this.isWrappable = false;
}

Util.inherits(Bullet, MovingObject);

// Bullet.prototype.collideWith = function(otherObject){
//   if (otherObject instanceof Asteroid) {
//     this.game.remove(otherObject);
//     this.game.remove(this);
//   }
// };

module.exports = Bullet;
