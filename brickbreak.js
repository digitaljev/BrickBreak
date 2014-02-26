/* 
BrickBreak is a take on the standard brick break genre. Built in javascript
with the simpleGame.js engine. It aims to provide me an opportunity to learn
game development, HTML5, and OOP JavaScript.
 */

// art
var lBorder;
var rBorder;
var tBorder;
var box;
var paddle;

// sound
var winMP3;
var winOGG;
var loseMP3;
var loseOGG;
var reboundMP3;
var reboundOGG;
var destroyMP3;
var destroyOGG;

// scene
var game;

// paddle class
function Paddle(){
    tPaddle = new Sprite(game, "assets/art/paddle.png", 80, 20);
    tPaddle.setSpeed(0);
    tPaddle.setPosition(160, 600);
    
    var space = false;
    tPaddle.checkKeys = function () {
        
        if (keysDown[K_SPACE]){
            this.setDX(0);
            space = true;
            return space;
        }
        if (keysDown[K_RIGHT] && space === true) {
            this.setDX(5);
            }
        if (keysDown[K_LEFT] && space === true) {
            this.setDX(-5);
        }
    };
    
    return tPaddle;
}

// box class
function Box(){
    tBox = new Sprite(game, "assets/art/box.png", 10, 10);
    tBox.setSpeed(0);
    tBox.setPosition(160,585);
    
    tBox.checkKeys = function (){
        if(keysDown[K_SPACE]){
            this.setSpeed(5);
            this.setMoveAngle(45);
        }
    };
    return tBox;
}

// check for collisions
//function checkCollisions(){
//    if(box.collidesWith(rBorder)) {
//        output.innerHTML = "Collision";
//    } else {
//        output.innerHTML = "No Collision";
//    }
//}

function checkCollisions(){
    if(box.collidesWith(lBorder || rBorder || tBorder)) {
        var curAngle = box.getMoveAngle();
        var curSpeed = box.getSpeed();
        box.setMoveAngle(curAngle - 90);
        box.setSpeed(curSpeed + 1);
    }
}

// initialise game resources
function init() {
    game = new Scene();
    game.setSize(480,640);
    
    lBorder = new Sprite(game, "assets/art/sBorder.png", 30, 610);
    lBorder.setSpeed(0);
    lBorder.setPosition(0,320);
    
    rBorder = new Sprite(game, "assets/art/sBorder.png", 30, 610);
    rBorder.setSpeed(0);
    rBorder.setPosition(480,320);
    
    tBorder = new Sprite(game, "assets/art/tBorder2.png", 480, 30);
    tBorder.setSpeed(0);
    tBorder.setPosition(240,0);
    
    paddle = new Paddle();
    box = new Box();
    
    game.start();
}

// update the canvas
function update(){
    game.clear();
    checkCollisions();
    
    paddle.checkKeys();
    box.checkKeys();
    
    lBorder.update();
    rBorder.update();
    tBorder.update();
    paddle.update();
    box.update();
    
}
