// Funciones de utilidad general

// Formatear número con decimales fijos
export function formatearNumero(numero, decimales = 2) {
    return Number(numero.toFixed(decimales));
}

// Validar si un valor es un número positivo
export function validarNumeroPositivo(valor) {
    return !isNaN(valor) && valor >= 0;
}

// Generar ID único
export function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}