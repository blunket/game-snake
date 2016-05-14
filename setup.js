
var canvas = document.getElementById("game"),
    ctx = canvas.getContext("2d");

var gridWidth = 30,
    gridHeight = 20,
    squareSize = 12; //pixel width and height of one square in the game grid

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
    ctx.fillStyle = "#444";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var Food = {
    x : Math.floor(Math.random() * gridWidth),
    y : Math.floor(Math.random() * gridHeight),
    type : 0 //type 0 is normal, 1 is special
}

var FoodB = {  //for player 2
    x : Math.floor(Math.random() * gridWidth),
    y : Math.floor(Math.random() * gridHeight),
    type : 0 //type 0 is normal, 1 is special
}

Food.init = function() {
    do {
        this.x = Math.floor(Math.random() * gridWidth);
        this.y = Math.floor(Math.random() * gridHeight);
        onSnake = false; //temporary variable to check if it spawned on either snake
        for (i = 0; i < Snake.nodes.length; i++) {
            if ((this.x == Snake.nodes[i][0] && this.y == Snake.nodes[i][1]) || (this.x == Snake.x && this.y == Snake.y)) {
                onSnake = true;
                break;
            }
        }
        for (i = 0; i < SnakeB.nodes.length; i++) {
            if ((this.x == SnakeB.nodes[i][0] && this.y == SnakeB.nodes[i][1]) || (this.x == SnakeB.x && this.y == SnakeB.y)) {
                onSnake = true;
                break;
            }
        }
    } while (onSnake) //try again if the food spawned on either snake
    this.type = Math.round(Math.random() - .4);
}

FoodB.init = function() {
    do {
        this.x = Math.floor(Math.random() * gridWidth);
        this.y = Math.floor(Math.random() * gridHeight);
        onSnake = false; //temporary variable to check if it spawned on either snake
        for (i = 0; i < Snake.nodes.length; i++) {
            if ((this.x == Snake.nodes[i][0] && this.y == Snake.nodes[i][1]) || (this.x == Snake.x && this.y == Snake.y)) {
                onSnake = true;
                break;
            }
        }
        for (i = 0; i < SnakeB.nodes.length; i++) {
            if ((this.x == SnakeB.nodes[i][0] && this.y == SnakeB.nodes[i][1]) || (this.x == SnakeB.x && this.y == SnakeB.y)) {
                onSnake = true;
                break;
            }
        }
    } while (onSnake) //try again if the food spawned on either snake
    this.type = Math.round(Math.random() - .4);
}


var Snake = {
    moving : false,
    x : 1, //x and y position of the snake in terms of the game grid
    y : 1,
    dir : 39, //initial direction: right
    nodes : [], //2-D array (will store [x, y] in terms of game grid of each node)
    curlen : 0, //current length
    initialized : true
}

var SnakeB = {
    moving : false,
    x : 28, //x and y position of the snake in terms of the game grid
    y : 18,
    dir : 65, //initial direction: left
    nodes : [], //2-D array (will store [x, y] in terms of game grid of each node)
    curlen : 0, //current length
    initialized : true
}

Snake.init = function() {
    this.moving = false;
    this.x = 1;
    this.y = 1;
    this.dir = 39;
    this.nodes = [];
    this.curlen = 0;
    this.initialized = true;
    Food.init();
}

SnakeB.init = function() {
    this.moving = false;
    this.x = 28;
    this.y = 18;
    this.dir = 65;
    this.nodes = [];
    this.curlen = 0;
    this.initialized = true;
    FoodB.init();
}

