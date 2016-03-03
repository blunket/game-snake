
gameLoop();

var turnedThisFrame = false; //used to disallow turning twice in one frame

function gameLoop() {
    
    turnedThisFrame = false;
    
    ctx.clearCanvas(); //defined in setup.js
    
    if (Snake.moving) {
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
    ctx.fillStyle = ctx.strokeStyle = "#FFF";
    ctx.fillRect(Snake.x * squareSize, Snake.y * squareSize, squareSize, squareSize);
    for (i = 0; i < Snake.nodes.length; i++) {
        ctx.fillRect(Snake.nodes[i][0] * squareSize, Snake.nodes[i][1] * squareSize, squareSize, squareSize);
    }
    
    if (Snake.moving) setTimeout(gameLoop, 50);
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
        if (Snake.moving)
            gameLoop();
    }
});
