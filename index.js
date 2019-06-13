var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var ballRadius = 5;

//variables for the user contolled paddle

var controllerHeight = 10;
var controllerWidth = 65;
var controllerX = (canvas.width-controllerWidth) /2;

//Determine whether right or left has been pressed.

var rightPressed = false;
var leftPressed = false;

//Variables for the bricks

var brickRowCount = 6;
var brickColumnCount = 10;
var brickWidth = 40;
var brickHeight = 10;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

var score = 0;
var multiplier = 0;

// This will loop through the rows and columns and create new bricks.

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Determine whether we have pressed left or right.

function keyDownHandler(e) {
    if(e.key =="Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key =="Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler (e) {
    if(e.ley == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy + 0.5;
                    
                    //dx = dx + 0.5;      //makes the ball go faster when you break a brick.
                    b.status = 0;
                    score = score + 100;
                    multiplier =  multiplier + 1; 
                    console.log("dy",dy)
                    console.log("dx",dx)
                    console.log("Score", score);
                }
            }
        }
    }
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function ball () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function controller () {
    ctx.beginPath ();
    ctx.rect(controllerX, canvas.height-controllerHeight, controllerWidth, controllerHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

}

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball()
    controller();
    drawBricks();
    collisionDetection();
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height-ballRadius) {
        if(x > controllerX && x < controllerX + controllerWidth) {
            dy =-dy;
        } else {
        alert("Game Over");
        document.location.reload();
        clearInterval(interval);
        }
    }
    if (x + dx > canvas.width-ballRadius || x + dx <ballRadius) {
        dx =-dx;
    }
    if(rightPressed && controllerX < canvas.width - controllerWidth) {
        controllerX += 7;
    }
    else if (leftPressed && controllerX > 0) {
        controllerX -= 7;
    }
    x += dx;
    y += dy;
}


 var interval = setInterval (draw, 10);
