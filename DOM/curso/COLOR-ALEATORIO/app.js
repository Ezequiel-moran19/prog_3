// selecciona los elementos del DOM
const btn = document.querySelector("button");

const color = document.getElementById("color");

function getRandomColor() {
    const digitos = "0123456789ABCDEF";
    let colorEx = "#";
    for (let i = 0; i < 6; i++) {
        // El Math.floor() redondea hacia abajo el número aleatorio generado por Math.random()
         let indice = Math.floor(Math.random() * 16); // 16 porque hay 16 caracteres en digitos
         colorEx += digitos[indice];
    }
    return colorEx;
}

btn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del botón
    // Llama a la función para obtener un color aleatorio
    let colorAleatorio = getRandomColor();
    // Actualiza el contenido del elemento
    color.textContent = colorAleatorio;
    // Actualiza el color de fondo del body y el color del texto
    document.body.style.backgroundColor = colorAleatorio;
})
