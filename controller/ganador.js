function checkWinner(matrix, player) {
    if (!matrix.flat().includes("ship")) {
        alert(player === "pc" ? "Ha ganado el PC" : "¡GANASTE!");

        console.log("Puntos finales:", puntuacion.puntos);

        // Recuperar los datos almacenados en localStorage
        let storedPlayerData = localStorage.getItem("playerData");
        if (!storedPlayerData) {
            console.error("No hay datos del jugador en localStorage.");
            return;
        }

        let playerData = JSON.parse(storedPlayerData);

        // Enviar los datos al backend con la puntuación actualizada
        sendScore(playerData.nick_name, puntuacion.puntos, playerData.country_code);
    }
}



function updateScore(points) {
    let storedPlayerData = localStorage.getItem("playerData");
    if (!storedPlayerData) return;

    let playerData = JSON.parse(storedPlayerData);
    playerData.score += points; // Sumar los puntos ganados
    localStorage.setItem("playerData", JSON.stringify(playerData));

    console.log("Nuevo puntaje:", playerData.score);
}


async function sendScore(nickName, score, countryCode) {
    const data = {
        "nick_name": nickName,
        "score": score,
        "country_code": countryCode
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/score-recorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        }

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        // Redirigir al ranking después de enviar los datos
        window.location.href = "Ranking.html";  
    } catch (error) {
        console.error('Error:', error);
    }
}
