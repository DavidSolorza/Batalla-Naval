
console.log("Tamaño del tablero:", size);

window.selectPositionRandom = function() {
    for (let i = 0; i < quantityShipPC.length; i++) {
        while (quantityShipPC[i] > 0) {
            random(i);
            quantityShipPC[i] -= 1;
        }
    }
}

function checkPosition(pos, axis, size) {
    if (shipRandom.position === pos) {
        return axis + (size - 1) < size;
    }
}

function random(i) {
    shipRandom.position = positionArray[Math.floor(Math.random() * positionArray.length)];
    shipRandom.x = Math.floor(Math.random() * size);
    shipRandom.y = Math.floor(Math.random() * size);
    if (checkPosition("horizontal", shipRandom.y, sizeShip[i])) {
        for (let j = shipRandom.y; j < shipRandom.y + sizeShip[i]; j++) {
            if (matrixAttack[shipRandom.x][j] === "ship") return random(i);
        }
        for (let j = shipRandom.y; j < shipRandom.y + sizeShip[i]; j++) {
            matrixAttack[shipRandom.x][j] = "ship";
        }
    } else if (checkPosition("vertical", shipRandom.x, sizeShip[i])) {
        for (let j = shipRandom.x; j < shipRandom.x + sizeShip[i]; j++) {
            if (matrixAttack[j][shipRandom.y] === "ship") return random(i);
        }
        for (let j = shipRandom.x; j < shipRandom.x + sizeShip[i]; j++) {
            matrixAttack[j][shipRandom.y] = "ship";
        }
    } else {
        return random(i);
    }
}
function checkShot(event)  {
    let grid = event.target;
    let gridID = grid.id.split(",");
    let x = parseInt(gridID[0]);
    let y = parseInt(gridID[1]);
    if (matrixAttack[x][y] === "ship") {
        matrixAttack[x][y] = "hit";
        document.getElementById(`${x},${y},pc`).classList.add("hit");
        checkWinner(matrixAttack, "player");
    } else {
        matrixAttack[x][y] = "miss";
        document.getElementById(`${x},${y},pc`).classList.add("miss");
        shotPc();
    }
}

let lastHits = []; // Guarda los golpes recientes
let directions = ["up", "down", "left", "right"];
let currentDirection = null;
let huntingMode = false;

function shotPc() {
    let x, y;

    if (huntingMode && lastHits.length > 0) {
        // Seguir atacando en la dirección actual
        let target = getNextTarget(lastHits[lastHits.length - 1][0], lastHits[lastHits.length - 1][1]);
        x = target[0];
        y = target[1];
    } else {
        // Disparo inicial con patrón inteligente
        let target = getSmartRandomShot();
        x = target[0];
        y = target[1];
    }

    if (matrix[x][y] === "ship") {
        matrix[x][y] = "hit";
        document.getElementById(`${x},${y},player`).classList.add("hit");
        lastHits.push([x, y]); // Guardar golpe
        huntingMode = true; // Activar modo caza
        checkWinner(matrix, "pc");
        return shotPc(); // Seguir atacando hasta hundirlo
    } else if (matrix[x][y] === "hit" || matrix[x][y] === "miss") {
        return shotPc(); // No perder turnos en casillas ya atacadas
    } else {
        matrix[x][y] = "miss";
        document.getElementById(`${x},${y},player`).classList.add("miss");
        
        if (huntingMode) {
            changeDirection(); // Cambia de dirección si falló en modo caza
        }
    }
}

function getNextTarget(x, y) {
    let possibleTargets = [];

    if (!currentDirection) {
        currentDirection = directions[Math.floor(Math.random() * directions.length)];
    }

    let newX = x, newY = y;
    switch (currentDirection) {
        case "up": newX--; break;
        case "down": newX++; break;
        case "left": newY--; break;
        case "right": newY++; break;
    }

    if (isValid(newX, newY) && matrix[newX][newY] !== "hit" && matrix[newX][newY] !== "miss") {
        possibleTargets.push([newX, newY]);
    }

    return possibleTargets.length > 0 ? possibleTargets[0] : getSmartRandomShot();
}

function getSmartRandomShot() {
    let x, y;
    do {
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
    } while (matrix[x][y] === "hit" || matrix[x][y] === "miss");
    return [x, y];
}

function changeDirection() {
    directions = directions.filter(dir => dir !== currentDirection);
    if (directions.length === 0) {
        lastHits = []; 
        huntingMode = false;
        directions = ["up", "down", "left", "right"];
    } else {
        currentDirection = directions[Math.floor(Math.random() * directions.length)];
    }
}

function isValid(x, y) {
    return x >= 0 && x < size && y >= 0 && y < size;
}

function checkWinner(matrix, player) {
    if (!matrix.flat().includes("ship")) {
        alert(player === "pc" ? "Ha ganado el PC" : "¡GANASTE!");
    }
}


