// const contenedor = document.getElementById("contenedor");
//EL getElementById devuelve un único elemento
// const toppings = document.getElementsByClassName("topping");
//EL getElementsByClassName devuelve una colección de elementos

//EL querySelectorAll devuelve una colección de elementos que coincidan con el selector
//const primerTopping = document.querySelectorAll('.topping');

//QuerySelector devuelve el primer elemento que coincida con el selector
//style nos permite modificar los estilos CSS de un elemento
// const primerTopping = document.querySelector('.topping');
// primerTopping.style.backgroundColor = 'blue';
// primerTopping.style.color = 'black';
// primerTopping.style.textTransform = 'uppercase';

// const listaDeToppings = document.getElementById("lista-toppings");
// //FORMAS DE ACCEDER AL TEXTO DE UN ELEMENTO
// console.log('> innerText');
// // Muestra el texto tal cual se ve en la pantalla
// console.log(listaDeToppings.innerText);

// console.log('> textContent');
// // Muestra todo el texto que hay dentro del elemento, aunque no se vea en la pantalla
// console.log(listaDeToppings.textContent);

// console.log('> innerHTML');
// // Muestra todo el contenido HTML que hay dentro del elemento
// console.log(listaDeToppings.innerHTML);

//Agregar un nuevo elemento al DOM
// const listaDeToppings = document.getElementById("lista-toppings");

// function agregarTopping(topping) {
//     const nuevoTopping = document.createElement("li");
//     nuevoTopping.classList.add('topping', 'fondo-marron');
//     nuevoTopping.innerText = topping;

//     listaDeToppings.appendChild(nuevoTopping);  
// }

// agregarTopping("Palta");

//Eventos 
//ADD EVENT LISTENER permite asociar una función a un evento de un elem
const toppings = document.getElementsByClassName("topping");

for (const topping of toppings) {
    topping.addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del evento
        console.log(e.target.innerText);
    });
}