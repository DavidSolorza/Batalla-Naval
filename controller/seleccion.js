document.addEventListener("DOMContentLoaded", function () {
    
    const params = new URLSearchParams(window.location.search);
    const useAuto = params.get("auto") === "true"; 

    
    const script = document.createElement("script");
    script.src = useAuto ? "../controller/tableroAuto.js" : "../controller/tablero.js";
    document.body.appendChild(script);

    
    script.onload = function () {
        let estrategiaBtns = document.querySelectorAll(".estrategiaBtn");    
        estrategiaBtns.forEach(btn => {
            btn.style.display = useAuto ? "block" : "none";
        });
    };
});
