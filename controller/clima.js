import CONFIG from "../config.js"; 

console.log("API_KEY cargada:", CONFIG.API_KEY); // Verifica si se carga bien

const API_KEY = CONFIG.API_KEY;

const ciudades = [
    { nombre: "Tokio", lat: 35.6895, lon: 139.6917 },
    { nombre: "París", lat: 48.8566, lon: 2.3522 },
    { nombre: "Nueva York", lat: 40.7128, lon: -74.0060 },
    { nombre: "Sídney", lat: -33.8688, lon: 151.2093 },
    { nombre: "Bogotá", lat: 4.7110, lon: -74.0721 },
    { nombre: "El Cairo", lat: 30.0444, lon: 31.2357 },
    { nombre: "Moscú", lat: 55.7558, lon: 37.6173 },
    { nombre: "Ciudad de México", lat: 19.4326, lon: -99.1332 },
    { nombre: "Londres", lat: 51.5072, lon: -0.1276 },
    { nombre: "Nairobi", lat: -1.2921, lon: 36.8219 },
    { nombre: "Los Ángeles", lat: 34.0522, lon: -118.2437 },
    { nombre: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
    { nombre: "Lima", lat: -12.0464, lon: -77.0428 },
    { nombre: "Sao Paulo", lat: -23.5505, lon: -46.6333 },
    { nombre: "Santiago", lat: -33.4489, lon: -70.6693 },
    { nombre: "Toronto", lat: 43.7001, lon: -79.4163 },
    { nombre: "Miami", lat: 25.7617, lon: -80.1918 }
];

// Elegir una ciudad al azar
const ciudadRandom = ciudades[Math.floor(Math.random() * ciudades.length)];

async function mostrarClima(ciudad) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ciudad.lat}&lon=${ciudad.lon}&appid=${API_KEY}&units=metric&lang=es`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener el clima");

        const data = await response.json();
        const clima = data.weather[0].description;
        const temperatura = data.main.temp;
        const viento = data.wind.speed;

        // Mostrar datos en el body
        document.body.innerHTML = `
            <div style="font-family: sans-serif; text-align: center; padding: 2rem;">
                <h1>🌤️ Clima actual en ${ciudad.nombre}</h1>
                <p><strong>Temperatura:</strong> ${temperatura}°C</p>
                <p><strong>Viento:</strong> ${viento} km/h</p>
                <p><strong>Condición:</strong> ${clima}</p>
            </div>
        `;
    } catch (error) {
        console.error("Error obteniendo el clima:", error);
        document.body.innerHTML = `<p>Error al cargar el clima.</p>`;
    }
}

mostrarClima(ciudadRandom);
