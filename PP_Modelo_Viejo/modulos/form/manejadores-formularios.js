import { obtenerVehiculoDesdeFormulario, actualizarCamposPorTipo, reiniciarFormulario } from '../form/utilidades-formulario.js';
import { agregarVehiculo, actualizarVehiculo, eliminarVehiculo, vehiculos } from '../vehiculos.js';
import { actualizarTabla } from '../tabla.js';
import { contenedorABM, seccionDatosFormulario } from '../form/elementos-dom.js';
import { obtenerElementosFormulario } from '../form/gestor-formulario.js';
import { validarFormularioVehiculo, extraerDatosFormulario } from './validaciones-formularios.js';

// Configurar eventos del formulario
export function inicializarEventos() {
    const { formularioABM, botonCancelar, botonEliminar } = obtenerElementosFormulario();
    
    formularioABM.tipo.addEventListener('change', () => {
        actualizarCamposPorTipo(formularioABM.tipo.value);
    });
    
    botonCancelar.addEventListener('click', () => reiniciarFormulario("Agregar"));
    formularioABM.addEventListener('submit', manejarEnvioFormulario);
    botonEliminar.addEventListener('click', manejarEliminacion);
}
// Manejar envío del formulario
export function manejarEnvioFormulario(evento) {
    evento.preventDefault();
    
    const formularioABM = evento.target;

    // 1. Extraer datos
    const datos = extraerDatosFormulario(formularioABM);

    // 2. Validar
    const { esValido, errores } = validarFormularioVehiculo(datos);
    if (!esValido) {
        alert("Errores en el formulario:\n" + Object.values(errores).join("\n"));
        return;
    }

    // 3. Crear objeto Vehículo (seguro válido)
    const vehiculo = obtenerVehiculoDesdeFormulario(formularioABM);
    const idNuevo = vehiculo.id;

    // 4. Guardar en array
    const indice = vehiculos.findIndex(v => v.id === idNuevo);
    if (indice > -1) {
        actualizarVehiculo(idNuevo, vehiculo);
    } else {
        agregarVehiculo(vehiculo);
    }

    // 5. Post-acción
    despuesAccionABM();
}
// Manejar eliminación de vehículo
export function manejarEliminacion() {
    const { formularioABM } = obtenerElementosFormulario();
    const id = parseInt(formularioABM.txtId.value);
    
    if (!isNaN(id)) {
        eliminarVehiculo(id);
        despuesAccionABM();
    }
}
// Acciones después de operación ABM
export function despuesAccionABM() {
    contenedorABM.style.display = 'none';
    seccionDatosFormulario.style.display = 'block';
    actualizarTabla();
}