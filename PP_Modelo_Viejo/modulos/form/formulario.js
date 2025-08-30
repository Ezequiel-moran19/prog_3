import { inicializarFormulario } from "./gestor-formulario.js";

document.addEventListener("DOMContentLoaded", () => {
    inicializarFormulario();
});
inicializarFormulario

// import { Aereo } from '../clases/aereo.js';
// import { Terrestre } from '../clases/terrestre.js';
// import { vehiculos, agregarVehiculo, actualizarVehiculo, eliminarVehiculo, obtenerProximoId } from './vehiculos.js';
// import { actualizarTabla } from './tabla.js';

// // Elementos del DOM
// const formABM = document.getElementById("form-abm");
// const $btnSubmit = document.getElementById("btnSubmit");
// const $btnEliminar = document.getElementById("btnEliminar");
// const $btnCancelar = document.getElementById("btnCancelar");
// const formDatosSection = document.querySelector(".container");
// const contABM = document.querySelector(".cont_abm");

// // Inicialización del formulario
// export function inicializarFormulario() {
//     configurarEventosFormulario();
// }

// // Configurar eventos del formulario
// function configurarEventosFormulario() {
//     formABM.tipo.addEventListener('change', () => {
//         actualizarCamposPorTipo(formABM.tipo.value);
//     });
    
//     $btnCancelar.addEventListener('click', () => resetFormulario("Agregar"));
    
//     formABM.addEventListener('submit', manejarEnvioFormulario);
    
//     $btnEliminar.addEventListener('click', manejarEliminacion);
// }
// // Cargar formulario para edición o creación
// export function cargarFormularioABM(vehiculo = null) {
//     formABM.reset();
//     formABM.txtId.disabled = true;
    
//     if (vehiculo) {
//         // Modo edición
//         formABM.txtId.value = vehiculo.id;
//         formABM.txtModelo.value = vehiculo.modelo;
//         formABM.txtAnoFab.value = vehiculo.anoFab;
//         formABM.txtVelMax.value = vehiculo.velMax;

//         if (vehiculo instanceof Aereo) {
//             formABM.tipo.value = "Aereo";
//             formABM.txtAltMax.value = vehiculo.altMax;
//             formABM.txtAutonomia.value = vehiculo.autonomia;
//         } else if (vehiculo instanceof Terrestre) {
//             formABM.tipo.value = "Terrestre";
//             formABM.txtCantPue.value = vehiculo.cantPue;
//             formABM.txtCantRue.value = vehiculo.cantRue;
//         }
        
//         $btnSubmit.value = "Modificar";
//         $btnEliminar.style.display = "inline-block";
//         $btnCancelar.style.display = "none";
//     } else {
//         // Modo alta
//         $btnSubmit.value = "Agregar";
//         $btnEliminar.style.display = "none";
//         $btnCancelar.style.display = "inline-block";
//     }
    
//     actualizarCamposPorTipo(formABM.tipo.value);
//     formDatosSection.style.display = 'none';
//     contABM.style.display = 'block';
// }
// // Manejar envío del formulario
// function manejarEnvioFormulario(e) {
//     e.preventDefault();
    
//     let idNuevo = formABM.txtId.value ? parseInt(formABM.txtId.value) : obtenerProximoId();

//     let nuevo;
//     if (formABM.tipo.value === "Aereo") {
//         nuevo = new Aereo(
//             idNuevo,
//             formABM.txtModelo.value,
//             parseInt(formABM.txtAnoFab.value),
//             parseFloat(formABM.txtVelMax.value),
//             parseFloat(formABM.txtAltMax.value),
//             parseFloat(formABM.txtAutonomia.value)
//         );
//     } else {
//         nuevo = new Terrestre(
//             idNuevo,
//             formABM.txtModelo.value,
//             parseInt(formABM.txtAnoFab.value),
//             parseFloat(formABM.txtVelMax.value),
//             parseInt(formABM.txtCantPue.value),
//             parseInt(formABM.txtCantRue.value)
//         );
//     }

//     const index = vehiculos.findIndex(v => v.id === idNuevo);
//     if (index > -1) {
//         actualizarVehiculo(idNuevo, nuevo);
//     } else {
//         agregarVehiculo(nuevo);
//     }
    
//     despuesAccionABM();
// }

// export function obtenerVehiculoDesdeFormulario(formABM) {
//     const id = formABM.txtId.value ? parseInt(formABM.txtId.value) : obtenerProximoId();
//     if (formABM.tipo.value === "Aereo") {
//         return new Aereo(id, formABM.txtModelo.value, parseInt(formABM.txtAnoFab.value), parseFloat(formABM.txtVelMax.value), parseFloat(formABM.txtAltMax.value), parseFloat(formABM.txtAutonomia.value));
//     }
//     return new Terrestre(id, formABM.txtModelo.value, parseInt(formABM.txtAnoFab.value), parseFloat(formABM.txtVelMax.value), parseInt(formABM.txtCantPue.value), parseInt(formABM.txtCantRue.value));
// }


// // Manejar eliminación de vehículo
// function manejarEliminacion() {
//     const id = parseInt(formABM.txtId.value);
//     if (!isNaN(id)) {
//         eliminarVehiculo(id);
//         despuesAccionABM();
//     }
// }

// // Actualizar campos según el tipo de vehículo
// export function actualizarCamposPorTipo(tipo) {
//     const isAereo = tipo === "Aereo";
//     formABM.txtAltMax.disabled = !isAereo;
//     formABM.txtAutonomia.disabled = !isAereo;
//     formABM.txtCantPue.disabled = isAereo;
//     formABM.txtCantRue.disabled = isAereo;
// }

// // Resetear formulario
// export function resetFormulario(modo) {
//     formABM.reset();
//     $btnSubmit.value = modo === "Agregar" ? "Agregar" : "Modificar";
//     $btnEliminar.style.display = modo === "Agregar" ? "none" : "inline-block";
//     actualizarCamposPorTipo(formABM.tipo.value);
// }

// // Acciones después de una operación ABM
// export function despuesAccionABM() {
//     contABM.style.display = 'none';
//     formDatosSection.style.display = 'block';
//     actualizarTabla();
// }
