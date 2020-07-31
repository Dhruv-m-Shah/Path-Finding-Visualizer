class location1 {
    constructor(xpos, ypos) {
        this.xpos = xpos;
        this.ypos = ypos;
    }
}
var state_val = 0; // What state is the position selector.

previousGrid = new location1(0, 0); // Location of the previous grid visited 

startBox = new location1(-1, -1) // Location of the "start" node

endBox = new location1(-1, -1) // Location of the "end" node

wallSet = []; // Look for walls (Using array for now, problem with javascript SET and unique objects)
NodesTraversed = [] // djkstras nodes that have been traversed
algorithm = 0; // What algorithm to be used (1 -> A*,  2 -> dijkstra's, 3 -> BFS)
wall_marker = 0;

var pageNum = 1;

var htmlCanvas = document.getElementById('c');
var context = htmlCanvas.getContext("2d");
htmlCanvas.width = (Math.floor(window.innerWidth / 40) - 2) * 40;
htmlCanvas.height = (Math.floor(window.innerHeight / 40) - 3) * 40;
htmlCanvas.style.width = htmlCanvas.width.toString() + "px";
htmlCanvas.style.height = htmlCanvas.height.toString() + "px";
var bw = window.innerWidth - 120;
// Box height
var bh = window.innerHeight - 120;
// Padding
var p = 10;
maxwidth = (Math.floor(window.innerWidth / 40) - 3) * 40;
maxheight = (Math.floor(window.innerHeight / 40) - 3) * 40;
// Box width
context.beginPath();

var weights = new Array(Math.floor(bw / 40) + 1);
new_array()
function new_array() {
    for (var i = 0; i < weights.length; i++) {
        weights[i] = new Array(Math.floor(bh / 40) + 1);
    }
    for (var j = 0; j < Math.floor(bw / 40) + 1; j++) {
        for (var i = 0; i < Math.floor(bh / 40) + 1; i++) {
            weights[j][i] = 0.5;
        }
    }
}

function reportWindowSize() {
    htmlCanvas.width = (Math.floor(window.innerWidth / 40) - 2) * 40;
    htmlCanvas.height = (Math.floor(window.innerHeight / 40) - 3) * 40;
    var bw = window.innerWidth - 120;
    // Box height
    var bh = window.innerHeight - 120;
    drawBoard();
}

window.onresize = reportWindowSize;



function drawBoard() {
    for (var x = 0; x <= bw; x += 40) {
        for (var y = 0; y <= bh; y += 40) {
            context.rect(x, y, 40, 40);
            context.linewidth = 1;
            context.strokeStyle = "#666666"
            context.stroke();
            context.fillStyle = "#000000";
            context.fill();
            
        }
    }
    context.stroke();
}


drawBoard();

function inset(array, x, y) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == x && array[i][1] == y) {
            return true;
        }
    }
    return false;
}

function lightUpSquare(xpos, ypos) {
    xpos = xpos - 20 - 200;
    ypos = ypos - 20;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    if (x < 0 || x > bw || y < 0 || y > bh) {
        return;
    }
    temp = {
        x,
        y
    };
    x1 = previousGrid.xpos;
    y1 = previousGrid.ypos;
    temp1 = {
        x1,
        y1
    };
    if (x == startBox.xpos && y == startBox.ypos) {
        return;
    }
    if (x == endBox.xpos && y == endBox.ypos) {
        return;
    }

    if (inset(wallSet, x, y)) return; // Walls
    if (inset(visitednodes, x, y)) return; // BFS
    if (inset(NodesTraversed, x, y)) return; // djkstras

    if (x != previousGrid.xpos || y != previousGrid.ypos) {
        if ((previousGrid.xpos == startBox.xpos && previousGrid.ypos == startBox.ypos) ||
            (previousGrid.xpos == endBox.xpos && previousGrid.ypos == endBox.ypos) ||
            inset(wallSet, previousGrid.xpos, previousGrid.ypos) ||
            inset(visitednodes, previousGrid.xpos, previousGrid.ypos)) {
            context.fillStyle = "#ffffff";
            context.fillRect(x, y, 40, 40);
            if (weights[Math.floor(x / 40)][Math.floor(y / 40)] != 0.5) {
                context.fillText(weights[Math.floor(x / 40)][Math.floor(y / 40)], x + 10, y + 30);
            }
            context.stroke();
            previousGrid.xpos = x;
            previousGrid.ypos = y;

            return;
        }
        context.fillStyle = "#000000"
        context.fillRect(previousGrid.xpos, previousGrid.ypos, 40, 40);
        context.fillStyle = "#FFFFFF";
        context.fillRect(x, y, 40, 40);
        if (weights[Math.floor(previousGrid.xpos / 40)][Math.floor(previousGrid.ypos / 40)] != 0.5) {
            context.fillText(weights[Math.floor(previousGrid.xpos / 40)][Math.floor(previousGrid.ypos / 40)], previousGrid.xpos + 10, previousGrid.ypos + 30);
        }
        if (weights[Math.floor(x / 40)][Math.floor(y / 40)] != 0.5) {
            context.fillText(weights[Math.floor(x / 40)][Math.floor(y / 40)], x + 10, y + 30);
        }
        context.stroke();
        previousGrid.xpos = x;
        previousGrid.ypos = y;

    }
}

function start_block(xpos, ypos) {
    xpos = xpos - 28 - 200;
    ypos = ypos - 28;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    if (x < 0 || x > bw || y < 0 || y > bh) {
        return;
    }
    if (pageNum <= 8) {
        nextPage();
    }
    if (startBox.xpos != -1 && startBox.ypos != -1) {
     
        context.fillStyle = "#000000";
        context.fillRect(startBox.xpos, startBox.ypos, 40, 40);
        context.stroke();
    }
    context.fillStyle = "#000000";
    context.fillRect(x, y, 40, 40);
    context.stroke();
    var img = document.createElement("img");
    img.src = "imgs\\flag.png";
    context.imageSmoothingEnabled = false;
    startBox.xpos = x;
    startBox.ypos = y;
    img.onload = function(){
        context.drawImage(img, x+5, y+5, 32, 30);
    }

    console.log(x, y);
    console.log("TEST AGAIN");
    
}



function end_block(xpos, ypos) {
    xpos = xpos - 28 - 200;
    ypos = ypos - 28;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    if (x < 0 || x > bw || y < 0 || y > bh) {
        return;
    }
    if (pageNum == 7) {
        nextPage();
    }
    if (endBox.xpos != -1 && endBox.ypos != -1) {
        context.fillStyle = "#000000";
        context.fillRect(endBox.xpos, endBox.ypos, 40, 40);
        context.stroke();
    }

    context.fillStyle = "#000000";
    context.fillRect(x, y, 40, 40);
    context.stroke();
    endBox.xpos = x;
    endBox.ypos = y;
    var img = document.createElement("img");
    img.src = "imgs\\End.svg";
    context.imageSmoothingEnabled = false;
    img.onload = function(){
        context.drawImage(img, x + 5, y + 5, 30, 30);
    }
    wall_marker = 0;
    
}



function wall_block(xpos, ypos) {
    xpos = xpos - 28 - 200;
    ypos = ypos - 28;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    if (x == endBox.xpos && y == endBox.ypos) return;
    if (x == startBox.xpos && y == startBox.ypos) return;
    wallSet.push([x, y]);
    context.fillStyle = "#75402b";
    context.fillRect(x, y, 40, 40);
    context.stroke();
}

function weight(xpos, ypos) {
    xpos = xpos - 28 - 200;
    ypos = ypos - 28;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    if (x < 0 || x > bw || y < 0 || y > bh) {
        return;
    }
    if (inset(wallSet, x, y)) {
        return;
    }
    if ((x == startBox.xpos && y == startBox.ypos) || (x == endBox.xpos && y == endBox.ypos)) return;
    if (weights[Math.floor(x / 40)][Math.floor(y / 40)] == 9) return;
    context.font = "30px Arial";
    context.fillStyle = "#FFFFFF";
    context.fillRect(x, y, 40, 40);
    context.stroke();

    context.fillStyle = "#a1e7f7";
    weights[Math.floor(x / 40)][Math.floor(y / 40)] += 1;
    context.fillText(weights[Math.floor(x / 40)][Math.floor(y / 40)], x + 10, y + 30);
}



document.onclick = function (event) {

    if (state_val == 1) {
        start_block(event.pageX + 197, event.pageY - 88);
    }

    if (state_val == 2) {
        wall_marker = 1;
        end_block(event.pageX + 197, event.pageY - 88);
    }

    if (state_val == 4) {
        weight(event.pageX + 197, event.pageY - 88);
    }

};
onmousemove = function (e) {
    if (state_val == 3 && mouseDown) {
        wall_block(event.pageX + 197, event.pageY - 88);
    } else {
        lightUpSquare(event.pageX + 185, event.pageY - 94);
    }
}


var mouseDown = 0;
document.body.onmousedown = function () {
    mouseDown = 1;
}
document.body.onmouseup = function () {
    mouseDown = 0;
}


function start_state() {
    document.getElementById("startBut").style.fontWeight = "bold";
    document.getElementById("endBut").style.fontWeight = "normal";
    document.getElementById("wallBut").style.fontWeight = "normal";
    document.getElementById("arrow").style.display = "none";
    if (pageNum == 4) nextPage();

    state_val = 1;
}

function end_state() {
    document.getElementById("startBut").style.fontWeight = "normal";
    document.getElementById("endBut").style.fontWeight = "bold";
    document.getElementById("wallBut").style.fontWeight = "normal";
    document.getElementById("arrowEnd").style.display = "none";
    if (pageNum == 6) nextPage();
    state_val = 2;
}

function wall_state() {
    document.getElementById("startBut").style.fontWeight = "normal";
    document.getElementById("endBut").style.fontWeight = "normal";
    document.getElementById("wallBut").style.fontWeight = "Bold";
    document.getElementById("arrowWall").style.display = "none";
    state_val = 3;
}

function add_weight() {
    document.getElementById("startBut").style.fontWeight = "normal";
    document.getElementById("endBut").style.fontWeight = "normal";
    document.getElementById("wallBut").style.fontWeight = "normal";
    state_val = 4;
}

function clear_slate() {
    state_val = 0;
    wallSet = [];
    NodesTraversed = [];
    visitednodes = [];
    cameFrom = [];
    startBox.xpos = -1;
    startBox.ypos = -1;
    endBox.xpos = -1;
    endBox.xpos = -1;
    previousGrid.xpos = 0;
    previousGrid.ypos = 0;
    for (var x = 0; x <= bw; x += 40) {
        for (var y = 0; y <= bh; y += 40) {
            context.rect(x, y, 40, 40);
            context.linewidth = 1;
            context.strokeStyle = "#666666"
            context.stroke();
            context.fillStyle = "#000000";
            context.fill();
            if(x == bw){
                console.log("TEST");
            }
        }
    }
    for (var j = 0; j < Math.floor(bw / 40) + 1; j++) {
        for (var i = 0; i < Math.floor(bh / 40) + 1; i++) {
            weights[j][i] = 0.5;
        }
    }

}

function aStar_mode() {
    algorithm = 1;
    $("#dropdownMenuButton").text('A*');
    document.getElementById("dropdownMenu2").innerText = 'A*';
    document.getElementById("arrowAlgo").style.display = "none";
    if (pageNum == 9) nextPage();
}

function dijkstra_mode() {
    algorithm = 2;
    document.getElementById("dropdownMenu2").innerText = 'Dijkstra';
    document.getElementById("arrowAlgo").style.display = "none";
    if (pageNum == 9) nextPage();
}

function bfs_mode() {
    algorithm = 3;
    document.getElementById("dropdownMenu2").innerText = 'BFS';
    document.getElementById("arrowAlgo").style.display = "none";
    if (pageNum == 9) nextPage();
}

function start_algo() {
    document.getElementById("arrowStart").style.display = "none";
    if (pageNum == 10) skipTutorial();
    document.getElementById("")
    if (algorithm == 1) {
        A();
    }
    if (algorithm == 2) {
        dijkstras();
    }
    if (algorithm == 3) {
        bfs();
    }
}

const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms))
nodes = []
newnodes = []
visitednodes = []
cameFrom = []

function draw(xpos, ypos) {
    if (xpos == endBox.xpos && ypos == endBox.ypos) {
        return;
    }
    context.fillStyle = "#c9c9c9";
    context.fillRect(xpos, ypos, 40, 40);
    if (weights[xpos / 40][ypos / 40] != 0.5) {
        context.fillStyle = "#ffffff";
        context.fillText(weights[xpos / 40][ypos / 40], xpos + 10, ypos + 30);
    }
    context.stroke();
}

function draw_aqua(xpos, ypos, count) {
    if (count == 42) {
        return;
    }
    if (xpos == startBox.xpos && ypos == startBox.ypos) {
        return;
    }
    context.fillStyle = "#16a085";
    context.fillRect(xpos + 20 - (count / 2), ypos + 20 - (count / 2), count, count);
    context.stroke();
    setTimeout(() => {
        draw_aqua(xpos, ypos, count + 2);
    }, 5)
}

const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}

newnodes1 = [];

function bfs() {
    nodes = [
        [startBox.xpos, startBox.ypos]
    ];
    newnodes = [];
    visitednodes = [
        [startBox.xpos, startBox.ypos]
    ];
    document.getElementById('static').style.opacity = 0;
    add(nodes, newnodes, visitednodes, 1, cameFrom);
}


function add(nodes, newnodes, visitednodes, marker, cameFrom) {
    if (marker == 0) {
        return;
    }

    if (nodes.length == 0) {
        alert("Didn't find it :(");
        return;
    }

    nodes.forEach(function (item) {
        if (item[0] + 40 <= bw && !inset(visitednodes, item[0] + 40, item[1]) && !inset(wallSet, item[0] + 40, item[1])) {
            if ((item[0] + 40 == endBox.xpos) && (item[1] == endBox.ypos)) {
                marker = 0;
                cameFrom.push([item, [item[0] + 40, item[1]]]);
                drawPath(cameFrom, [endBox.xpos, endBox.ypos]);
                return;
            }
            newnodes.push([item[0] + 40, item[1]]);
            visitednodes.push([item[0] + 40, item[1]]);
            cameFrom.push([item, [item[0] + 40, item[1]]]);
            draw(item[0] + 40, item[1]);
        }
        if (item[0] - 40 >= 0 && !inset(visitednodes, item[0] - 40, item[1]) && !inset(wallSet, item[0] - 40, item[1])) {
            if ((item[0] - 40 == endBox.xpos) && (item[1] == endBox.ypos)) {
                marker = 0;
                cameFrom.push([item, [item[0] - 40, item[1]]]);
                drawPath(cameFrom, [endBox.xpos, endBox.ypos]);
                return;

            }
            newnodes.push([item[0] - 40, item[1]]);
            visitednodes.push([item[0] - 40, item[1]]);
            cameFrom.push([item, [item[0] - 40, item[1]]]);
            draw(item[0] - 40, item[1]);
        }
        if (item[1] + 40 <= bh - 40 && !inset(visitednodes, item[0], item[1] + 40) && !inset(wallSet, item[0], item[1] + 40)) {
            if ((item[0] == endBox.xpos) && (item[1] + 40 == endBox.ypos)) {
                marker = 0;
                cameFrom.push([item, [item[0], item[1] + 40]]);
                drawPath(cameFrom, [endBox.xpos, endBox.ypos]);
                return;
            }
            newnodes.push([item[0], item[1] + 40]);
            visitednodes.push([item[0], item[1] + 40]);
            cameFrom.push([item, [item[0], item[1] + 40]]);
            draw(item[0], item[1] + 40);

        }
        if (item[1] - 40 >= 0 && !inset(visitednodes, item[0], item[1] - 40) && !inset(wallSet, item[0], item[1] - 40)) {
            if ((item[0] == endBox.xpos) && (item[1] - 40 == endBox.ypos)) {
                marker = 0;
                cameFrom.push([item, [item[0], item[1] - 40]]);
                drawPath(cameFrom, [endBox.xpos, endBox.ypos]);
                return;
            }
            newnodes.push([item[0], item[1] - 40]);
            visitednodes.push([item[0], item[1] - 40]);
            cameFrom.push([item, [item[0], item[1] - 40]]);
            draw(item[0], item[1] - 40);
        }
    });
    setTimeout(() => {
        add(newnodes, [], visitednodes, marker, cameFrom);
    }, 100)

}



function dijkstras() {
    traversedWeights = new Array(Math.floor(bw / 40) + 1);
    for (var i = 0; i < traversedWeights.length; i++) {
        traversedWeights[i] = new Array(Math.floor(bh / 40) + 1);
    }
    for (var j = 0; j < Math.floor(bw / 40) + 1; j++) {
        for (var i = 0; i < Math.floor(bh / 40) + 1; i++) {
            traversedWeights[j][i] = 99999; // Setting it to a large number, convert this into a variable later.
        }
    }

    cameFrom = new Array(Math.floor(bw / 40) + 1); // Keeps track of where a node was traversed from, 1 -> left, 2 -> right, 3 -> up, 4 -> down
    for (var i = 0; i < cameFrom.length; i++) {
        cameFrom[i] = new Array(Math.floor(bh / 40) + 1);
    }
    for (var j = 0; j < Math.floor(bw / 40) + 1; j++) {
        for (var i = 0; i < Math.floor(bh / 40) + 1; i++) {
            cameFrom[j][i] = 99999; // Setting it to a large number, convert this into a variable later.
        }
    }
    traversedWeights[startBox.xpos / 40][startBox.ypos / 40] = 0; // Set the value of the initial starting point to 0
    currentNodes = [
        [startBox.xpos, startBox.ypos]
    ];
    document.getElementById('static').style.opacity = 0;
    dijkstras_start(currentNodes, traversedWeights, cameFrom, NodesTraversed);
}

function tracePath(xpos, ypos) {
    if (xpos == startBox.xpos && ypos == startBox.ypos) return;
    if (cameFrom[xpos / 40][ypos / 40] == 1) {
        if (!(xpos == endBox.xpos && ypos == endBox.ypos)) {
            context.fillStyle = "#16a085";
            context.fillRect(xpos, ypos, 40, 40);
            context.stroke();
            if (weights[xpos / 40][ypos / 40] != 0.5) {
                context.fillStyle = "#a1e7f7";
                context.fillText(weights[xpos / 40][ypos / 40], xpos + 10, ypos + 30);
            }
        }

        setTimeout(() => {
            tracePath(xpos - 40, ypos);
        }, 100)
    }
    if (cameFrom[xpos / 40][ypos / 40] == 2) {
        if (!(xpos == endBox.xpos && ypos == endBox.ypos)) {
            context.fillStyle = "#16a085";
            context.fillRect(xpos, ypos, 40, 40);
            context.stroke();
            if (weights[xpos / 40][ypos / 40] != 0.5) {
                context.fillStyle = "#a1e7f7";
                context.fillText(weights[xpos / 40][ypos / 40], xpos + 10, ypos + 30);
            }
        }

        setTimeout(() => {
            tracePath(xpos + 40, ypos);
        }, 100)
    }
    if (cameFrom[xpos / 40][ypos / 40] == 3) {
        if (!(xpos == endBox.xpos && ypos == endBox.ypos)) {
            context.fillStyle = "#16a085";
            context.fillRect(xpos, ypos, 40, 40);
            context.stroke();
            if (weights[xpos / 40][ypos / 40] != 0.5) {
                context.fillStyle = "#a1e7f7";
                context.fillText(weights[xpos / 40][ypos / 40], xpos + 10, ypos + 30);
            }
        }

        setTimeout(() => {
            tracePath(xpos, ypos - 40);
        }, 100)
    }
    if (cameFrom[xpos / 40][ypos / 40] == 4) {
        if (!(xpos == endBox.xpos && ypos == endBox.ypos)) {
            context.fillStyle = "#16a085";
            context.fillRect(xpos, ypos, 40, 40);
            context.stroke();
            if (weights[xpos / 40][ypos / 40] != 0.5) {
                context.fillStyle = "#a1e7f7";
                context.fillText(weights[xpos / 40][ypos / 40], xpos + 10, ypos + 30);
            }
        }

        setTimeout(() => {
            tracePath(xpos, ypos + 40);
        }, 100)
    }
}

function dijkstras_start(currentNodes, traversedWeights, cameFrom, NodesTraversed) {
    if (currentNodes.length == traversedWeights.length * (traversedWeights[0].length - 1)) {
        tracePath(endBox.xpos, endBox.ypos);
        document.getElementById('static').style.opacity = 1;
        return;
    }
    xpos = currentNodes[currentNodes.length - 1][0];
    ypos = currentNodes[currentNodes.length - 1][1];
    if (xpos + 40 <= bw && !inset(currentNodes, xpos + 40, ypos) && !inset(wallSet, xpos + 40, ypos) && traversedWeights[(xpos / 40)][ypos / 40] + weights[(xpos / 40) + 1][ypos / 40] < traversedWeights[(xpos / 40) + 1][ypos / 40]) {
        traversedWeights[(xpos / 40) + 1][ypos / 40] = traversedWeights[(xpos / 40)][ypos / 40] + weights[(xpos / 40) + 1][ypos / 40];
        cameFrom[(xpos / 40) + 1][ypos / 40] = 1;
        NodesTraversed.push([xpos + 40, ypos]);
        draw(xpos + 40, ypos);
    }
    if (xpos - 40 >= 0 && !inset(currentNodes, xpos - 40, ypos) && !inset(wallSet, xpos - 40, ypos) && traversedWeights[(xpos / 40)][ypos / 40] + weights[(xpos / 40) - 1][ypos / 40] < traversedWeights[(xpos / 40) - 1][ypos / 40]) {
        traversedWeights[(xpos / 40) - 1][ypos / 40] = traversedWeights[(xpos / 40)][ypos / 40] + weights[(xpos / 40) - 1][ypos / 40];
        cameFrom[(xpos / 40) - 1][ypos / 40] = 2;
        NodesTraversed.push([xpos - 40, ypos]);
        draw(xpos - 40, ypos);
    }
    if (ypos + 40 < bh && !inset(currentNodes, xpos, ypos + 40) && !inset(wallSet, xpos, ypos + 40) && traversedWeights[(xpos / 40)][ypos / 40] + weights[xpos / 40][(ypos / 40) + 1] < traversedWeights[xpos / 40][(ypos / 40) + 1]) {
        traversedWeights[xpos / 40][(ypos / 40) + 1] = traversedWeights[(xpos / 40)][ypos / 40] + weights[xpos / 40][(ypos / 40) + 1];
        cameFrom[(xpos / 40)][(ypos / 40) + 1] = 3;
        NodesTraversed.push([xpos, ypos + 40]);
        draw(xpos, ypos + 40);
    }
    if (ypos - 40 >= 0 && !inset(currentNodes, xpos, ypos - 40) && !inset(wallSet, xpos, ypos - 40) && (traversedWeights[(xpos / 40)][ypos / 40] + weights[xpos / 40][(ypos / 40) - 1]) < traversedWeights[xpos / 40][(ypos / 40) - 1]) {
        traversedWeights[xpos / 40][(ypos / 40) - 1] = traversedWeights[(xpos / 40)][ypos / 40] + weights[xpos / 40][(ypos / 40) - 1];
        cameFrom[(xpos / 40)][(ypos / 40) - 1] = 4;
        NodesTraversed.push([xpos, ypos - 40]);
        draw(xpos, ypos - 40);
    }
    var minSoFar = 100000; // 1 larger than the initial weights of the nodes
    var nodex = -1;
    var nodey = -1;
    for (var j = 0; j < Math.floor(bw / 40) + 1; j++) {
        for (var i = 0; i < Math.floor(bh / 40); i++) {
            if (!inset(currentNodes, j * 40, i * 40)) {
                if (traversedWeights[j][i] < minSoFar) {
                    minSoFar = traversedWeights[j][i];
                    nodex = j * 40;
                    nodey = i * 40;
                }
            }
        }
    }
    currentNodes.push([nodex, nodey]);
    setTimeout(() => {
        dijkstras_start(currentNodes, traversedWeights, cameFrom, NodesTraversed);
    }, 1)
}

function drawPath(cameFrom, curBox) {
    for (let i = 0; i < cameFrom.length; i++) {
        if (curBox[0] == cameFrom[i][1][0] && curBox[1] == cameFrom[i][1][1]) {
            draw_aqua(cameFrom[i][0][0], cameFrom[i][0][1], 0);
            setTimeout(() => {
                drawPath(cameFrom, cameFrom[i][0])
            }, 100);
            document.getElementById('static').style.opacity = 1;
            break;
        }
    }
}

function skipTutorial() {
    currentSlide = "tutorial" + pageNum.toString();
    document.getElementById(currentSlide).style.display = "none";
    pageNum = 20;
}

function nextPage() {
    currentSlide = "tutorial" + pageNum.toString();
    document.getElementById(currentSlide).style.display = "none";
    pageNum += 1;
    if (pageNum < 11) {
        currentSlide = "tutorial" + pageNum.toString();
        document.getElementById(currentSlide).style.display = "block";
    }
    if (pageNum == 4) {
        document.getElementById("arrow").style.display = "block";
    } else {
        document.getElementById("arrow").style.display = "none";
    }
    if (pageNum == 6) {
        document.getElementById("arrowEnd").style.display = "block";
    } else {
        document.getElementById("arrowEnd").style.display = "none";
    }
    if (pageNum == 8) {
        document.getElementById("arrowWall").style.display = "block";
    } else {
        document.getElementById("arrowWall").style.display = "none";
    }
    if (pageNum == 9) {
        document.getElementById("arrowAlgo").style.display = "block";
    } else {
        document.getElementById("arrowAlgo").style.display = "none";
    }
    if (pageNum == 10) {
        document.getElementById("arrowStart").style.display = "block";
    } else {
        document.getElementById("arrowStart").style.display = "none";
    }
    if (pageNum == 8) {
        setTimeout(() => {
            nextPage();
        }, 7000)
    }
    if (pageNum == 11) {
        skipTutorial();
    }

}

function prevPage() {
    if (pageNum == 1) {
        document.getElementById("prev").disabled = true;
        return;
    }

    currentSlide = "tutorial" + pageNum.toString();
    document.getElementById(currentSlide).style.display = "none";
    pageNum -= 1;
    currentSlide = "tutorial" + pageNum.toString();
    document.getElementById(currentSlide).style.display = "block";

    if (pageNum == 4) {
        document.getElementById("arrow").style.display = "block";
    } else {
        document.getElementById("arrow").style.display = "none";
    }
    if (pageNum == 6) {
        document.getElementById("arrowEnd").style.display = "block";
    } else {
        document.getElementById("arrowEnd").style.display = "none";
    }
    if (pageNum == 8) {
        document.getElementById("arrowWall").style.display = "block";
    } else {
        document.getElementById("arrowWall").style.display = "none";
    }
    if (pageNum == 9) {
        document.getElementById("arrowAlgo").style.display = "block";
    } else {
        document.getElementById("arrowAlgo").style.display = "none";
    }
    if (pageNum == 10) {
        document.getElementById("arrowStart").style.display = "block";
    } else {
        document.getElementById("arrowStart").style.display = "none";
    }
    if (pageNum == 8) {
        setTimeout(() => {
            nextPage();
        }, 7000)
    }
    if (pageNum == 11) {
        skipTutorial();
    }
}



function GenerateRandomWeights() {
    clear_slate();
    for (var j = 0; j < Math.floor(bw / 40) + 1; j++) {
        for (var i = 0; i < Math.floor(bh / 40); i++) {
            weights[j][i] = Math.floor((Math.random() * 9) + 1);
            context.font = "30px Arial";
            context.fillStyle = "#ffffff";
            context.fillText(weights[j][i], j * 40 + 10, i * 40 + 30);
            context.stroke();
        }
    }
}