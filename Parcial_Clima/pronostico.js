export class Pronostico {
    constructor(day, temperature, wind){
        this.day = day;
        this.temperature = temperature;
        this.wind = wind;
    }

    createHtmlElement() {
        const div = document.createElement("div");
        div.classList.add("pronostico");
        div.innerHTML = `
            <p>Día: ${this.day}</p>
            <p>Temperatura: ${this.temperature}</p>
            <p>Viento: ${this.wind}</p>
        `;
        return div;
    }
}