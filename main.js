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

algorithm = 0; // What algorithm to be used (1 -> A*,  2 -> dijkstras, 3 -> BFS)

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
    console.log(x, y);

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
    if (x < 0 || x > 1480 || y < 0 || y > 800) {
        return;
    }
    if (startBox.xpos != -1 && startBox.ypos != -1) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(startBox.xpos, startBox.ypos, 40, 40);
        context.stroke();
    }
    startBox.xpos = x;
    startBox.ypos = y;
    context.fillStyle = "#00FF00";
    context.fillRect(x, y, 40, 40);
    context.stroke();
}

function end_block(xpos, ypos) {
    xpos = xpos - 28 - 200;
    ypos = ypos - 28;
    var x = Math.floor(xpos / 40) * 40;
    var y = Math.floor(ypos / 40) * 40;
    if (x < 0 || x > 1480 || y < 0 || y > 800) {
        return;
    }
    if (endBox.xpos != -1 && endBox.ypos != -1) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(endBox.xpos, endBox.ypos, 40, 40);
        context.stroke();
    }

    console.log(x, y);

    endBox.xpos = x;
    endBox.ypos = y;
    context.fillStyle = "#a11d1f";
    context.fillRect(x, y, 40, 40);
    context.stroke();
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
        start_block(event.pageX + 10, event.pageY - 46);
    }

    if (state_val == 2) {
        end_block(event.pageX + 10, event.pageY - 46);
    }

    if (state_val == 3) {
        wall_block(event.pageX + 10, event.pageY - 46);
    }

};
onmousemove = function (e) {
    lightUpSquare(event.pageX, event.pageY-56);

}



var state_var = 0;

function start_state() {
    state_val = 1;
}

function end_state() {
    state_val = 2;
}

function wall_state() {
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
}

function dijkstra_mode() {
    algorithm = 2;
    $("#dropdownMenuButton").text('dijkstra');
}

function bfs_mode() {
    algorithm = 3;
    $("#dropdownMenuButton").text('BFS');
}

function start_algo() {
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
    console.log("ABCDEFG!");
    console.log(xpos, ypos);
    if (xpos == endBox.xpos && ypos == endBox.ypos) {
        return;
    }
    context.fillStyle = "#32d6db";
    context.fillRect(xpos, ypos, 40, 40);
    context.stroke();
}

function draw_yellow(xpos, ypos) {
    console.log("BOII");
    console.log(xpos, ypos);
    if (xpos == startBox.xpos && ypos == startBox.ypos) {
        return;
    }
    context.fillStyle = "#18859e";
    context.fillRect(xpos, ypos, 40, 40);
    context.stroke();
}

const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}

newnodes1 = [];

function bfs() {
    console.log("AD");
    nodes = [
        [startBox.xpos, startBox.ypos]
    ];
    console.log(nodes[0][0]);
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
            console.log(item);
            console.log(visitednodes);
            if (item[0] + 40 <= 1480 && !inset(visitednodes, item[0] + 40, item[1]) && !inset(wallSet, item[0] + 40, item[1])) {
                if ((item[0] + 40 == endBox.xpos) && (item[1] == endBox.ypos)) {
                    alert("FOUND IT!");
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
                    alert("FOUND IT!");
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
                if (item[1] + 40 <= 800 && !inset(visitednodes, item[0], item[1] + 40) && !inset(wallSet, item[0], item[1] + 40)) {
                    if ((item[0] == endBox.xpos) && (item[1] + 40 == endBox.ypos)) {
                        alert("FOUND IT!");
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
                        alert("FOUND IT!");
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
            }); console.log(visitednodes); setTimeout(() => {
            add(newnodes, [], visitednodes, marker, cameFrom);
        }, 100)

    }

    function drawPath(cameFrom, curBox) {
        for (let i = 0; i < cameFrom.length; i++) {
            if (curBox[0] == cameFrom[i][1][0] && curBox[1] == cameFrom[i][1][1]) {
                draw_yellow(cameFrom[i][0][0], cameFrom[i][0][1]);
                setTimeout(() => {
                    drawPath(cameFrom, cameFrom[i][0])
                }, 100);
                break;
            }
        }



    }