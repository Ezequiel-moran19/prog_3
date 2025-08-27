export const crearTabla = (data) => {
    // Creamos un elemento de tabla
    const tabla = document.createElement('table');
    const thead = document.createElement('thead');
    const cabecera = crearEncabezado(data);
    const tbody = crearCuerpo(data);
    thead.appendChild(cabecera);
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