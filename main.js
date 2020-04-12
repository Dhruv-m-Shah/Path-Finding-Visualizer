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
            context.strokeStyle = "#a1e7f7";
            context.rect(x, y, 40, 40);
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

    if (inset(wallSet, x, y)) {
        return;
    }
    if (inset(visitednodes, x, y)) {
        return;
    }

    if (x != previousGrid.xpos || y != previousGrid.ypos) {
        if ((previousGrid.xpos == startBox.xpos && previousGrid.ypos == startBox.ypos) ||
            (previousGrid.xpos == endBox.xpos && previousGrid.ypos == endBox.ypos) ||
            inset(wallSet, previousGrid.xpos, previousGrid.ypos) ||
            inset(visitednodes, previousGrid.xpos, previousGrid.ypos)) {
            context.fillStyle = "#32d6db";
            context.fillRect(x, y, 40, 40);
            context.stroke();
            previousGrid.xpos = x;
            previousGrid.ypos = y;
            return;
        }
        context.fillStyle = "#FFFFFF"
        context.fillRect(previousGrid.xpos, previousGrid.ypos, 40, 40);
        context.fillStyle = "#32d6db";
        context.fillRect(x, y, 40, 40);
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
    if (startBox.xpos != -1 && startBox.ypos != -1) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(startBox.xpos, startBox.ypos, 40, 40);
        context.stroke();
    }
    context.fillStyle = "#FFFFFF";
    context.fillRect(x, y, 40, 40);
    context.stroke();
    var img = document.createElement("img");
    img.src = "imgs\\flag.png";
    context.imageSmoothingEnabled = false;
    startBox.xpos = x;
    startBox.ypos = y;
    landing_animation_start(img, x - 6, y - 10, 30, 0);

}

function landing_animation_start(img, xpos, ypos, size, count) {
    if (count == 30) {
        return;
    }
    context.fillStyle = "#FFFFFF";
    context.fillRect(xpos + 6, ypos + 10, 40, 40);
    context.stroke();
    context.imageSmoothingEnabled = false;
    context.drawImage(img, xpos, ypos + 1, 30 + count, 30 + count);

    setTimeout(() => {
        landing_animation_start(img, xpos, ypos, size, count + 1);
    }, 5)

}


function end_block(xpos, ypos) {
    xpos = xpos - 28 - 200;
    ypos = ypos - 28;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    if (x < 0 || x > bw || y < 0 || y > bh) {
        return;
    }

    if (endBox.xpos != -1 && endBox.ypos != -1) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(endBox.xpos, endBox.ypos, 40, 40);
        context.stroke();
    }

    context.fillStyle = "#FFFFFF";
    context.fillRect(x, y, 40, 40);
    context.stroke();
    endBox.xpos = x;
    endBox.ypos = y;
    var img = document.createElement("img");
    img.src = "imgs\\End.png";
    context.imageSmoothingEnabled = false;
    context.drawImage(img, x + 5, y + 5, 30, 30);
    wall_marker = 0;
    landing_animation_end(img, x + 5, y + 5, 0, 0);
}


function landing_animation_end(img, xpos, ypos, size, count) {
    if (count == 30) {
        return;
    }
    if (wall_marker == 1) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(xpos - 5, ypos - 5, 40, 40);
        context.stroke();
        return;
    }
    context.fillStyle = "#FFFFFF";
    context.fillRect(xpos - 5, ypos - 5, 40, 40);
    context.stroke();
    context.imageSmoothingEnabled = false;
    context.drawImage(img, xpos, ypos, count, count);

    setTimeout(() => {
        landing_animation_end(img, xpos, ypos, size, count + 1);
    }, 5)

}

function wall_block(xpos, ypos) {
    xpos = xpos - 28 - 200;
    ypos = ypos - 28;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    wallSet.push([x, y]);
    context.fillStyle = "#75402b";
    context.fillRect(x, y, 40, 40);
    context.stroke();
}




document.onclick = function (event) {

    if (state_val == 1) {
        start_block(event.pageX + 197, event.pageY - 88);
    }

    if (state_val == 2) {
        wall_marker = 1;
        end_block(event.pageX + 197, event.pageY - 88);
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

var disable = 0;
function start_state() {
    document.getElementById("startBut").style.fontWeight = "bold";
    document.getElementById("endBut").style.fontWeight = "normal";
    document.getElementById("wallBut").style.fontWeight = "normal";
    document.getElementById("arrow").style.display = "none";
    state_val = 1;
}

function end_state() {
    document.getElementById("startBut").style.fontWeight = "normal";
    document.getElementById("endBut").style.fontWeight = "bold";
    document.getElementById("wallBut").style.fontWeight = "normal";
    document.getElementById("arrowEnd").style.display = "none";
    state_val = 2;
}

function wall_state() {
    document.getElementById("startBut").style.fontWeight = "normal";
    document.getElementById("endBut").style.fontWeight = "normal";
    document.getElementById("wallBut").style.fontWeight = "Bold";
    document.getElementById("arrowWall").style.display = "none";
    state_val = 3;
}

function clear_slate() {
    state_val = 0;
    wallSet = [];
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
            context.fillStyle = "#FFFFFF";
            context.fillRect(x, y, 40, 40);
        }
    }
    context.stroke();

}


function aStar_mode() {
    algorithm = 1;
    $("#dropdownMenuButton").text('A*');
    document.getElementById("navbarDropdown").innerText = 'A*';
    document.getElementById("arrowAlgo").style.display = "none";
}

function dijkstra_mode() {
    algorithm = 2;
    document.getElementById("navbarDropdown").innerText = 'Dijkstra';
    document.getElementById("arrowAlgo").style.display = "none";
}

function bfs_mode() {
    algorithm = 3;
    document.getElementById("navbarDropdown").innerText = 'BFS';
    document.getElementById("arrowAlgo").style.display = "none";
}

function start_algo() {
    document.getElementById("arrowStart").style.display = "none";

    if (algorithm == 1) {
        A();
    }
    if (algorithm == 2) {
        dijkstra();
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
    console.log(xpos, ypos);
    if (xpos == endBox.xpos && ypos == endBox.ypos) {
        return;
    }
    context.fillStyle = "#32d6db";
    context.fillRect(xpos, ypos, 40, 40);
    context.stroke();
}



function draw_aqua(xpos, ypos, count) {
    if (count == 42) {
        return;
    }
    if (xpos == startBox.xpos && ypos == startBox.ypos) {
        return;
    }
    context.fillStyle = "#18859e";
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

function drawPath(cameFrom, curBox) {
    for (let i = 0; i < cameFrom.length; i++) {
        if (curBox[0] == cameFrom[i][1][0] && curBox[1] == cameFrom[i][1][1]) {
            draw_aqua(cameFrom[i][0][0], cameFrom[i][0][1], 0);
            setTimeout(() => {
                drawPath(cameFrom, cameFrom[i][0])
            }, 100);
            break;
        }
    }
}

function skipTutorial() {
    currentSlide = "tutorial" + pageNum.toString();
    document.getElementById(currentSlide).style.display = "none";
}

function nextPage() {
    currentSlide = "tutorial" + pageNum.toString();
    document.getElementById(currentSlide).style.display = "none";
    pageNum += 1;
    if (pageNum < 9) {
        currentSlide = "tutorial" + pageNum.toString();
        document.getElementById(currentSlide).style.display = "block";
    }
    if (pageNum == 4) {
        document.getElementById("arrow").style.display = "block";
    } else {
        document.getElementById("arrow").style.display = "none";
    }
    if (pageNum == 5) {
        document.getElementById("arrowEnd").style.display = "block";
    } else {
        document.getElementById("arrowEnd").style.display = "none";
    }
    if (pageNum == 6) {
        document.getElementById("arrowWall").style.display = "block";
    } else {
        document.getElementById("arrowWall").style.display = "none";
    }
    if (pageNum == 7) {
        document.getElementById("arrowAlgo").style.display = "block";
    } else {
        document.getElementById("arrowAlgo").style.display = "none";
    }
    if (pageNum == 8) {
        document.getElementById("arrowStart").style.display = "block";
    } else {
        document.getElementById("arrowStart").style.display = "none";
    }
    if (pageNum == 10) {
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
    if (pageNum == 5) {
        document.getElementById("arrowEnd").style.display = "block";
    } else {
        document.getElementById("arrowEnd").style.display = "none";
    }
    if (pageNum == 6) {
        document.getElementById("arrowWall").style.display = "block";
    } else {
        document.getElementById("arrowWall").style.display = "none";
    }
    if (pageNum == 7) {
        document.getElementById("arrowAlgo").style.display = "block";
    } else {
        document.getElementById("arrowAlgo").style.display = "none";
    }
    if (pageNum == 8) {
        document.getElementById("arrowStart").style.display = "block";
    } else {
        document.getElementById("arrowStart").style.display = "none";
    }

    if (pageNum == 9) {
        skipTutorial();
    }

}