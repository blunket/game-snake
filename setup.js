
var canvas = document.getElementById("game"),
    ctx = canvas.getContext("2d");

var gridWidth = 20,
    gridHeight = 10,
    squareSize = 16; //pixel width and height of one square in the game grid

//calculate pixel width and height of the canvas
canvas.width = gridWidth * squareSize;
canvas.height = gridHeight * squareSize;

//always keep the canvas in focus, otherwise the game will not work
canvas.focus();
canvas.addEventListener("blur", function() {
    this.focus();
});

ctx.clearCanvas = function() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var Snake = {
    moving : true,
    x : 1, //x and y position of the snake in terms of the game grid
    y : 1,
    nodes : [] //2-D array (will store [x, y] in terms of game grid of each node)
}

gameLoop(); //defined in game.js