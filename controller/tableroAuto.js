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
let size = parseInt(urlParams.get("size")) || 10;
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

for (let i = 0; i < position.length; i++) {
    let horizontal = document.createElement("div");
    position[i].appendChild(horizontal);
    horizontal.className = "horizontal " + i;
    let vertical = document.createElement("div");
    position[i].appendChild(vertical);
    vertical.className = "vertical " + i;
}
// Función para ubicar automáticamente los barcos
function placeShipsAutomatically(matrixType, quantityArray, type) {
    for (let i = 0; i < quantityArray.length; i++) {
        for (let j = 0; j < quantityArray[i]; j++) {
            while (!randomPlacement(matrixType, i, type)) {}
        }
    }
}

// Coloca un barco aleatoriamente en la matriz
function randomPlacement(matrixType, shipIndex, type) {
    let shipSize = sizeShip[shipIndex];
    let position = positionArray[Math.floor(Math.random() * positionArray.length)];
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    let shipClass = `ship-${shipSize}`;

    // Verificar si el barco cabe y no se superpone
    if (position === "horizontal" && y + shipSize <= size) {
        for (let j = y; j < y + shipSize; j++) {
            if (matrixType[x][j] === "ship") return false;
        }
        for (let j = y; j < y + shipSize; j++) {
            matrixType[x][j] = "ship";
            document.getElementById(`${x},${j},${type}`).classList.add("selected", shipClass);
        }
        return true;
    }
    
    if (position === "vertical" && x + shipSize <= size) {
        for (let j = x; j < x + shipSize; j++) {
            if (matrixType[j][y] === "ship") return false;
        }
        for (let j = x; j < x + shipSize; j++) {
            matrixType[j][y] = "ship";
            document.getElementById(`${j},${y},${type}`).classList.add("selected", shipClass);
        }
        return true;
    }
    return false;
}

function resetShips(matrixType, type) {
    // Limpiar barcos actuales del tablero y matriz
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrixType[i][j] === "ship") {
                matrixType[i][j] = ""; // Eliminar barco de la matriz
                document.getElementById(`${i},${j},${type}`).classList.remove("selected"); // Quitar clase visual
            }
        }
    }

    for (let shipIndex = 0; shipIndex < sizeShip.length; shipIndex++) {
        for (let count = 0; count < quantityShip[shipIndex]; count++) {
            let placed = false;
            while (!placed) {
                placed = randomPlacement(matrixType, shipIndex, type);
            }
        }
    }
}
// Crear el tablero del jugador y colocar barcos
createMatrix(board, matrix, randomPlacement, "player");
placeShipsAutomatically(matrix, quantityShip, "player");

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

document.querySelector(".estrategiaBtn").addEventListener("click", () => {
    resetBoard();
    placeShipsAutomatically(matrix, quantityShip, "player");
});

function resetBoard() {
    // Vaciar el contenido del tablero
    board.innerHTML = "";

    // Reiniciar la matriz vacía
    matrix = Array.from({ length: size }, () => Array(size).fill(""));

    // Volver a crear el tablero con eventos
    createMatrix(board, matrix, randomPlacement, "player");
}

