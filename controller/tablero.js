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
    if (ship.quantity <= 0) {
        alert("Debes seleccionar un barco disponible");
        return;
    }

    let grid = event.target;
    let gridID = grid.id.split(",");
    let x = parseInt(gridID[0]);
    let y = parseInt(gridID[1]);

    let canPlace = true;

    // Validar que el barco quepa y no se sobreponga
    if (ship.position === "horizontal") {
        if (y + ship.size > size) {
            alert("Selecciona una posición válida (fuera de límites)");
            return;
        }

        // Verificar superposición
        for (let i = 0; i < ship.size; i++) {
            if (matrix[x][y + i] === "ship") {
                canPlace = false;
                break;
            }
        }

        if (!canPlace) {
            alert("Ya hay un barco en esa posición");
            return;
        }

        // Colocar barco
        for (let i = 0; i < ship.size; i++) {
            matrix[x][y + i] = "ship";
            document.getElementById(`${x},${y + i},player`).classList.add("selected", `ship-${ship.size}`);
        }
    } else if (ship.position === "vertical") {
        if (x + ship.size > size) {
            alert("Selecciona una posición válida (fuera de límites)");
            return;
        }

        // Verificar superposición
        for (let i = 0; i < ship.size; i++) {
            if (matrix[x + i][y] === "ship") {
                canPlace = false;
                break;
            }
        }

        if (!canPlace) {
            alert("Ya hay un barco en esa posición");
            return;
        }

        // Colocar barco
        for (let i = 0; i < ship.size; i++) {
            matrix[x + i][y] = "ship";
            document.getElementById(`${x + i},${y},player`).classList.add("selected", `ship-${ship.size}`);
        }
    }

    quantityShip[ship.id]--;
    ship = {};
}


// Iniciar el juego y crear el tablero de la PC
function startGame() {
    if (boardAttack.children.length > 0) return;
    createMatrix(boardAttack, matrixAttack, checkShot, "pc");
    window.selectPositionRandom();
    document.querySelector("#button").disabled = true;
    exportBoardsAsText();
}


function exportBoardsAsText() {
    function mapMatrix(matrix) {
        return matrix.map(row =>
            row.map(cell => cell === "ship" ? "⬜" : "🟦")
        );
    }

    function matrixToText(matrix) {
        return matrix.map(row => row.join("")).join("\n");
    }

    const playerMatrix = mapMatrix(matrix);
    const pcMatrix = mapMatrix(matrixAttack);

    const textContent = `=== PLAYER ===\n${matrixToText(playerMatrix)}\n\n=== PC ===\n${matrixToText(pcMatrix)}`;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tableros.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
