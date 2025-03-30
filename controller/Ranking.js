import CONFIG from "../config.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("Obteniendo datos del ranking...");

        const countriesResponse = await fetch(CONFIG.API_COUNTRIES);
        if (!countriesResponse.ok) throw new Error(`Error al obtener países: ${countriesResponse.status}`);

        const countriesArray = await countriesResponse.json(); // Recibimos el array
        console.log("Lista de países recibida:", countriesArray);

        const countryMap = {};
        countriesArray.forEach(countryObj => {
            const code = Object.keys(countryObj)[0].toLowerCase(); // Convertir la clave a minúsculas
            countryMap[code] = countryObj[code]; // Guardar en el diccionario
        });

        console.log("Mapa de países procesado:", countryMap);

        const response = await fetch(CONFIG.API_RANKING);
        if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);

        const rankingData = await response.json();
        console.log("Datos del ranking:", rankingData);

        if (!Array.isArray(rankingData)) {
            throw new Error("El servidor no devolvió un array.");
        }

        const tabla = document.getElementById("tablaRanking");
        tabla.innerHTML = ""; // Limpiar antes de insertar nuevos datos

        rankingData.forEach((item, index) => {
            const countryCode = item.country_code ? item.country_code.toLowerCase() : ""; // Convertir código del ranking a minúsculas
            const countryName = countryMap[countryCode] || "Desconocido"; // Buscar en el diccionario

            console.log(`Código: ${countryCode} -> Nombre: ${countryName}`);

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.nick_name || "Sin nombre"}</td>
                <td>${item.score ?? "0"}</td>
                <td>${countryName}</td>
            `;
            tabla.appendChild(fila);
        });

        console.log("Ranking actualizado correctamente.");
    } catch (error) {
        console.error("Error al obtener el ranking:", error);
    }
});
