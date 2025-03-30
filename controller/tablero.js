const board = document.querySelector("#board");
const boardAttack = document.querySelector("#boardAttack");
const position = document.querySelectorAll(".position");
let matrix = [];
let matrixAttack = [];
const sizeShip = [5, 4, 3, 2];
const positionArray = ["horizontal", "vertical"];
let quantityShip = [1, 1, 2, 2];
let quantityShipPC = [1, 1, 2, 2];
let ship = {};
let shipRandom = {};

const urlParams = new URLSearchParams(window.location.search);
let size = parseInt(urlParams.get("size"))||10 ;
console.log("Tamaño del tablero:", size);

function createMatrix(boardType, matrixType, func, type) {
    for (let i = 0; i < size; i++) {
        let list = [];
        let row = document.createElement("div");
        boardType.appendChild(row);
        row.className = "myRow";
        for (let j = 0; j < size; j++) {
            let grid = document.createElement("div");
            row.appendChild(grid);
            grid.className = "grid";
            grid.id = `${i},${j},${type}`;
            grid.addEventListener("click", func);
            list.push("");
        }
        matrixType.push(list);
    }
}

function selectShip(event) {
    shipData = event.target.className.split(" ");
    ship.position = shipData[0];
    ship.size = sizeShip[shipData[1]];
    ship.quantity = quantityShip[shipData[1]];
    ship.id = shipData[1];
}

createMatrix(board, matrix, selectPosition, "player");

for (let i = 0; i < position.length; i++) {
    let horizontal = document.createElement("div");
    position[i].appendChild(horizontal);
    horizontal.className = "horizontal " + i;
    horizontal.addEventListener("click", selectShip);
    let vertical = document.createElement("div");
    position[i].appendChild(vertical);
    vertical.className = "vertical " + i;
    vertical.addEventListener("click", selectShip);
}

function selectPosition(event) {
    if (ship.quantity > 0) {
        let grid = event.target;
        let gridID = grid.id.split(",");
        let x = parseInt(gridID[0]);
        let y = parseInt(gridID[1]);
        if (ship.position === "horizontal") {
            if (y + (ship.size - 1) < size) {
                for (let i = y; i < y + ship.size; i++) {
                    matrix[x][i] = "ship";
                    document.getElementById(`${x},${i},player`).classList.add("selected");
                }
                quantityShip[ship.id] -= 1;
                ship = {};
            } else {
                alert("Selecciona una posición válida");
            }
        } else if (ship.position === "vertical") {
            if (x + (ship.size - 1) < size) {
                for (let i = x; i < x + ship.size; i++) {
                    matrix[i][y] = "ship";
                    document.getElementById(`${i},${y},player`).classList.add("selected");
                }
                quantityShip[ship.id] -= 1;
                ship = {};
            } else {
                alert("Selecciona una posición válida");
            }
        }
    } else {
        alert("Debes seleccionar un barco disponible");
    }
}

function startGame() {
    createMatrix(boardAttack, matrixAttack, checkShot, "pc");
    window.selectPositionRandom();
    document.querySelector("#button").disabled = true;
}

// function selectPositionRandom() {
//     for (let i = 0; i < quantityShipPC.length; i++) {
//         while (quantityShipPC[i] > 0) {
//             random(i);
//             quantityShipPC[i] -= 1;
//         }
//     }
// }

// function checkPosition(pos, axis, size) {
//     if (shipRandom.position === pos) {
//         return axis + (size - 1) < size;
//     }
// }

// function random(i) {
//     shipRandom.position = positionArray[Math.floor(Math.random() * positionArray.length)];
//     shipRandom.x = Math.floor(Math.random() * size);
//     shipRandom.y = Math.floor(Math.random() * size);
//     if (checkPosition("horizontal", shipRandom.y, sizeShip[i])) {
//         for (let j = shipRandom.y; j < shipRandom.y + sizeShip[i]; j++) {
//             if (matrixAttack[shipRandom.x][j] === "ship") return random(i);
//         }
//         for (let j = shipRandom.y; j < shipRandom.y + sizeShip[i]; j++) {
//             matrixAttack[shipRandom.x][j] = "ship";
//         }
//     } else if (checkPosition("vertical", shipRandom.x, sizeShip[i])) {
//         for (let j = shipRandom.x; j < shipRandom.x + sizeShip[i]; j++) {
//             if (matrixAttack[j][shipRandom.y] === "ship") return random(i);
//         }
//         for (let j = shipRandom.x; j < shipRandom.x + sizeShip[i]; j++) {
//             matrixAttack[j][shipRandom.y] = "ship";
//         }
//     } else {
//         return random(i);
//     }
// }

// function checkShot(event) {
//     let grid = event.target;
//     let gridID = grid.id.split(",");
//     let x = parseInt(gridID[0]);
//     let y = parseInt(gridID[1]);
//     if (matrixAttack[x][y] === "ship") {
//         matrixAttack[x][y] = "hit";
//         document.getElementById(`${x},${y},pc`).classList.add("hit");
//         checkWinner(matrixAttack, "player");
//     } else {
//         matrixAttack[x][y] = "miss";
//         document.getElementById(`${x},${y},pc`).classList.add("miss");
//         shotPc();
//     }
// }


// let lastHits = []; // Guarda los golpes recientes
// let directions = ["up", "down", "left", "right"];
// let currentDirection = null;
// let huntingMode = false;

// function shotPc() {
//     let x, y;

//     if (huntingMode && lastHits.length > 0) {
//         // Seguir atacando en la dirección actual
//         let target = getNextTarget(lastHits[lastHits.length - 1][0], lastHits[lastHits.length - 1][1]);
//         x = target[0];
//         y = target[1];
//     } else {
//         // Disparo inicial con patrón inteligente
//         let target = getSmartRandomShot();
//         x = target[0];
//         y = target[1];
//     }

//     if (matrix[x][y] === "ship") {
//         matrix[x][y] = "hit";
//         document.getElementById(`${x},${y},player`).classList.add("hit");
//         lastHits.push([x, y]); // Guardar golpe
//         huntingMode = true; // Activar modo caza
//         checkWinner(matrix, "pc");
//         return shotPc(); // Seguir atacando hasta hundirlo
//     } else if (matrix[x][y] === "hit" || matrix[x][y] === "miss") {
//         return shotPc(); // No perder turnos en casillas ya atacadas
//     } else {
//         matrix[x][y] = "miss";
//         document.getElementById(`${x},${y},player`).classList.add("miss");
        
//         if (huntingMode) {
//             changeDirection(); // Cambia de dirección si falló en modo caza
//         }
//     }
// }

// function getNextTarget(x, y) {
//     let possibleTargets = [];

//     if (!currentDirection) {
//         currentDirection = directions[Math.floor(Math.random() * directions.length)];
//     }

//     let newX = x, newY = y;
//     switch (currentDirection) {
//         case "up": newX--; break;
//         case "down": newX++; break;
//         case "left": newY--; break;
//         case "right": newY++; break;
//     }

//     if (isValid(newX, newY) && matrix[newX][newY] !== "hit" && matrix[newX][newY] !== "miss") {
//         possibleTargets.push([newX, newY]);
//     }

//     return possibleTargets.length > 0 ? possibleTargets[0] : getSmartRandomShot();
// }

// function getSmartRandomShot() {
//     let x, y;
//     do {
//         x = Math.floor(Math.random() * size);
//         y = Math.floor(Math.random() * size);
//     } while (matrix[x][y] === "hit" || matrix[x][y] === "miss");
//     return [x, y];
// }

// function changeDirection() {
//     directions = directions.filter(dir => dir !== currentDirection);
//     if (directions.length === 0) {
//         lastHits = []; 
//         huntingMode = false;
//         directions = ["up", "down", "left", "right"];
//     } else {
//         currentDirection = directions[Math.floor(Math.random() * directions.length)];
//     }
// }

// function isValid(x, y) {
//     return x >= 0 && x < size && y >= 0 && y < size;
// }

// function checkWinner(matrix, player) {
//     if (!matrix.flat().includes("ship")) {
//         alert(player === "pc" ? "Ha ganado el PC" : "¡GANASTE!");
//     }
// }

