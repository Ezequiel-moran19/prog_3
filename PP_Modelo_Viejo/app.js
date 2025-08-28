import { Aereo } from './aereo.js'; 
import { Terrestre } from './terrestre.js';
import { crearTabla } from './t-dinamica.js';
import { listaVehiculos } from './lista.js';

const contenedor = document.getElementById('idTabla');
const btnCalcular = document.getElementById('btnCalcular');
const opciones = document.getElementById('idOpciones');
const btnAgregar = document.getElementById("btnAgregar");

// ABM - FORMULARIO
let vehiculos = JSON.parse(localStorage.getItem('datos')) || JSON.parse(listaVehiculos);
const formABM = document.getElementById("form-abm");
const selectTipo = document.getElementById('tipo');
const $btnSubmit = document.getElementById("btnSubmit");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");
const formDatosSection = document.querySelector(".container");

// Contenedor de checkboxes
const chkContainer = document.getElementById('chkContainer') || (() => {
  const c = document.createElement('div');
  c.id = 'chkContainer';
  contenedor.parentNode.insertBefore(c, contenedor);
  return c;
})();

let visibleColumns = null;

// CREACIÓN DE VEHÍCULOS
function crearVehiculo(item) {
  if ('altMax' in item && 'autonomia' in item) {
    return new Aereo(item.id, item.modelo, item.anoFab, item.velMax, item.altMax, item.autonomia);
  }
  if ('cantPue' in item && 'cantRue' in item) {
    return new Terrestre(item.id, item.modelo, item.anoFab, item.velMax, item.cantPue, item.cantRue);
  }
  return null;
}

// Convertir datos iniciales en instancias
vehiculos = vehiculos.map(crearVehiculo).filter(v => v !== null);

// FUNCIONES AUXILIARES
function filtrarPorTipo(arr, tipoSeleccionado) {
  if (tipoSeleccionado === "Todos") return arr;
  if (tipoSeleccionado === "Aereo") return arr.filter(v => v instanceof Aereo);
  if (tipoSeleccionado === "Terrestre") return arr.filter(v => v instanceof Terrestre);
  return [];
}

function calcularPromedio(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((acc, v) => acc + v.velMax, 0) / arr.length;
}

// TABLA + CHECKBOX
function actualizarTabla() {
  const opcionSeleccionada = opciones.value;
  const vehiculosFiltrados = filtrarPorTipo(vehiculos, opcionSeleccionada);
  contenedor.innerHTML = "";
  const tabla = crearTabla(vehiculosFiltrados);
  contenedor.appendChild(tabla);
  setupColumnCheckboxes(tabla);
  applyColumnVisibility(tabla);
}

function setupColumnCheckboxes(table) {
  const headerRow = table.querySelector('tr');
  if (!headerRow) return resetCheckboxes();
  initializeVisibleColumns(headerRow.children.length);
  renderColumnCheckboxes(headerRow);
}
function resetCheckboxes() {
  chkContainer.innerHTML = '';
  visibleColumns = null;
}
function initializeVisibleColumns(colCount) {
  const prev = visibleColumns || [];
  visibleColumns = Array.from({ length: colCount }, (_, i) => prev[i] !== undefined ? prev[i] : true);
}
function renderColumnCheckboxes(headerRow) {
  chkContainer.innerHTML = '';
  Array.from(headerRow.children).forEach((th, i) => {
    const label = document.createElement('label');
    label.style.marginRight = '8px';
    const chk = createCheckbox(i, th?.textContent?.trim() || `Col ${i}`);
    label.append(chk, document.createTextNode(' ' + (th?.textContent?.trim() || `Col ${i}`)));
    chkContainer.appendChild(label);
  });
}
function createCheckbox(index, texto) {
  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.className = 'chkColumna';
  chk.dataset.index = index;
  chk.checked = visibleColumns[index];

  chk.addEventListener('change', () => {
    visibleColumns[index] = chk.checked;
    toggleColumnVisibility(index, chk.checked);
  });
  return chk;
}
function toggleColumnVisibility(index, visible) {
  const filas = contenedor.querySelectorAll('tr');
  filas.forEach(fila => {
    const celda = fila.children[index];
    if (celda) celda.style.display = visible ? '' : 'none';
  });
}
function applyColumnVisibility(table) {
  if (!visibleColumns) return;
  const filas = contenedor.querySelectorAll('tr');
  filas.forEach(fila => {
    for (let i = 0; i < fila.children.length; i++) {
      const celda = fila.children[i];
      if (celda) celda.style.display = (visibleColumns[i] !== false) ? '' : 'none';
    }
  });
}

// EVENTOS
btnCalcular.addEventListener('click', e => {
  e.preventDefault();
  const arrayFiltrado = filtrarPorTipo(vehiculos, opciones.value);
  const promedio = calcularPromedio(arrayFiltrado);
  document.getElementById('inputPromedio').value = promedio.toFixed(2);
});

btnAgregar.addEventListener('click', () => {
  resetFormulario();
  document.querySelector('.container').style.display = 'none';
  document.querySelector('.cont_abm').style.display = 'block';
});

opciones.addEventListener('change', () => {
  actualizarTabla();
  document.getElementById('inputPromedio').value = "";
});

function actualizarCamposPorTipo(tipo) {
    const isAereo = tipo === "Aereo";
    formABM.txtAltMax.disabled = !isAereo;
    formABM.txtAutonomia.disabled = !isAereo;
    formABM.txtCantPue.disabled = isAereo;
    formABM.txtCantRue.disabled = isAereo;
}

// FUNCIONES CRUD, FORMULARIO Y TABLA
function cargarFormularioABM(vehiculo = null) {
    formABM.reset();
    formABM.txtId.disabled = true; // ID siempre inhabilitado

    if (vehiculo) {
        formABM.txtId.value = vehiculo.id;
        formABM.txtModelo.value = vehiculo.modelo;
        formABM.txtAnoFab.value = vehiculo.anoFab;
        formABM.txtVelMax.value = vehiculo.velMax;

        if (vehiculo instanceof Aereo) {
            formABM.tipo.value = "Aereo";
            formABM.txtAltMax.value = vehiculo.altMax;
            formABM.txtAutonomia.value = vehiculo.autonomia;
        } else if (vehiculo instanceof Terrestre) {
            formABM.tipo.value = "Terrestre";
            formABM.txtCantPue.value = vehiculo.cantPue;
            formABM.txtCantRue.value = vehiculo.cantRue;
        }
    }

    actualizarCamposPorTipo(formABM.tipo.value);
    formDatosSection.style.display = 'none';
    formABM.style.display = 'block';
}

formABM.tipo.addEventListener('change', () => {
    actualizarCamposPorTipo(formABM.tipo.value);
});

$btnCancelar.addEventListener('click', () => resetFormulario());

formABM.addEventListener('submit', e => {
    e.preventDefault();

    let idNuevo;
    if (!formABM.txtId.value) {
        idNuevo = vehiculos.length === 0 ? 1 : Math.max(...vehiculos.map(v => v.id)) + 1;
    } else {
        idNuevo = parseInt(formABM.txtId.value);
    }

    let nuevo;
    if (formABM.tipo.value === "Aereo") {
        nuevo = new Aereo(
            idNuevo,
            formABM.txtModelo.value,
            parseInt(formABM.txtAnoFab.value),
            parseFloat(formABM.txtVelMax.value),
            parseFloat(formABM.txtAltMax.value),
            parseFloat(formABM.txtAutonomia.value)
        );
    } else {
        nuevo = new Terrestre(
            idNuevo,
            formABM.txtModelo.value,
            parseInt(formABM.txtAnoFab.value),
            parseFloat(formABM.txtVelMax.value),
            parseInt(formABM.txtCantPue.value),
            parseInt(formABM.txtCantRue.value)
        );
    }

    const index = vehiculos.findIndex(v => v.id === idNuevo);
    if (index > -1) vehiculos[index] = nuevo;
    else vehiculos.push(nuevo);

    localStorage.setItem('datos', JSON.stringify(vehiculos));
    despuesAccionABM();
});

// Doble click sobre fila → editar
contenedor.addEventListener('dblclick', e => {
    if (e.target.tagName === 'TD') {
        const id = e.target.parentElement.dataset.id;
        const vehiculo = vehiculos.find(v => v.id == id);
        if (vehiculo) cargarFormularioABM(vehiculo);
    }
});

// UTILIDADES
function resetFormulario() {
  formABM.reset();
  $btnSubmit.value = "Enviar";
  $btnEliminar.style.display = "none";
  $btnCancelar.style.display = "inline-block";
}
function despuesAccionABM() {
  document.querySelector('.cont_abm').style.display = 'none';
  document.querySelector('.container').style.display = 'block';
  actualizarTabla();
}

// INICIALIZACIÓN
actualizarTabla();
