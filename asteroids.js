var GameView = require("./lib/game_view.js");

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  let view = new GameView(ctx);
  view.start();
});
