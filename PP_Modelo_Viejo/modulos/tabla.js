import { crearTabla } from '../componentes/t-dinamica.js';
import { vehiculos, filtrarPorTipo, calcularPromedio } from './vehiculos.js';
import { cargarFormularioABM } from './form/gestor-formulario.js';
import { inicializarColumnas, configurarCheckboxColumnas, aplicarVisibilidadDeColumna } from './columnas.js';

// Elementos del DOM
const contenedor = document.getElementById('idTabla');
const btnCalcular = document.getElementById('btnCalcular');
const opciones = document.getElementById('idOpciones');
const btnAgregar = document.getElementById("btnAgregar");

// Inicialización de la tabla
export function inicializarTabla() {
    configurarEventosTabla();
    actualizarTabla();
    // inicializarColumnas(contenedor);
}
// Configurar eventos de la tabla
function configurarEventosTabla() {
    btnCalcular.addEventListener('click', manejarCalculoPromedio);
    
    btnAgregar.addEventListener('click', () => {
        cargarFormularioABM();
    });
    
    opciones.addEventListener('change', () => {
        actualizarTabla();
        document.getElementById('inputPromedio').value = "";
    });
    
    contenedor.addEventListener('dblclick', manejarDobleClickFila);
}
// Actualizar la tabla con datos filtrados
export function actualizarTabla() {
    const opcionSeleccionada = opciones.value;
    const vehiculosFiltrados = filtrarPorTipo(opcionSeleccionada);
    contenedor.innerHTML = "";

    const tabla = crearTabla(vehiculosFiltrados);
    contenedor.appendChild(tabla);

    // 🔹 Crear contenedor de checkboxes si no existe
    const chkCont = inicializarColumnas(contenedor);

    // 🔹 Configurar checkboxes dinámicos
    configurarCheckboxColumnas(tabla, chkCont);

    // 🔹 Aplicar visibilidad inicial
    aplicarVisibilidadDeColumna(tabla);
}
// Manejar cálculo del promedio
function manejarCalculoPromedio(e) {
    e.preventDefault();
    const arrayFiltrado = filtrarPorTipo(opciones.value);
    const promedio = calcularPromedio(arrayFiltrado);
    document.getElementById('inputPromedio').value = promedio.toFixed(2);
}
// Manejar doble click en una fila para editar
function manejarDobleClickFila(e) {
    if (e.target.tagName === 'TH' || e.target.tagName === 'TD') {
        const id = e.target.parentElement.dataset.id;
        const vehiculo = vehiculos.find(v => v.id == id);
        if (vehiculo) cargarFormularioABM(vehiculo);
    }
}