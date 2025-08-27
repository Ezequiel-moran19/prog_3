export const crearTabla = (data) => {
    const tabla = document.createElement('table');
    const thead = document.createElement('thead');

    const cabecera = crearEncabezado(data);
    thead.appendChild(cabecera);

    const tbody = crearCuerpo(data);
    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    return tabla;
};
function crearEncabezado(data) {
    const cabecera = document.createElement('tr');
    for (const key in data[0]) {
        if (key !== 'id') {
            const th = document.createElement('th');
            th.textContent = key.toUpperCase();
            cabecera.appendChild(th);
        }
    }
    return cabecera;
}
function crearCuerpo(data) {
    const tbody = document.createElement('tbody');
    data.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) {
            if (key === "id") {
                tr.setAttribute('data-id', element[key]);
            } else {
                const td = document.createElement('td');
                td.textContent = element[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}

///////////////////////////////////////////////////////

// Caso de Uso: Función crearTabla
// Propósito

// La función crearTabla genera dinámicamente una tabla HTML a partir de un arreglo de objetos JavaScript.
// Excluye la clave id de las columnas visibles, pero la mantiene como atributo data-id en cada fila para identificación interna.


// Parámetro:

// data (Array): Lista de objetos donde cada objeto representa una fila de la tabla.

// Retorno:

// HTMLElement: Elemento <table> completamente construido con encabezados (<thead>) y cuerpo (<tbody>).

// Estructura de Funcionamiento

// Creación de elementos base

// Se crean los elementos:

// <table> → Tabla principal.

// <thead> → Encabezado.

// <tbody> → Cuerpo de la tabla.

// <tr> → Fila de encabezados.

// Generación de Encabezados

// Se recorren las claves del primer objeto en data.

// Se excluye la clave "id".

// Para cada clave restante:

// Se crea un <th>.

// El texto del encabezado se convierte a mayúsculas (toUpperCase()).

// El <th> se agrega a la fila de encabezados <tr>.

// Se agrega la fila de encabezados a <thead>.

// <thead> se añade a la tabla.

// Generación del Cuerpo (tbody)

// Se recorre cada objeto de data.

// Se crea un <tr> para cada elemento.

// Por cada clave del objeto:

// Si la clave es "id":

// No se crea celda.

// Se asigna su valor como atributo data-id del <tr>.

// Si la clave no es "id":

// Se crea <td> con el valor correspondiente.

// Se agrega la celda al <tr>.

// Cada <tr> se agrega al <tbody>.

// <tbody> se añade a la tabla.

// Retorno

// Se retorna el elemento <table> completo.

// export const crearTabla = (data) => { 
//     const tabla = document.createElement('table');
//     const thead = document.createElement('thead');
//     const tbody = document.createElement('tbody');
//     const cabecera = document.createElement('tr'); 
//     // Cargo el thead de la tabla 
//     // Itero sobre las claves del primer objeto para crear los encabezados
//     // Excluyo la clave 'id' de los encabezados
//     // Esto evita que la columna 'id' aparezca en la tabla
//     for (const key in data[0]) { // Solo agrego las claves que no son 'id'
//         if(key !== 'id'){ // Esto evita que la columna 'id' aparezca en la tabla       
//             const th = document.createElement('th');  // Creo un elemento th para cada clave y lo agrego a la fila de encabezado
//             const contenido = document.createTextNode(key.toUpperCase()); // Asigno el texto del encabezado y uso toUpperCase para que el texto del encabezado esté en mayúsculas 
//             th.appendChild(contenido); cabecera.appendChild(th); // Agrego el th a la fila de encabezado
//         } 
//     } 
//     thead.appendChild(cabecera); // Agrego la cabecera al thead
//     tabla.appendChild(thead); // Agrego el thead a la tabla

//     // Cargo el tbody de la tabla
//     data.forEach(element => { // Itero sobre cada objeto en el array de datos, Cada objeto representa una fila de la tabla 
//         const tr = document.createElement('tr');  // Creo un elemento tr para cada objeto, este elemento contendrá las celdas de datos
//         // Itero sobre las claves del objeto y creo una celda para cada clave
//         for (const key in element) {  // Si la clave es 'id', la uso como atributo de datos para identificar la fila, pero no la muestro como una celda
//             // Si la clave es 'id', la uso como atributo de datos
//             if (key === "id") { 
//                 tr.setAttribute('data-id', element[key]); // Si la clave es 'id', la uso como atributo de datos para identificar la fila, pero no la muestro como una celda
//             }
//             else { // Si la clave no es 'id', creo una celda td y asigno el valor correspondiente del objeto
//                 const td = document.createElement('td');  // Creo un elemento td para la celda, este elemento contendrá el valor de la clave actual
//                 td.textContent = element[key]; // Asigno el valor del objeto a la celda, esto permite que cada celda muestre el valor correspondiente
//                 tr.appendChild(td); // Agrego la celda td a la fila tr, sto asegura que cada celda se muestre en la fila correspondiente
//             } 
//             } 
//             tbody.appendChild(tr); // Agrego la fila tr al tbody, esto asegura que cada fila se agregue al cuerpo de la tabla
//         }); 
//          // Agrego la fila tr al tbody, esto asegura que cada fila se agregue al cuerpo de la tabla
//         tabla.appendChild(tbody); // Agrego el tbody a la tabla
     
//      return tabla; // Retorno la tabla
// }