
# 🛳️ Batalla Naval - Proyecto Web Interactivo

Este es un proyecto web desarrollado en HTML, CSS y JavaScript puro que recrea el clásico juego de **Batalla Naval**. Además de la funcionalidad principal del juego, incluye interacciones con APIs externas para mostrar el clima según la ciudad del jugador, un sistema de selección de país y ciudad, rankings, modo contra amigos o contra la máquina, y un entorno visual atractivo.

---

## 🗂️ Estructura del Proyecto

```plaintext
Batalla-Naval/
├── config.js
├── city.list.json
├── controller/
│   ├── AI.js
│   ├── clima.js
│   ├── Ranking.js
│   ├── seleccion.js
│   ├── selespais.js
│   ├── tablero.js
│   ├── tableroAuto.js
│   ├── tamanioTablero.js
│   └── userInfo.js
├── view/
│   ├── index.html
│   ├── intrucciones.html
│   ├── juego.html
│   ├── menuUsuario.html
│   ├── modoCAmigos.html
│   ├── modoCmaquina.html
│   ├── ranking.html
│   └── styles/
│       ├── background.css
│       ├── efectosClima.css
│       ├── intrucciones.css
│       ├── juego.css
│       ├── menu.css
│       ├── menuUsuario.css
│       ├── Ranking.css
│       ├── tablero.css
│       └── tamanio.css
```

---

## 🚀 ¿Cómo ejecutar el proyecto?

### 1. Clonar
`:

```bash
git clone https://github.com/tu-usuario/Batalla-Naval.git
```

### 2. Servidor local requerido

Este proyecto **requiere un servidor local** para funcionar correctamente, ya que carga archivos `.json` mediante `fetch` y realiza peticiones externas a APIs. Puedes usar [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code o cualquier servidor HTTP como:

```bash
npx serve .
# o
python -m http.server 5500
```

Luego abre: `http://localhost:5500/view/index.html`

---

## ⚙️ Archivos clave

### `config.js`

Este archivo contiene las configuraciones globales del proyecto, como la API Key de OpenWeather y la URL para obtener la lista de países.

```js
const CONFIG = {
    API_RANKING: "http://127.0.0.1:5000/ranking",
    API_COUNTRIES: "http://127.0.0.1:5000/countries",
    API_BANDERAS: "https://flagsapi.com/#sizes",
    API_CLIMA: "https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=324f1b2d1b0b89779cfad9fcd4d7de37",
    API_KEY: "324f1b2d1b0b89779cfad9fcd4d7de37"
};

export default CONFIG;

```

### `city.list.json`

Archivo local que contiene miles de ciudades con sus coordenadas geográficas para obtener datos del clima según la ciudad seleccionada por el usuario.

---

## 🌦️ Funcionalidad del clima

El archivo `clima.js` se encarga de obtener el clima actual de la ciudad seleccionada por el usuario. Usa la API de OpenWeather, y los datos se muestran en la esquina inferior derecha con efectos visuales usando `efectosClima.css`.

> ⚠️ Asegúrate de que tu servidor local esté activo y que `city.list.json` sea accesible, de lo contrario obtendrás errores por CORS o rutas inválidas.

---

## 🎮 Funcionalidades principales

- **Registro y selección de país/ciudad** con persistencia en `localStorage`.
- **Modo de juego contra la máquina (IA)** o **modo multijugador local**.
- **Selección de tamaño de tablero** y autocolocación de barcos.
- **Clima actual** en la ciudad del jugador.
- **Ranking de jugadores** basado en puntuación.
- **Estilos visuales personalizados** para cada sección (menu, juego, ranking...).

---

## 🧠 Controladores principales

### `AI.js`
Controla la lógica de la inteligencia artificial para el modo de un solo jugador.

### `tablero.js` y `tableroAuto.js`
Lógica para crear tableros de juego, colocar barcos, y detectar impactos.

### `userInfo.js`
Manejo del nombre, país, ciudad y puntuación del jugador.

### `Ranking.js`
Carga y guarda el puntaje del jugador en localStorage y los muestra en `ranking.html`.

---

## 🎨 Estilos

Cada sección del juego cuenta con su propio archivo CSS, lo que facilita la personalización. Por ejemplo:

- `menu.css`: estilos del menú principal
- `juego.css`: diseño del tablero y controles de juego
- `background.css`: fondo animado y temas
- `efectosClima.css`: animaciones según el clima (lluvia, sol, nubes...)

---

# Backend Naval Battle

Esta es una API en Flask para registrar y consultar los puntajes de un juego, junto con información de países.

```sh
git clone https://github.com/felipebuitragocarmona/backend-naval-battle
```

## Requisitos
Antes de ejecutar la API, debes tener instalado Python. Luego instala las dependencias necesarias con el siguiente comando

```sh
pip install flask flask-cors requests
```

## Archivos principales
- `app.py`: Contiene la implementación de la API.
- `database/scores.json`: Almacena los puntajes de los jugadores.
- `database/countries.json`: Contiene la información de los países.

## Endpoints
### Registrar puntaje
**POST** `/score-recorder`
- Recibe un JSON con `nick_name`, `score` y `country_code`.
- Si el `nick_name` ya existe, suma los puntos. Si no, lo agrega.

Ejemplo de request:
```json
{
    "nick_name": "fbc",
    "score": 15,
    "country_code": "co"
}
```

### Obtener ranking
**GET** `/ranking`
- Retorna la lista de jugadores ordenada por puntaje de mayor a menor.

### Obtener lista de países
**GET** `/countries`
- Devuelve el contenido de `countries.json`.


## Ejecución
Para iniciar la API, ejecuta:
```sh
python app.py
```

La API correrá en `http://127.0.0.1:5000/`. Puedes probarla con herramientas como Postman o cURL.

## ✅ Recomendaciones

- Ejecutar siempre en un servidor local.
- No olvidar asignar una **API Key válida** de OpenWeather.
- Probar el juego en navegadores modernos (Chrome, Firefox, Edge).
- Asegúrate de habilitar JavaScript.

---

## 📦 Créditos

- API de clima: [OpenWeatherMap](https://openweathermap.org/)
- Lista de países: [FlagCDN](https://flagcdn.com/)
- Desarrollado con ❤️ para fines académicos.

---

