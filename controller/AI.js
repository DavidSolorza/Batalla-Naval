

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
class Puntuacion {
    constructor() {
        this.puntos = 0;
    }

    acierto() {
        this.puntos += 10;
        this.actualizarPuntaje();
    }

    fallo(tablero, x, y) {
        if (this.estaCercaDeBarco(tablero, x, y)) {
            this.puntos -= 3;
        } else {
            this.puntos -= 1;
        }
        this.actualizarPuntaje();
    }

    estaCercaDeBarco(tablero, x, y) {
        const direcciones = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],         [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (let [dx, dy] of direcciones) {
            let nx = x + dx;
            let ny = y + dy;

            if (nx >= 0 && ny >= 0 && nx < tablero.length && ny < tablero[0].length) {
                if (tablero[nx][ny] === "ship") {
                    return true;
                }
            }
        }
        return false;
    }

    actualizarPuntaje() {
        const scoreElement = document.getElementById("player-score");
        if (scoreElement) {
            scoreElement.textContent = this.puntos;
        }
    }
}

const puntuacion = new Puntuacion();

function checkShot(event) {
    let grid = event.target;
    let gridID = grid.id.split(",");
    let x = parseInt(gridID[0]);
    let y = parseInt(gridID[1]);
    const explosion = document.getElementById("explosion");
    const agua = document.getElementById("agua");

    if (matrixAttack[x][y] === "hit" || matrixAttack[x][y] === "miss") {
        return; 
    }
    
    if (matrixAttack[x][y] === "ship") {
        matrixAttack[x][y] = "hit";
        document.getElementById(`${x},${y},pc`).classList.add("hit");
        explosion.currentTime = 0;
        explosion.play();
        puntuacion.acierto();
        checkWinner(matrixAttack, "player");
    } else {
        matrixAttack[x][y] = "miss";
        document.getElementById(`${x},${y},pc`).classList.add("miss");
        agua.currentTime = 1;
        agua.play();
        puntuacion.fallo(matrixAttack, x, y);
        shotPc();
    }
}


let lastHits = []; // Guarda los golpes recientes en un barco
let sunkShips = []; // Guarda las coordenadas de barcos hundidos
let hitShips = {}; // Guarda barcos golpeados pero no hundidos
let huntingMode = false;
let directions = ["up", "down", "left", "right"];
let currentDirection = null;
let targetShip = []; // Guarda todas las coordenadas de un barco en proceso de hundimiento
let consecutiveHits = 0; // Contador de golpes en la misma dirección

function shotPc() {
    let x, y;
    const agua = document.getElementById("agua");
    const explosion = document.getElementById("explosion");

    setTimeout(() => { // 🔄 Agrega un pequeño retraso entre disparos
        // 🟢 **Modo de caza: continuar atacando el mismo barco**
        if (huntingMode && lastHits.length > 0) {
            let target = getNextTarget();
            x = target[0];
            y = target[1];
        } 
        // 🔵 **Exploración inicial con patrón inteligente**
        else {
            let target = getSmartPatternShot();
            x = target[0];
            y = target[1];
        }

        // 🔥 **Impacto**
        if (matrix[x][y] === "ship") {
            matrix[x][y] = "hit";
            document.getElementById(`${x},${y},player`).classList.add("hit");
            explosion.currentTime = 0;
            explosion.play();

            lastHits.push([x, y]); // Guardar golpe
            targetShip.push([x, y]); // Agregar al barco en proceso de hundimiento
            huntingMode = true; // Activar modo caza
            consecutiveHits++; // Incrementa el contador de golpes seguidos en la misma dirección

            // Guardar golpe en memoria
            hitShips[`${x},${y}`] = true;

            // **Si lo hunde, reinicia el modo de ataque**
            if (checkIfShipSunk()) {
                sunkShips.push([...targetShip]); // Guardar barco hundido
                lastHits = [];
                targetShip = [];
                huntingMode = false;
                hitShips = {};
                consecutiveHits = 0; // Reinicia el contador
            }

            checkWinner(matrix, "pc");
            return setTimeout(shotPc, 700); // Vuelve a disparar después de un corto tiempo
        } 
        
        // ❌ **Disparo repetido, buscar otro**
        else if (matrix[x][y] === "hit" || matrix[x][y] === "miss") {
            return shotPc();
        } 
        
        // ❄ **Fallo**
        else {
            matrix[x][y] = "miss";
            document.getElementById(`${x},${y},player`).classList.add("miss");
            agua.currentTime = 1;
            agua.play();
            
            if (huntingMode) {
                changeDirection(); // Cambiar dirección si falla en modo caza
            }
        }
    }, 500); // ⏳ Espera 500ms entre cada disparo
}

// 🔥 **Buscar la siguiente casilla en modo caza**
function getNextTarget() {
    let [x, y] = lastHits[lastHits.length - 1]; // Último golpe

    if (currentDirection === null) {
        currentDirection = directions[Math.floor(Math.random() * directions.length)];
    }

    let newX = x, newY = y;
    switch (currentDirection) {
        case "up": newX--; break;
        case "down": newX++; break;
        case "left": newY--; break;
        case "right": newY++; break;
    }

    if (isValid(newX, newY) && !isAlreadyShot(newX, newY)) {
        return [newX, newY];
    }

    // Si no puede seguir en la misma dirección, intenta otra
    changeDirection();
    return getNextTarget();
}

// 🔵 **Exploración con patrón en X**
function getSmartPatternShot() {
    let x, y;
    do {
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
    } while (isAlreadyShot(x, y) || (x % 2 !== y % 2)); // Solo disparos en X
    return [x, y];
}

// ❌ **Evita disparos en la misma casilla**
function isAlreadyShot(x, y) {
    return matrix[x][y] === "hit" || matrix[x][y] === "miss";
}

// 🔄 **Cambiar dirección si falla en modo caza**
function changeDirection() {
    let oppositeDirection = {
        "up": "down",
        "down": "up",
        "left": "right",
        "right": "left"
    };

    if (consecutiveHits >= 5) { // Si ya disparó 5 veces seguidas, el barco está hundido
        lastHits = [];
        huntingMode = false;
        targetShip = [];
        currentDirection = null;
        consecutiveHits = 0;
        return;
    }

    directions = directions.filter(dir => dir !== currentDirection);
    if (directions.length === 0) {
        lastHits = [];
        huntingMode = false;
        directions = ["up", "down", "left", "right"];
        currentDirection = null;
    } else {
        currentDirection = directions[Math.floor(Math.random() * directions.length)];
    }
}

// ✅ **Validar si una casilla está en la matriz**
function isValid(x, y) {
    return x >= 0 && x < size && y >= 0 && y < size;
}

// 🚢 **Verificar si un barco está hundido**
function checkIfShipSunk() {
    for (let [x, y] of targetShip) {
        let neighbors = [
            [x - 1, y], [x + 1, y],
            [x, y - 1], [x, y + 1]
        ];

        for (let [nx, ny] of neighbors) {
            if (isValid(nx, ny) && matrix[nx][ny] === "ship") {
                return false; // Aún quedan partes del barco sin golpear
            }
        }
    }

    return true; // Si no encuentra más partes del barco, lo hundió
}

function checkWinner(matrix, player) {
    if (!matrix.flat().includes("ship")) {
        alert(player === "pc" ? "Ha ganado el PC" : "¡GANASTE!");

        console.log("Puntos finales:", puntuacion.puntos);

        // Recuperar los datos almacenados en localStorage
        let storedPlayerData = localStorage.getItem("playerData");
        if (!storedPlayerData) {
            console.error("No hay datos del jugador en localStorage.");
            return;
        }

        let playerData = JSON.parse(storedPlayerData);

        // Enviar los datos al backend con la puntuación actualizada
        sendScore(playerData.nick_name, puntuacion.puntos, playerData.country_code);
    }
}



function updateScore(points) {
    let storedPlayerData = localStorage.getItem("playerData");
    if (!storedPlayerData) return;

    let playerData = JSON.parse(storedPlayerData);
    playerData.score += points; // Sumar los puntos ganados
    localStorage.setItem("playerData", JSON.stringify(playerData));

    console.log("Nuevo puntaje:", playerData.score);
}


async function sendScore(nickName, score, countryCode) {
    const data = {
        "nick_name": nickName,
        "score": score,
        "country_code": countryCode
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/score-recorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        }

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        // Redirigir al ranking después de enviar los datos
        window.location.href = "Ranking.html";  
    } catch (error) {
        console.error('Error:', error);
    }
}
