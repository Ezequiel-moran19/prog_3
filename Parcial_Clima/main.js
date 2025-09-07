import { Clima } from "./clima.js";

async function cargarClimas() {
    const urls = ['https://weather-api-progra-3.vercel.app/weather/avellaneda', 'https://weather-api-progra-3-v2.vercel.app/weather/avellaneda']; 
    const contenedor = document.getElementById('clima');  
    contenedor.innerHTML = "";

    for (const url of urls) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const clima = Clima.createFromJsonString(JSON.stringify(data));
            contenedor.appendChild(clima.createHtmlElement());
        } catch (error) {
            console.error(`Error al cargar clima desde ${url}:`, error);
        }
    }
}

async function traerCiudad(){
    const inputCiudad = document.getElementById("traer-ciudad");
    const ciudad = inputCiudad.value.trim();
    const contenedorIdBusqueda = document.getElementById("busqueda");
    contenedorIdBusqueda.innerHTML = "";

    const urls = [`https://weather-api-progra-3.vercel.app/weather/${ciudad}`, `https://weather-api-progra-3-v2.vercel.app/weather/${ciudad}`];

    for (const url of urls) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const clima = Clima.createFromJsonString(JSON.stringify(data));
            contenedorIdBusqueda.appendChild(clima.createHtmlElement());
        } catch (error) {
            console.error(`Error al cargar clima desde ${url}:`, error);
        }
    }
}

function init() {
    cargarClimas();
    
    const inputCiudad = document.getElementById("traer-ciudad");
    inputCiudad.addEventListener("keypress" ,(e) => {
        if (e.key === "Enter") {
            traerCiudad()
        }
    })
}

init();

//localStorage.clear();

// fetch('https://weather-api-progra-3-v2.vercel.app/weather/avellaneda') // URL del recurso
//   .then(response => response.json()) // convierte la respuesta a JSON
//   .then(data => console.log(data))   // trabaja con los datos recibidos
//   .catch(error => console.error('Error:', error));
// const p1 = new Pronostico(1, "25°C", "10 km/h");
// const p2 = new Pronostico(2, "22°C", "15 km/h");

// const clima = new Clima("Buenos Aires", "24°C", "12 km/h", "Parcialmente nublado", [p1, p2]);
