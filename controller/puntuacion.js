//Codigo de la puntuación del juego
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