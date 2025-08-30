// --- t-dinamica.js ---
export const crearTabla = (data) => { 
    if (!data || data.length === 0) return document.createElement('table');

    const columnas = obtenerColumnas(data);   // detecta todas las propiedades
    const tabla = document.createElement('table');
    const thead = crearEncabezado(columnas);
    const tbody = crearCuerpo(data, columnas);

    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    return tabla;
};

// --- Funciones auxiliares ---
function obtenerColumnas(data) {
    const columnasSet = new Set();
    data.forEach(item => {
        Object.keys(item).forEach(key => columnasSet.add(key));
    });
    return Array.from(columnasSet);
}

function crearEncabezado(columnas) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    columnas.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col.toUpperCase();
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    return thead;
}
function crearCuerpo(data, columnas) {
  const tbody = document.createElement('tbody');

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id; // importante
    columnas.forEach(col => {
      const td = document.createElement('td');
      td.textContent = item[col] ?? '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  return tbody;
}