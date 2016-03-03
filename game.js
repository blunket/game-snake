
function gameLoop() {
    
    ctx.clearCanvas(); //defined in setup.js
    
    //draw the snake
    ctx.fillStyle = ctx.strokeStyle = "#FFF";
    ctx.fillRect(Snake.x * squareSize, Snake.y * squareSize, squareSize, squareSize);
    for (i = 0; i < Snake.nodes.length; i++) {
        ctx.fillRect(Snake.nodes[i][0] * squareSize, Snake.nodes[i][1] * squareSize, squareSize, squareSize);
    }
    
    if (Snake.moving) {
        setTimeout(gameLoop, 50);
    }
    
}