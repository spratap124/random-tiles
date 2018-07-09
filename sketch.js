
//global variables
var grid;
var width = 401;
var height = 401;
var w = 40;
var cols = Math.floor(width / w);
var rows = Math.floor(height / w);
var canvas;
var ctx;
var scoreBox = document.getElementById("score");
var score = 0;

// setup the grid
function setup(){
    
    canvas = document.getElementById("board");
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = "#ccc";

    ctx = canvas.getContext('2d');

    grid = make2DArray(cols, rows);
    //initialize the grid
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = new Cell(i*w, j*w, w);
        }
    }

    draw();
    //add click event listener on canvas
    canvas.addEventListener("click", clickMousePos);
}

function make2DArray(cols, rows) {
    var arr = new Array(cols);

    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

// draw the game board
function draw(){
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

//cells
function Cell(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    if(Math.random(1) < 0.5){
        this.filled = true;
    }else{
        this.filled = false 
    }
    this.revealed = false;
}

Cell.prototype.show = function () {
    ctx.strokeStyle = "#000";
    ctx.strokeRect(this.x, this.y, this.w, this.w);

    if(this.revealed){
        if (this.filled) {
            ctx.fillStyle = "tomato";
            ctx.fillRect(this.x, this.y, this.w, this.w);
            //border
            ctx.strokeStyle = "#000";
            ctx.strokeRect(this.x, this.y, this.w, this.w);
        } 
    }
}

Cell.prototype.contains = function (x, y){
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Cell.prototype.reveal = function(){
    this.revealed = true;
}

function clickMousePos (e){

    var wrapper = document.getElementById("wrapper");
    var x = e.clientX - wrapper.offsetLeft;
    var y = e.clientY - wrapper.offsetTop;

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j].contains(x, y)) {
                grid[i][j].reveal();
                if (grid[i][j].filled){
                    score++;
                    scoreBox.innerHTML = score;
                }else{
                    score--;
                    scoreBox.innerHTML = score;
                }
                draw();
            }
        }
    }
}

setup();


