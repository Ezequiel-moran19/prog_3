import { Pronostico } from "./pronostico.js";
export class Clima {
    constructor(city, temperature, wind, description, forecast){
        this.city = city;
        this.temperature = temperature;
        this.wind = wind;
        this.description = description;
        this.forecast = forecast;
    }
    toJsonString(){ return JSON.stringify(this) }
    
    static createFromJsonString(json){
        const obj = JSON.parse(json)
        const forecast = obj.forecast.map(f => new Pronostico(f.day, f.temperature, f.wind))
        return new Clima(obj.city, obj.temperature, obj.wind, obj.description, forecast)
    }
    
    static guardar(clima) {
        let listaClima = JSON.parse(localStorage.getItem("climas")) || [];
        listaClima.push(clima.toJsonString());
        localStorage.setItem("climas", JSON.stringify(listaClima));
        alert(`Clima de ${clima.city} guardado correctamente`);
    }

    createHtmlElement(){
        const contenedor = document.createElement("div");
        const forecastContenedor = document.createElement("div")
        contenedor.classList.add("clima");
        forecastContenedor.classList.add("forecast");
        contenedor.innerHTML = `
                <h2>City: ${this.city}</h2>
                <p>Temperatura: ${this.temperature}</p>
                <p>Viento: ${this.wind}</p>
                <p>Description: ${this.description}</p>
        ` 
        this.forecast.forEach((e, i) => {
            const elem = e.createHtmlElement();
            const pDia = elem.querySelector("p");
            if (pDia) pDia.textContent = `Día: ${["mañana", "pasado", "pasado mañana"][i]}`;
            forecastContenedor.appendChild(elem);
        });

        contenedor.appendChild(forecastContenedor);

        const btnGuarda = document.createElement("button");
        btnGuarda.textContent = "Guardar";
        btnGuarda.addEventListener("click", () => Clima.guardar(this));
        contenedor.appendChild(btnGuarda);

        return contenedor
    }
}