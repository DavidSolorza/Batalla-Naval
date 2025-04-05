document.addEventListener("DOMContentLoaded", () => {
    const playerDataString = localStorage.getItem("playerData");

    if (playerDataString) {
        const playerData = JSON.parse(playerDataString);

        const nameSpan = document.getElementById("player-name");
        const countrySpan = document.getElementById("player-country");
        const scoreSpan = document.getElementById("player-score");

        if (nameSpan) {
            nameSpan.textContent = `Jugador: ${playerData.nick_name}`;
        }

        if (countrySpan) {
            getCountryNameFromCode(playerData.country_code).then(countryName => {
                countrySpan.textContent = `País: ${countryName}`;
            });
        }

        if (scoreSpan) {
            scoreSpan.textContent = playerData.score || 0;
        }
    } else {
        console.warn("No se encontró 'playerData' en localStorage.");
    }
});

import CONFIG from "../config.js";
async function getCountryNameFromCode(code) {
    try {
        const countriesResponse = await fetch(CONFIG.API_COUNTRIES);
        if (!countriesResponse.ok) throw new Error(`Error al obtener países: ${countriesResponse.status}`);

        const countriesArray = await countriesResponse.json();

        const countryMap = {};
        countriesArray.forEach(countryObj => {
            const countryCode = Object.keys(countryObj)[0].toLowerCase();
            countryMap[countryCode] = countryObj[countryCode];
        });

        return countryMap[code.toLowerCase()] || code.toUpperCase();
    } catch (error) {
        console.error("Error al obtener el nombre del país:", error);
        return code.toUpperCase(); // Valor de respaldo
    }
}
