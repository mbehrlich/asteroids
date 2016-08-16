var Game = require("./game.js");


function GameView(ctx) {
  this.game = new Game();
  this.canvas = ctx;

}

GameView.prototype.start = function() {
  const view = this;
  this.bindKeyHandlers();
  window.setInterval(function() {
    view.game.step();
    view.game.draw(view.canvas);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  let game = this.game;

  key('w', function() {
    game.ship.power([0,-1]);
  });
  key('a', function() {game.ship.power([-1,0])});
  key('s', function() {game.ship.power([0,1])});
  key('d', function() {game.ship.power([1,0])});
  key('space', function() {game.ship.fireBullet()});
};

module.exports = GameView;
