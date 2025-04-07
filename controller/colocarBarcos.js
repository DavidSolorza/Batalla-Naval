//Codigo de como ubica el PC sus barcos

let turnoJugador = true; 
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