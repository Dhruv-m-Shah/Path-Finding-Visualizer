class location1 {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }
}
var state_val = 0;
previousGrid = new location1(0, 0);
startBox = new location1(-1, -1)
var htmlCanvas = document.getElementById('c');
var context = htmlCanvas.getContext("2d");
htmlCanvas.width = Math.floor(screen.width / 40) * 40;
htmlCanvas.height = Math.floor(screen.height / 40) * 40;
var bw = screen.width;
// Box height
var bh = screen.height;
// Padding
var p = 10;

// Box width
context.beginPath();

function drawBoard() {
    for (var x = 0; x <= bw; x += 40) {
        for (var y = 0; y <= bh; y += 40) {
            context.rect(x, y, 40, 40);
        }
    }
    context.stroke();
}
drawBoard();

function lightUpSquare(xpos, ypos) {
    console.log(state_val)
    xpos = xpos - 20 - 200;
    ypos = ypos - 20;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    if (x == startBox.xpos && y == startBox.yos) {
        return;
    }
    if (x != previousGrid.xpos || y != previousGrid.ypos) {
        if (previousGrid.xpos == startBox.xpos && previousGrid.ypos == startBox.ypos) {
            context.fillStyle = "#FF0000";
            context.fillRect(x, y, 40, 40);
            context.stroke();
            previousGrid.xpos = x;
            previousGrid.ypos = y;
            return;
        }
        context.fillStyle = "#FFFFFF"
        context.fillRect(previousGrid.xpos, previousGrid.ypos, 40, 40);
        console.log(x, y);
        context.fillStyle = "#FF0000";
        context.fillRect(x, y, 40, 40);
        context.stroke();
        previousGrid.xpos = x;
        previousGrid.ypos = y;
    }
}

function start_block(xpos, ypos) {
    console.log("ASDAS");
    xpos = xpos - 28 - 200;
    ypos = ypos - 28;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    startBox.xpos = x;
    startBox.ypos = y;
    console.log(startBox.xpos, startBox.ypos);
    context.fillStyle = "#00FF00";
    context.fillRect(x, y, 40, 40);
    context.stroke();
}

document.onclick = function (event) {
    console.log(state_val);

    if (state_val == 1) {
        start_block(event.pageX, event.pageY);
    }

    if (state_val == 2) {
        end_block();
    }

    if (state_val == 3) {
        wall_block();
    }

};
onmousemove = function (e) {
    lightUpSquare(event.pageX, event.pageY);

}


var state_var = 0;

function start_state() {
    console.log("SAD");
    state_val = 1;
}

function end_state() {
    state_val = 2;
}

function wall_state() {
    state_val = 3;
}