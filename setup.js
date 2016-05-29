
var canvas = document.getElementById("game"),
    ctx = canvas.getContext("2d");

var gridWidth = 30,
    gridHeight = 20,
    //Math.min returns the lowest number among all options
    //This line maximizes the size of the game without adding scrollbars
    squareSize = Math.min((window.innerWidth - 270) / gridWidth, (window.innerHeight - 20) / gridHeight);
    special = false;
    
var gameSpeed = document.getElementById("speed").value;

document.getElementById("snake").addEventListener("change", function() {
    document.getElementById("snakecolor").style.backgroundColor = document.getElementById("snake").value
});

document.getElementById("bg").addEventListener("change", function() {
    document.getElementById("bgcolor").style.backgroundColor = document.getElementById("bg").value
});

document.getElementById("apply").addEventListener("click", function() {
    gameSpeed = parseInt(document.getElementById("speed").value);
    gridWidth = parseInt(document.getElementById("width").value);
    gridHeight = parseInt(document.getElementById("height").value);
    special = document.getElementById("special").checked;
    
    squareSize = Math.min((window.innerWidth - 270) / gridWidth, (window.innerHeight - 20) / gridHeight);
    
    canvas.width = gridWidth * squareSize;
    canvas.height = gridHeight * squareSize;
    doGameOver();
    Snake.init();
    gameLoop(true);
});

var score = 0;

//calculate pixel width and height of the canvas
canvas.width = gridWidth * squareSize;
canvas.height = gridHeight * squareSize;

//always keep the canvas in focus, otherwise the game will not work
canvas.focus();
canvas.addEventListener("blur", function() {
    this.focus();
});

ctx.clearCanvas = function() {
    ctx.fillStyle = document.getElementById("bg").value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var Food = {
    x : Math.floor(Math.random() * gridWidth),
    y : Math.floor(Math.random() * gridHeight),
    type : 0 //type 0 is normal, 1 is special
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
    this.type = special ? Math.round(Math.random() - .4) : 0; //if special food is on, small chance of spawning special; otherwise, always spawn normal food
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

Snake.init = function() {
    this.moving = false;
    this.x = 1;
    this.y = 1;
    this.dir = 39;
    this.nodes = [];
    this.curlen = 0;
    this.initialized = true;
    score = 0;
    Food.init();
}

