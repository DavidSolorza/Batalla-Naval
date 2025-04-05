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
            countrySpan.textContent = `País: ${playerData.country_code.toUpperCase()}`;
        }

        if (scoreSpan) {
            scoreSpan.textContent = playerData.score || 0;
        }
    } else {
        console.warn("No se encontró 'playerData' en localStorage.");
    }
});
