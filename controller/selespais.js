import CONFIG from "../config.js";

document.addEventListener("DOMContentLoaded", async () => {
    const countryInput = document.getElementById("nacionalidad");
    const cityInput = document.getElementById("cityName"); // ⬅️ este input debe existir en el HTML
    const playButton = document.getElementById("jugar");
    let countryMap = {};

    try {
        const response = await fetch(CONFIG.API_COUNTRIES);
        if (!response.ok) throw new Error("Error al obtener países");

        const countriesArray = await response.json();

        countriesArray.forEach(countryObj => {
            const code = Object.keys(countryObj)[0].toLowerCase();
            const name = countryObj[code].toLowerCase();
            countryMap[name] = code;
        });

    } catch (error) {
        console.error("Error cargando países:", error);
    }

    playButton.addEventListener("click", () => {
        const nickname = document.getElementById("nombre").value.trim();
        const countryName = countryInput.value.trim().toLowerCase();
        const cityName = cityInput.value.trim(); // ⬅️ aquí está la ciudad
        const boardSize = document.getElementById("tamanio").value.trim();

        if (!nickname || !countryName || !boardSize || !cityName) {
            alert("Por favor, completa todos los campos.");
            return;
        } else {
            mostrarModalSeleccion(boardSize);
        }

        const countryCode = countryMap[countryName] || "desconocido";

        // ✅ Guardamos la ciudad también
        const playerData = {
            nick_name: nickname,
            score: 0,
            country_code: countryCode,
            city_name: cityName
        };

        localStorage.setItem("playerData", JSON.stringify(playerData));
        console.log("✅ Datos guardados en localStorage:", playerData);
    });
});
