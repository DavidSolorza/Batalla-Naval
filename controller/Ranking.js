import CONFIG from "../config.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("Obteniendo datos del ranking...");

        const response = await fetch(CONFIG.API_RANKING);
        if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);

        const rankingData = await response.json();
        console.log("Datos recibidos:", rankingData);

        if (!Array.isArray(rankingData)) {
            throw new Error("El servidor no devolvió un array.");
        }

        const tabla = document.getElementById("tablaRanking");
        tabla.innerHTML = ""; // Limpiar antes de insertar nuevos datos

        rankingData.forEach((item, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.nick_name}</td>
                <td>${item.score}</td>
                <td>${item.country_code.toUpperCase()}</td>
            `;
            tabla.appendChild(fila);
        });

        console.log("Ranking actualizado correctamente.");
    } catch (error) {
        console.error("Error al obtener el ranking:", error);
    }
});
