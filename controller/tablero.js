document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del DOM
    const tableroContainer = document.getElementById("tableroContainer");
    const mensaje = document.getElementById("mensaje");
    // const botonReiniciar = document.getElementById("reiniciar");
    // const botonHome = document.getElementById("home");

    // Variables del juego
    let tablero = []; // Representación lógica del tablero
    let turno = "X"; // Turno actual
    let juegoActivo = true; // Estado del juego
    let size; // Tamaño del tablero

    // Función para redirigir a la página de inicio
    // botonHome.addEventListener("click", function () {
    //     window.location.href = 'inicio.html';
    // });

    // // Función para reiniciar el juego
    // botonReiniciar.addEventListener("click", function () {
    //     reiniciarJuego();
    // });

    // Obtener el tamaño del tablero desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    size = parseInt(urlParams.get("size"));



    // Generar el tablero inicial
    generarTablero(size);

    // Función para generar el tablero
    function generarTablero(n) {
        tableroContainer.innerHTML = ""; // Limpiar tablero anterior
        tablero = Array(n).fill().map(() => Array(n).fill(null)); // Inicializar tablero lógico

        // Estilos del contenedor del tablero
        tableroContainer.style.display = "grid";
        tableroContainer.style.gridTemplateColumns = `repeat(${n}, 60px)`; // Ajusta el tamaño de las celdas
        tableroContainer.style.gridTemplateRows = `repeat(${n}, 60px)`; // Ajusta el tamaño de las celdas
        tableroContainer.style.gap = "10px"; // Espacio entre celdas

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const celda = document.createElement("div");
                celda.classList.add("celda"); // Añadir clase para estilos
                celda.dataset.fila = i;
                celda.dataset.columna = j;
                celda.textContent = "";

                // Estilos de las celdas
                celda.style.display = "flex";
                celda.style.alignItems = "center";
                celda.style.justifyContent = "center";
                celda.style.fontSize = "24px";
                celda.style.fontWeight = "bold";
                celda.style.border = "2px solid #000";
                celda.style.cursor = "pointer";
                celda.style.backgroundColor = "#ffffff";
                celda.style.transition = "background-color 0.3s";

                // Evento de clic en la celda
                celda.addEventListener("click", function () {
                    if (juegoActivo && !tablero[i][j]) {
                        celda.textContent = turno;
                        tablero[i][j] = turno;

                        if (verificarGanador(turno)) {
                            mensaje.textContent = `¡Jugador ${turno} ha ganado! 🎉`;
                            juegoActivo = false;
                        } else if (tableroLleno()) {
                            mensaje.textContent = "¡Empate! 😐";
                            juegoActivo = false;
                        } else {
                            turno = turno === "X" ? "O" : "X"; // Cambiar turno
                        }
                    }
                });

                tableroContainer.appendChild(celda);
            }
        }
    }

    // Función para verificar si hay un ganador
    function verificarGanador(jugador) {
        const n = tablero.length;

        // Verificar filas y columnas
        for (let i = 0; i < n; i++) {
            if (tablero[i].every(celda => celda === jugador)) return true;
            if (tablero.map(fila => fila[i]).every(celda => celda === jugador)) return true;
        }

        // Verificar diagonales
        if (tablero.map((fila, i) => fila[i]).every(celda => celda === jugador)) return true;
        if (tablero.map((fila, i) => fila[n - 1 - i]).every(celda => celda === jugador)) return true;

        return false;
    }

    // Función para verificar si el tablero está lleno
    function tableroLleno() {
        return tablero.every(fila => fila.every(celda => celda !== null));
    }

    // Función para reiniciar el juego
    function reiniciarJuego() {
        tableroContainer.innerHTML = ""; // Limpiar tablero anterior
        mensaje.textContent = ""; // Limpiar mensaje de victoria
        juegoActivo = true; // Restablecer estado del juego
        turno = "X"; // Restablecer turno
        generarTablero(size); // Generar nuevo tablero
    }
});