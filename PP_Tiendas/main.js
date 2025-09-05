import { Alumno } from "./alumno.js"
import { frutas } from "./frutas.js";

let repo_frutas = [];

for (const element of frutas) {
    repo_frutas.push(element)
}
function guardarEnLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Obtener un dato del localStorage
function obtenerDeLocalStorage(clave) {
    const dato = localStorage.getItem(clave);
    return dato ? JSON.parse(dato) : null;
}

function searchFilters(input, selector) {
    document.addEventListener("keyup", (e) => {
        if (e.target.matches(input)) {
            if (e.key === "Escape") e.target.value = "";

            document.querySelectorAll(selector).forEach((el) => {
                el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                    ? el.classList.remove("filter")
                    : el.classList.add("filter");
            });
        }
    });
}
// 👉 Carrito inicial vacío o cargado desde localStorage
let carrito = obtenerDeLocalStorage("carrito") || [];

function mostrarCarrito(){

    const contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";
    contenedor.classList.add("contenedor_carrito");

    const ul = document.createElement("ul");

    carrito.forEach((p, i) => {
        const li = document.createElement("li");
        li.className = "bloque-item";  
        li.innerHTML = `
            <img src="${p.rutaImg}" alt="${p.nombre}">
            <p class="nombre-item">${p.nombre} - $${p.precio}</p>
            <button class="boton-eliminar" data-index="${i}">Eliminar</button>
        `;
        ul.appendChild(li);
    });

    contenedor.appendChild(ul);

    // Eventos de eliminar
    document.querySelectorAll(".boton-eliminar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            carrito.splice(index, 1);
            guardarEnLocalStorage("carrito", carrito); // ✅ guardo cambios
            mostrarCarrito();
        });
    });
}
// Ejercicio 7 _____________ 1 punto
// • Implementa un contador de números de productos del carrito. 
// Si hay 0 productos se eliminan del carrito.
// • Actualiza la cantidad de productos en el header en la parte de Carrito: 
// 0 productos
// • Actualiza el precio del valor total del carrito 
// abajo de todo a la derecha (cuando haya productos en el carrito)
function incrementarContador(){
    
    const contenedor = document.getElementById("contador_carrito");
    contenedor.innerHTML = "";
    contenedor.classList.add("cont_carrito");

    const ul = document.createElement("ul");

    carrito.forEach((p, i) => {
        const li = document.createElement("li");
        li.className = "contador";  
        li.innerHTML = `
            <p class="nombre-item">${p.nombre} - $${p.precio}</p>
        `;
        ul.appendChild(li);
    });

    contenedor.appendChild(ul);

    // Eventos de eliminar
    document.querySelectorAll(".boton-eliminar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            carrito.splice(index, 1);
            guardarEnLocalStorage("carrito", carrito); // ✅ guardo cambios
            mostrarCarrito();
        });
    });
}

function mostrarProductos(frutas){
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    frutas.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "card";  
        div.innerHTML = `
            <div class="card h-100">
                <img src="${p.rutaImg}" class="card-img-top" alt="${p.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${p.nombre}</h5>
                    <p class="card-text">$${p.precio}</p>
                    <button class="agregar-carrito" data-id="${i}">Agregar al carrito</button>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });

    // Eventos de agregar al carrito
    document.querySelectorAll(".agregar-carrito").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            carrito.push(frutas[id]);   // ✅ ahora carrito sí es un array
            console.log(carrito);
            guardarEnLocalStorage("carrito", carrito); // ✅ guardo cambios
            mostrarCarrito();
        });
    });
}
function init() {
    let alumno = new Alumno(36295160, "Ezequiel", "Moran");
    alumno.imprimirDatosAlumno();
    mostrarProductos(frutas);
    mostrarCarrito(); // ✅ mostrar carrito guardado si existe
    searchFilters(".card-filter", ".card");
}

init();



// Ejercicio 8 _____________ 1 punto
// • Crea dos botones en línea con el título de sección productos.
// • Implementa la funcionalidad para ordenar los productos en estos dos botones. Un boton debe ordenar por nombre los
// productos y el otro por precio de menor a mayor
// Ejercicio 9 _____________ 0.5 puntos
// • Implementa la funcionalidad para Vaciar carrito. Crea un botón en la sección carrito que vacíe todo el carrito.
// Ejercicio 10_____________ 1.5 puntos
// • Estila la pagina acorde a la imagen (sample.png)
// sample.png


// Agregar un nuevo vehículo
// function agregarVehiculo(vehiculo) {
//     vehiculos.push(vehiculo);
//     guardarVehiculos();
// }

// Actualizar un vehículo existente
// function actualizarVehiculo(id, vehiculoActualizado) {
//     const index = vehiculos.findIndex(v => v.id === id);
//     if (index > -1) {
//         vehiculos[index] = vehiculoActualizado;
//         guardarVehiculos();
//         return true;
//     }
//     return false;
// }

// // Eliminar un vehículo
// function eliminarVehiculo(id) {
//     vehiculos = vehiculos.filter(v => v.id !== id);
//     guardarVehiculos();
// }

// // Eliminar un dato del localStorage
// function eliminarDeLocalStorage(clave) {
//     localStorage.removeItem(clave);
// }

// // Limpiar todo el localStorage
// function limpiarLocalStorage() {
//     localStorage.clear();
// }
// function guardarVehiculos() {
//     guardarEnLocalStorage('datos', vehiculos);
// }
