// Exportaciones para facilitar imports
export { inicializarFormulario, cargarFormularioABM, despuesAccionABM } from './gestor-formulario.js';
export { manejarEnvioFormulario, manejarEliminacion } from './manejadores-formulario.js';
export { 
    obtenerVehiculoDesdeFormulario, 
    actualizarCamposPorTipo, 
    reiniciarFormulario,
    llenarFormularioEdicion,
    configurarModoAlta 
} from '../utilidades-formulario.js';
export { validarFormularioVehiculo, extraerDatosFormulario } from './validaciones-formulario.js';
export { formularioABM, botonEnviar, botonEliminar, botonCancelar, seccionDatosFormulario, contenedorABM,obtenerElementosFormulario } from './elementos-dom.js';