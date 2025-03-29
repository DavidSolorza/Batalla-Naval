document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("jugar");
    let input = document.getElementById("tamanio");
    let selectionModal = document.getElementById("selectionModal");

    selectionModal.style.display = "none"; // Ocultar modal
    
    boton.addEventListener("click", function () {
        let num = input.value.trim();

        
        if (num < 10 || num > 20) {
            alert("Solo se permiten los números entre 10 y 20 (Incluidos estos)");
            input.value = ""; // Borra el campo si el número es incorrecto
            return;
        } 

        // Mostrar el modal
        selectionModal.style.display = "flex";

        // Asignar eventos a los botones del modal
        document.getElementById("manualBtn").addEventListener("click", function () {
            window.location.href = `tablero.html?size=${num}`;
        });

        document.getElementById("autoBtn").addEventListener("click", function () {
            window.location.href = `tableroAuto.html?size=${num}`;        });
    });
})