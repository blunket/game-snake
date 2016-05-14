
gameLoop(true);

var turnedThisFrame = false; //used to disallow turning twice in one frame
var turnedThisFrameB = false; //used to disallow turning twice in one frame

function gameLoop(firstrun) {
    
    gameSpeed = parseInt(document.getElementById("speed").value);
    
    turnedThisFrame = false;
    turnedThisFrameB = false;
    
    ctx.clearCanvas(); //defined in setup.js
    
    if (Snake.moving && SnakeB.moving) {
        Snake.nodes.unshift([Snake.x, Snake.y]); //create a new node
        SnakeB.nodes.unshift([SnakeB.x, SnakeB.y]); //create a new node
        
        while (Snake.nodes.length > Snake.curlen) //delete oldest nodes
            Snake.nodes.pop();
            
        while (SnakeB.nodes.length > SnakeB.curlen) //delete oldest nodes
            SnakeB.nodes.pop();
        
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
                
        switch (SnakeB.dir) {
            case 65: //left
                SnakeB.x--;
                break;
            case 87: //up
                SnakeB.y--;
                break;
            case 68: //right
                SnakeB.x++;
                break;
            case 83: //down
                SnakeB.y++;
                break;
            default:
                console.log("error");
                break;
        }
    }
    
    //draw the snakes
    ctx.fillStyle = "#CCC";
    ctx.fillRect(Snake.x * squareSize, Snake.y * squareSize, squareSize, squareSize);
    onSnake = -1; //temporary variable
    for (i = 0; i < Snake.nodes.length; i++) {
        ctx.fillRect(Snake.nodes[i][0] * squareSize, Snake.nodes[i][1] * squareSize, squareSize, squareSize);
        if (Snake.nodes[i][0] == Snake.x && Snake.nodes[i][1] == Snake.y) {
            onSnake = 0;
            //breaking out of the loop would result in only part of the snake being drawn, so I use a temporary variable here
        }
        if (Snake.nodes[i][0] == SnakeB.x && Snake.nodes[i][1] == SnakeB.y) {
            //P2 lost
            onSnake = 1;
        }
    }
    if (onSnake == 0) doGameOver(0); //passing 0 means P1 lost and P2 wins
    else if (onSnake == 1) doGameOver(1); //passing 1 means P2 lost and P1 wins
    
    ctx.fillStyle = "#111";
    ctx.fillRect(SnakeB.x * squareSize, SnakeB.y * squareSize, squareSize, squareSize);
    onSnake = -1; //temporary variable
    for (i = 0; i < SnakeB.nodes.length; i++) {
        ctx.fillRect(SnakeB.nodes[i][0] * squareSize, SnakeB.nodes[i][1] * squareSize, squareSize, squareSize);
        if (SnakeB.nodes[i][0] == SnakeB.x && SnakeB.nodes[i][1] == SnakeB.y) {
            onSnake = 0;
            //breaking out of the loop would result in only part of the snake being drawn, so I use a temporary variable here
        }
        if (SnakeB.nodes[i][0] == Snake.x && SnakeB.nodes[i][1] == Snake.y) {
            //P1 lost
            onSnake = 1;
        }
    }
    if (onSnake == 0) doGameOver(1); //passing 1 means P2 lost and P1 wins
    else if (onSnake == 1) doGameOver(0); //passing 0 means P1 lost and P2 wins
    
    
    //draw pellets, smaller
    if (Food.type == 1) {
        ctx.strokeStyle = "#CCC";
        ctx.strokeRect(Food.x * squareSize + (.25 * squareSize), Food.y * squareSize + (.25 * squareSize), squareSize / 2, squareSize / 2);
    } else {
        ctx.fillStyle = "#CCC";
        ctx.fillRect(Food.x * squareSize + (.25 * squareSize), Food.y * squareSize + (.25 * squareSize), squareSize / 2, squareSize / 2);
    }
    
    if (FoodB.type == 1) {
        ctx.strokeStyle = "#111";
        ctx.strokeRect(FoodB.x * squareSize + (.25 * squareSize), FoodB.y * squareSize + (.25 * squareSize), squareSize / 2, squareSize / 2);
    } else {
        ctx.fillStyle = "#111";
        ctx.fillRect(FoodB.x * squareSize + (.25 * squareSize), FoodB.y * squareSize + (.25 * squareSize), squareSize / 2, squareSize / 2);
    }
    
    //collision detection
    if (Snake.x >= gridWidth || Snake.x < 0 || Snake.y >= gridHeight || Snake.y < 0) {
        doGameOver(0);
    } else if (Snake.x == Food.x && Snake.y == Food.y) {
        if (Food.type == 0) {
            Snake.curlen++;
        } else {
            Snake.curlen = Snake.curlen * (3 / 4);
        }
        Food.init();
    }

    //collision detection
    if (SnakeB.x >= gridWidth || SnakeB.x < 0 || SnakeB.y >= gridHeight || SnakeB.y < 0) {
        doGameOver(1);
    } else if (SnakeB.x == FoodB.x && SnakeB.y == FoodB.y) {
        if (FoodB.type == 0) {
            SnakeB.curlen++;
        } else {
            SnakeB.curlen = SnakeB.curlen * (3 / 4);
        }
        FoodB.init();
    }
    
    //print instructions if on setup
    if (firstrun) {
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,0,0,.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";
        ctx.fillText("Space to start", canvas.width / 2, canvas.height / 2);
    }
    
    if (Snake.moving && SnakeB.moving) {
        setTimeout(gameLoop, 130 - gameSpeed * 5);
    } else {
        if (Snake.initialized && SnakeB.initialized && !firstrun) {       //if still playing, draw pause screen
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
    if (SnakeB.moving) {
        //does not let the player turn directly around
        if ((e.keyCode == 65 && SnakeB.dir !== 68) || (e.keyCode == 68 && SnakeB.dir !== 65) || (e.keyCode == 87 && SnakeB.dir !== 83) || (e.keyCode == 83 && SnakeB.dir !== 87))
            if (turnedThisFrameB == false) {
                SnakeB.dir = e.keyCode;
                turnedThisFrameB = true;
            }
    }
    if (e.keyCode == 32) {
        Snake.moving = !Snake.moving;
        SnakeB.moving = !SnakeB.moving;
        if (Snake.moving && SnakeB.moving) {
            if (Snake.initialized && SnakeB.initialized) {
                gameLoop();      //unpause if already initialized (player was paused)
            } else {
                Snake.init();
                SnakeB.init();
                gameLoop(true);  //reset if not (player died)
            }
        }
    }
});

function doGameOver(winner) {
    Snake.initialized = false;
    SnakeB.initialized = false;
    Snake.moving = false;
    SnakeB.moving = false;
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(0,0,0,.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFF";
    winner = (winner == 0) ? "Black" : "White";
    ctx.fillText("Game over. " + winner + " wins!", canvas.width / 2, canvas.height / 2);
}
