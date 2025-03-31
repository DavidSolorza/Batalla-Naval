document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("jugar");
    let input = document.getElementById("tamanio");
    let selectionModal = document.getElementById("selectionModal");
    let manualBtn = document.getElementById("manualBtn");
    let autoBtn = document.getElementById("autoBtn");
   

    selectionModal.style.display = "none"; // Ocultar modal
    
    boton.addEventListener("click", function () {
        
        let num = input.value.trim();
        
        if (num < 10 || num > 20) {
            alert("Solo se permiten los números entre 10 y 20 (Incluidos estos)");
            input.value = ""; // Borra el campo si el número es incorrecto
            return;
        }

        // Mostrar el modal
        function mostrarModalSeleccion(num) {
            selectionModal.style.display = "flex";
            let sizeParam = `size=${num}`;
        
            manualBtn.onclick = () => iniciarJuego(false, sizeParam);
            autoBtn.onclick = () => iniciarJuego(true, sizeParam);
        }
        
    });

    function iniciarJuego(useAuto, sizeParam) {
        // Redirigir a modoCmaquina.html con los parámetros
        window.location.href = `modoCmaquina.html?${sizeParam}&auto=${useAuto}`;
    }
})