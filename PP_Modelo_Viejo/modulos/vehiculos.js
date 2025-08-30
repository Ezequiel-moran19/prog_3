import { Aereo } from '../clases/aereo.js';
import { Terrestre } from '../clases/terrestre.js';
import { listaVehiculos } from '../componentes/lista.js';
import { guardarEnLocalStorage, obtenerDeLocalStorage, eliminarDeLocalStorage } from './form/almacenamiento.js';
import { inicializarFormulario } from './form/gestor-formulario.js';
import { inicializarTabla } from './tabla.js';

// Variables globales
export let vehiculos = [];

// Inicialización de la aplicación
export function inicializarAplicacion() {
    // Cargar vehículos desde localStorage o datos iniciales
    vehiculos = obtenerDeLocalStorage('datos') || JSON.parse(listaVehiculos);
    
    // Convertir a instancias de clases
    vehiculos = vehiculos.map(crearVehiculo).filter(v => v !== null);
    
    // Inicializar componentes
    inicializarFormulario();
    inicializarTabla();
}

// Función para crear instancias de vehículos
export function crearVehiculo(item) {
    if ('altMax' in item && 'autonomia' in item) {
        return new Aereo(item.id, item.modelo, item.anoFab, item.velMax, item.altMax, item.autonomia);
    }
    if ('cantPue' in item && 'cantRue' in item) {
        return new Terrestre(item.id, item.modelo, item.anoFab, item.velMax, item.cantPue, item.cantRue);
    }
    return null;
}

// Filtrar vehículos por tipo
export function filtrarPorTipo(tipoSeleccionado) {
    if (tipoSeleccionado === "Todos") return vehiculos;
    if (tipoSeleccionado === "Aereo") return vehiculos.filter(v => v instanceof Aereo);
    if (tipoSeleccionado === "Terrestre") return vehiculos.filter(v => v instanceof Terrestre);
    return [];
}

// Calcular promedio de velocidad máxima
export function calcularPromedio(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((acc, v) => acc + v.velMax, 0) / arr.length;
}

// Guardar vehículos en localStorage usando almacenamiento.js
export function guardarVehiculos() {
    guardarEnLocalStorage('datos', vehiculos);
}

// Agregar un nuevo vehículo
export function agregarVehiculo(vehiculo) {
    vehiculos.push(vehiculo);
    guardarVehiculos();
}

// Actualizar un vehículo existente
export function actualizarVehiculo(id, vehiculoActualizado) {
    const index = vehiculos.findIndex(v => v.id === id);
    if (index > -1) {
        vehiculos[index] = vehiculoActualizado;
        guardarVehiculos();
        return true;
    }
    return false;
}

// Eliminar un vehículo
export function eliminarVehiculo(id) {
    vehiculos = vehiculos.filter(v => v.id !== id);
    guardarVehiculos();
}

// Obtener el próximo ID disponible
export function obtenerProximoId() {
    return vehiculos.length === 0 ? 1 : Math.max(...vehiculos.map(v => v.id)) + 1;
}
