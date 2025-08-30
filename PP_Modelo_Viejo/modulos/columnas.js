// Variables globales
let chkContainer = document.getElementById('chkContainer');
let visibleColumns = null;
// Inicializar sistema de columnas
export function inicializarColumnas(contenedorTabla, contenedorChk = null) {
  if (chkContainer) return chkContainer;
  // ❌ Solo creo uno nuevo si no existe
  if (!contenedorChk) {
    contenedorChk = document.createElement('div');
    contenedorChk.id = 'chkContainer';
    contenedorTabla.parentNode.insertBefore(contenedorChk, contenedorTabla);
  }
  return contenedorChk;
}
// Configurar checkboxes para columnas
export function configurarCheckboxColumnas(table, chkContainer) {
  const headerRow = table.querySelector('tr');
  if (!headerRow) return reiniciarCheckboxes(chkContainer);

  inicializarColumnasVisibles(headerRow.children.length);
  mostrarCheckboxColumnas(headerRow, chkContainer, table);
}
// Reiniciar checkboxes
function reiniciarCheckboxes(chkCont) {
    chkCont.innerHTML = '';
    visibleColumns = null;
}
// Inicializar array de columnas visibles
function inicializarColumnasVisibles(cantidadColumnas) {
    const anterior = visibleColumns || [];
    visibleColumns = [];
    
    for (let i = 0; i < cantidadColumnas; i++) {
        if (anterior[i] !== undefined) {
            visibleColumns[i] = anterior[i];
        } else {
            visibleColumns[i] = true;
        }
    }
}
// Mostrar checkboxes para controlar columnas
function mostrarCheckboxColumnas(headerRow, chkContainer, table) {
  chkContainer.innerHTML = '';
  Array.from(headerRow.children).forEach((th, i) => {
    const label = document.createElement('label');
    label.style.marginRight = '8px';

    const chk = crearCheckbox(i, th?.textContent?.trim() || `Col ${i}`, table);
    label.append(chk, document.createTextNode(' ' + (th?.textContent?.trim() || `Col ${i}`)));

    chkContainer.appendChild(label);
  });
}
function crearCheckbox(index, texto, table) {
  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.className = 'chkColumna';
  chk.dataset.index = index;
  chk.checked = visibleColumns[index];

  chk.addEventListener('change', () => {
    visibleColumns[index] = chk.checked;
    alterarVisibilidadColumnas(index, chk.checked, table);
  });

  return chk;
}
// Alterar visibilidad de una columna específica
function alterarVisibilidadColumnas(index, visible, tableContainer) {
  const filas = tableContainer.querySelectorAll('tr');
  filas.forEach(fila => {
    const celda = fila.children[index];
    if (celda) celda.style.display = visible ? '' : 'none';
  });
}
// Aplicar visibilidad a todas las columnas
export function aplicarVisibilidadDeColumna(table) {
    if (!visibleColumns) return;
    
    const filas = table.querySelectorAll('tr');
    
    filas.forEach(fila => {
        for (let i = 0; i < fila.children.length; i++) {
            const celda = fila.children[i];
            if (celda) celda.style.display = (visibleColumns[i] !== false) ? '' : 'none';
        }
    });
}