
var canvas = document.getElementById("game"),
    ctx = canvas.getContext("2d");

var gridWidth = 30,
    gridHeight = 20,
    squareSize = 16; //pixel width and height of one square in the game grid

var gameSpeed = document.getElementById("speed").value;

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

var Food = {
    x : Math.floor(Math.random() * gridWidth),
    y : Math.floor(Math.random() * gridHeight),
    type : "normal"
}

Food.init = function() {
    do {
        this.x = Math.floor(Math.random() * gridWidth);
        this.y = Math.floor(Math.random() * gridHeight);
        onSnake = false; //temporary variable to check if it spawned on the snake
        for (i = 0; i < Snake.nodes.length; i++) {
            if (this.x == Snake.nodes[i][0] && this.y == Snake.nodes[i][1]) {
                onSnake = true;
                break;
            }
        }
    } while ((this.x == Snake.x && this.y == Snake.y) || onSnake) //try again if the food spawned on the snake
    this.type = Math.random() > .9
                ? "special"
                : "normal";
}

var Snake = {
    moving : false,
    x : 1, //x and y position of the snake in terms of the game grid
    y : 1,
    dir : 39, //initial direction: right
    nodes : [], //2-D array (will store [x, y] in terms of game grid of each node)
    curlen : 0 //current length
}

Snake.init = function() {
    this.moving = false;
    this.x = 1;
    this.y = 1;
    this.dir = 39;
    this.nodes = [];
    this.curlen = 0;
}
