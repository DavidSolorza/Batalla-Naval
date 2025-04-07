import CONFIG from "../config.js";

const CITY_LIST_PATH = "../city.list.json";

async function cargarCiudades() {
  try {
    // 🔍 Leer los datos guardados en localStorage
    const playerData = JSON.parse(localStorage.getItem("playerData"));

    if (!playerData || !playerData.city_name) {
      console.warn("⚠️ No se encontraron datos válidos en localStorage.");
      return;
    }

    const cityName = playerData.city_name;

    console.log(`🌍 Consultando clima para "${cityName}"`);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${CONFIG.API_KEY}&units=metric&lang=es`;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error("No se pudo obtener el clima de la ciudad.");

    const data = await response.json();
    mostrarClima(data);
  } catch (error) {
    console.error("❌ Error al cargar ciudades:", error);
  }
}

async function mostrarClima(ciudad) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ciudad.coord.lat}&lon=${ciudad.coord.lon}&appid=${CONFIG.API_KEY}&units=metric&lang=es`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener el clima");

    const data = await response.json();
    console.log("🌤️ Datos del clima recibidos:", data);

    const clima = data.weather[0].description;
    const temperatura = data.main.temp;
    const viento = data.wind.speed;

    // ✅ AHORA sí declaramos primero climaDiv
    const climaDiv = document.createElement("div");

    climaDiv.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.6);
                color: #fff;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                font-family: sans-serif;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                z-index: 9999;
                max-width: 250px;
            ">
                <strong>Clima en ${ciudad.name}</strong><br>
                🌡️ ${temperatura}°C<br>
                💨 ${viento} km/h<br>
                ☁️ ${clima}
            </div>
        `;

    document.body.appendChild(climaDiv);

    // Código para cambiar fondo y sonido según el clima
    const estado = clima.toLowerCase();
    const body = document.body;
    const sonido = document.getElementById("sonidoFondo");

        if (estado.includes('lluvia ligera') || estado.includes('lluvia') || estado.includes('llovizna')|| estado.includes('brisita')) {
            body.className = 'lluvia-ligera';
            sonido.src = '../assents/sonidos/lluvia.mp3';
        } else if (estado.includes('tormenta') || estado.includes('lluvia fuerte')) {
            body.className = 'tormenta';
            sonido.src = '../assents/sonidos/tormenta.mp3';
        } else if (estado.includes('nublado') || estado.includes('nubes')|| estado.includes('nuboso')) {
            body.className = 'nublado';
            sonido.src = '../assents/sonidos/nublado.mp3';
        } else if (estado.includes('soleado') || estado.includes('cielo claro')) {
            body.className = 'sol';
            sonido.src = '../assents/sonidos/soleado.mp3';
        } else {
            body.className = '';
            sonido.src = '';
        }

    sonido.play().catch(() => {
      console.log("🎧 Reproducción bloqueada hasta que el usuario interactúe.");
    });
  } catch (error) {
    console.error("❌ Error obteniendo el clima:", error);
  }
}

cargarCiudades();
