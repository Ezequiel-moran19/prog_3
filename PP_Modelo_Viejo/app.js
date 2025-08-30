import { Aereo } from './clases/aereo.js'; 
import { Terrestre } from './clases/terrestre.js'; 
import { crearTabla } from './componentes/t-dinamica.js';
import { listaVehiculos } from './componentes/lista.js';

const contenedor = document.getElementById('idTabla');
const btnCalcular = document.getElementById('btnCalcular');
const opciones = document.getElementById('idOpciones');
const btnAgregar = document.getElementById("btnAgregar");
// ABM - FORMULARIO
let vehiculos = JSON.parse(localStorage.getItem('datos')) || JSON.parse(listaVehiculos);
const formABM = document.getElementById("form-abm");
const $btnSubmit = document.getElementById("btnSubmit");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");
const formDatosSection = document.querySelector(".container");
// ... todo tu código anterior sin cambios ...
const contABM = document.querySelector(".cont_abm"); // ⬅️ referencia al contenedor ABM
let visibleColumns = null;
// FUNCIONES CRUD, FORMULARIO Y TABLA
function cargarFormularioABM(vehiculo = null) {
    formABM.reset();
    formABM.txtId.disabled = true; // ID siempre inhabilitado
    if (vehiculo) {
        // --- EDICIÓN ---
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
        // Mostrar/ocultar botones
        $btnSubmit.value = "Modificar";
        $btnEliminar.style.display = "inline-block";
        $btnCancelar.style.display = "none";
    } else {
        // --- ALTA ---
        $btnSubmit.value = "Agregar";
        $btnEliminar.style.display = "none";
        $btnCancelar.style.display = "inline-block";
    }
    actualizarCamposPorTipo(formABM.tipo.value);
    formDatosSection.style.display = 'none';
    contABM.style.display = 'block';   // ✅ ahora muestra el section del ABM
}
formABM.tipo.addEventListener('change', () => {
    actualizarCamposPorTipo(formABM.tipo.value);
});
$btnCancelar.addEventListener('click', () => resetFormulario("Agregar"));
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
// Contenedor de checkboxes
let chkContainer = document.getElementById('chkContainer');
if (!chkContainer) {
    chkContainer = document.createElement('div');
    chkContainer.id = 'chkContainer';
    contenedor.parentNode.insertBefore(chkContainer, contenedor);
}
actualizarTabla();
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
  configurarCheckboxColumnas(tabla);
  aplicarVisibilidadDeColumna(tabla);
}
function configurarCheckboxColumnas(table) {
  const headerRow = table.querySelector('tr');
  if (!headerRow) return reiniciarCheckboxes();
  inicializarColumnasVisibles(headerRow.children.length);
  mostrarCheckboxColumnas(headerRow);
}
function reiniciarCheckboxes() {
  chkContainer.innerHTML = '';
  visibleColumns = null;
}
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
function mostrarCheckboxColumnas(headerRow) {
  chkContainer.innerHTML = '';
  Array.from(headerRow.children).forEach((th, i) => {
    const label = document.createElement('label');
    label.style.marginRight = '8px';
    const chk = crearCheckbox(i, th?.textContent?.trim() || `Col ${i}`);
    label.append(chk, document.createTextNode(' ' + (th?.textContent?.trim() || `Col ${i}`)));
    chkContainer.appendChild(label);
  });
}
function crearCheckbox(index, texto) {
  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.className = 'chkColumna';
  chk.dataset.index = index;
  chk.checked = visibleColumns[index];

  chk.addEventListener('change', () => {
    visibleColumns[index] = chk.checked;
    alterarVisibilidadColumnas(index, chk.checked);
  });
  return chk;
}
function alterarVisibilidadColumnas(index, visible) {
  const filas = contenedor.querySelectorAll('tr');
  filas.forEach(fila => {
    const celda = fila.children[index];
    if (celda) celda.style.display = visible ? '' : 'none';
  });
}
function aplicarVisibilidadDeColumna(table) {
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
  resetFormulario("enviar");
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
formABM.tipo.addEventListener('change', () => {
    actualizarCamposPorTipo(formABM.tipo.value);
});
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
btnAgregar.addEventListener('click', () => {
  resetFormulario("Agregar");
  formDatosSection.style.display = 'none';
  contABM.style.display = 'block';
});

function despuesAccionABM() {
  document.querySelector('.cont_abm').style.display = 'none';
  document.querySelector('.container').style.display = 'block';
  actualizarTabla();
}
$btnEliminar.addEventListener('click', () => {
    const id = parseInt(formABM.txtId.value);
    if (!isNaN(id)) {
        vehiculos = vehiculos.filter(v => v.id !== id);
        localStorage.setItem('datos', JSON.stringify(vehiculos));
        despuesAccionABM();
    }
});

// INICIALIZACIÓN
actualizarTabla();
