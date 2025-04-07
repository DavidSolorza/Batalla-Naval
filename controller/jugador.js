
//Codigo del turno del jugador
function checkShot(event) {
    if (!turnoJugador) return; 
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
        turnoJugador = false;
        shotPc();
    }
}