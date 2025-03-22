document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("jugar");
    let input = document.getElementById("tamanio");

    boton.addEventListener("click", function () {
        let num = input.value.trim();

        // Validar que el número sea 3, 5 o 7
        if (num < 10 || num > 20) {
            alert("Solo se permiten los números entre 10 y 20 (Incluidos estos)");
            input.value = ""; // Borra el campo si el número es incorrecto
            return;
        }

        // Redireccionar a la página del tablero correspondiente
        window.location.href = `tablero.html?size=${num}`;
    });
})