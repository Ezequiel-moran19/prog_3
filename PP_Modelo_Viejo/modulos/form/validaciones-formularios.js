// Validaciones del formulario
export function validarFormularioVehiculo(datosFormulario) {
    const errores = {};
    
    if (!datosFormulario.modelo || datosFormulario.modelo.trim().length < 2) {
        errores.modelo = "El modelo debe tener al menos 2 caracteres";
    }
    
    const añoActual = new Date().getFullYear();
    if (!datosFormulario.anoFab || datosFormulario.anoFab < 1900 || datosFormulario.anoFab > añoActual) {
        errores.anoFab = "El año de fabricación no es válido";
    }
    
    if (!datosFormulario.velMax || datosFormulario.velMax <= 0) {
        errores.velMax = "La velocidad máxima debe ser mayor a 0";
    }
    
    if (datosFormulario.tipo === "Aereo") {
        if (!datosFormulario.altMax || datosFormulario.altMax <= 0) {
            errores.altMax = "La altura máxima debe ser mayor a 0";
        }
        if (!datosFormulario.autonomia || datosFormulario.autonomia <= 0) {
            errores.autonomia = "La autonomía debe ser mayor a 0";
        }
    } else {
        if (!datosFormulario.cantPue || datosFormulario.cantPue <= 0) {
            errores.cantPue = "La cantidad de puertas debe ser mayor a 0";
        }
        if (!datosFormulario.cantRue || datosFormulario.cantRue <= 0) {
            errores.cantRue = "La cantidad de ruedas debe ser mayor a 0";
        }
    }
    
    return {
        esValido: Object.keys(errores).length === 0,
        errores
    };
}

// Extraer datos del formulario para validación
export function extraerDatosFormulario(formularioABM) {
    const { 
        txtModelo, 
        txtAnoFab, 
        txtVelMax, 
        tipo,
        txtAltMax, 
        txtAutonomia, 
        txtCantPue, 
        txtCantRue 
    } = formularioABM;
    
    return {
        modelo: txtModelo.value,
        anoFab: parseInt(txtAnoFab.value),
        velMax: parseFloat(txtVelMax.value),
        tipo: tipo.value,
        altMax: parseFloat(txtAltMax.value),
        autonomia: parseFloat(txtAutonomia.value),
        cantPue: parseInt(txtCantPue.value),
        cantRue: parseInt(txtCantRue.value)
    };
}