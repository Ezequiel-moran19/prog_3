// almacenamiento.js

// Guardar un dato en localStorage
export function guardarEnLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Obtener un dato del localStorage
export function obtenerDeLocalStorage(clave) {
    const dato = localStorage.getItem(clave);
    return dato ? JSON.parse(dato) : null;
}

// Eliminar un dato del localStorage
export function eliminarDeLocalStorage(clave) {
    localStorage.removeItem(clave);
}

// Limpiar todo el localStorage
export function limpiarLocalStorage() {
    localStorage.clear();
}
