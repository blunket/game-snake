
gameLoop(true);

var turnedThisFrame = false; //used to disallow turning twice in one frame

function gameLoop(firstrun) {
    
    gameSpeed = parseInt(document.getElementById("speed").value);
    
    turnedThisFrame = false;
    
    ctx.clearCanvas(); //defined in setup.js
    
    if (Snake.moving) {
        Snake.nodes.unshift([Snake.x, Snake.y]); //create a new node
        
        while (Snake.nodes.length > Snake.curlen) //delete oldest nodes
            Snake.nodes.pop();
        
        switch (Snake.dir) {
            case 37: //left
                Snake.x--;
                break;
            case 38: //up
                Snake.y--;
                break;
            case 39: //right
                Snake.x++;
                break;
            case 40: //down
                Snake.y++;
                break;
            default:
                console.log("error");
                break;
        }
    }
    
    //draw the snake
    ctx.fillStyle = "#CCC";
    ctx.fillRect(Snake.x * squareSize, Snake.y * squareSize, squareSize, squareSize);
    onSnake = false; //temporary variable
    for (i = 0; i < Snake.nodes.length; i++) {
        ctx.fillRect(Snake.nodes[i][0] * squareSize, Snake.nodes[i][1] * squareSize, squareSize, squareSize);
        if (Snake.nodes[i][0] == Snake.x && Snake.nodes[i][1] == Snake.y) {
            onSnake = true;
            //breaking out of the loop would result in only part of the snake being drawn, so I use a temporary variable here
        }
    }
    if (onSnake) doGameOver();
    
    //draw pellet, but smaller
    ctx.fillRect(Food.x * squareSize + (.25 * squareSize), Food.y * squareSize + (.25 * squareSize), squareSize / 2, squareSize / 2);
    
    //print score
    ctx.textAlign = "left";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 10, canvas.height - 10);
    
    //collision detection
    if (Snake.x >= gridWidth || Snake.x < 0 || Snake.y >= gridHeight || Snake.y < 0) {
        doGameOver();
    } else if (Snake.x == Food.x && Snake.y == Food.y) {
        Snake.curlen++;
        Food.init();
        score += 10 + gameSpeed;
    }
    
    //print instructions if on setup
    if (firstrun) {
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,0,0,.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";
        ctx.fillText("Space to start", canvas.width / 2, canvas.height / 2);
    }
    
    if (Snake.moving) {
        setTimeout(gameLoop, 130 - gameSpeed * 5);
    } else {
        if (Snake.initialized && !firstrun) {       //if still playing, draw pause screen
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(0,0,0,.4)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FFF";
            ctx.fillText("Game paused (space to unpause)", canvas.width / 2, canvas.height / 2);
        }
    }
}

canvas.addEventListener("keydown", function(e){
    if (Snake.moving) {
        //does not let the player turn directly around
        if ((e.keyCode == 37 && Snake.dir !== 39) || (e.keyCode == 39 && Snake.dir !== 37) || (e.keyCode == 38 && Snake.dir !== 40) || (e.keyCode == 40 && Snake.dir !== 38))
            if (turnedThisFrame == false) {
                Snake.dir = e.keyCode;
                turnedThisFrame = true;
            }
    }
    if (e.keyCode == 32) {
        Snake.moving = !Snake.moving;
        if (Snake.moving) {
            if (Snake.initialized) {
                gameLoop();      //unpause if already initialized (player was paused)
            } else {
                Snake.init();
                gameLoop(true);  //reset if not (player died)
            }
        }
    }
});

function doGameOver() {
    Snake.initialized = false;
    Snake.moving = false;
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(0,0,0,.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFF";
    ctx.fillText("Game over (space to restart)", canvas.width / 2, canvas.height / 2);
}
