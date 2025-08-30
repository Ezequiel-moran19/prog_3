import { inicializarEventos } from '../form/manejadores-formularios.js';
import { actualizarCamposPorTipo, reiniciarFormulario, llenarFormularioEdicion, configurarModoAlta } from '../form/utilidades-formulario.js';
import { contenedorABM, seccionDatosFormulario, formularioABM, botonEnviar, botonEliminar, botonCancelar } from './elementos-dom.js';

// Inicialización del formulario
export function inicializarFormulario() {
    inicializarEventos();
}

// Cargar formulario para edición o creación
export function cargarFormularioABM(vehiculo = null) {
    reiniciarFormulario();
    if (vehiculo) {
        llenarFormularioEdicion(vehiculo);
    } else {
        configurarModoAlta();
    }
    actualizarCamposPorTipo(obtenerTipoSeleccionado());
    alternarVistas(false);
}

// Acciones después de una operación ABM
export function despuesAccionABM() {
    alternarVistas(true);
}

// Cambiar entre vistas
function alternarVistas(mostrarDatos) {
    contenedorABM.style.display = mostrarDatos ? 'none' : 'block';
    seccionDatosFormulario.style.display = mostrarDatos ? 'block' : 'none';
}

// Helper para obtener tipo seleccionado
function obtenerTipoSeleccionado() {
    return formularioABM.tipo.value;
}

// Centralizar obtención de elementos del formulario
export function obtenerElementosFormulario() {
    return {
        formularioABM,
        txtId: formularioABM.txtId,
        txtModelo: formularioABM.txtModelo,
        txtAnoFab: formularioABM.txtAnoFab,
        txtVelMax: formularioABM.txtVelMax,
        tipo: formularioABM.tipo,
        txtAltMax: formularioABM.txtAltMax,
        txtAutonomia: formularioABM.txtAutonomia,
        txtCantPue: formularioABM.txtCantPue,
        txtCantRue: formularioABM.txtCantRue,
        botonEnviar,
        botonEliminar,
        botonCancelar
    };
}
