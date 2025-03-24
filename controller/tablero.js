document.addEventListener("DOMContentLoaded", function () {
    const tableroContainer = document.getElementById("tableroContainer");
    let tablero = [];
    let size;

    // aca obtenemos el tamaño del tablero
    const urlParams = new URLSearchParams(window.location.search);
    size = parseInt(urlParams.get("size"));

    // Generar el tablero
    generarTablero(size);

    function generarTablero(n) {
        const tableroContainer = document.getElementById("tableroContainer");
        tableroContainer.innerHTML = "";// Limpiar tablero anterior
    
        // se actuliza el tamaño segun el numero de casillas elegido 
        tableroContainer.style.gridTemplateColumns = `repeat(${n}, 30px)`;
        tableroContainer.style.gridTemplateRows = `repeat(${n}, 30px)`;
    
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const celda = document.createElement("div");
                celda.classList.add("grid");
                celda.id = `${i},${j}`;
    
                tableroContainer.appendChild(celda);
            }
        }
    }    
});
