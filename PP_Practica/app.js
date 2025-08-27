import { Aereo } from "./js/aereo.js"; 
import { Terrestre } from "./js/terrestre.js";
import { crearTablaConCheckbox } from "./js/tabla_dinamica_checkbox.js";
import { listarVehiculos } from "./js/lista.js";

// --- Elementos DOM ---
const $divTabla = document.getElementById('idTabla');
const formDatosSection = document.querySelector('section:first-of-type');
const formABM = document.getElementById("form-abm");
const selectTipo = document.getElementById('tipo');
const btnCalcular = document.getElementById("btnaCalcular");
const btnAgregar = document.getElementById("btnSubmit");

// --- Array de vehículos ---
let vehiculos = [];

// --- Cargar datos iniciales ---
const datos = JSON.parse(listarVehiculos);
for (const element of datos) {
    if ('altMax' in element && 'autonomia' in element) {
        vehiculos.push(new Aereo(element.id, element.modelo, element.anoFab, element.velMax, element.altMax, element.autonomia));
    } else if ('cantPue' in element && 'cantRue' in element) {
        vehiculos.push(new Terrestre(element.id, element.modelo, element.anoFab, element.velMax, element.cantPue, element.cantRue));
    }
}

// --- Funciones ---

function actualizarTabla(datosFiltrados = vehiculos) {
    const vehiculosTabla = datosFiltrados.map(v => ({
        ...v,
        anoFab: (v.anoFab instanceof Date) ? v.anoFab.getFullYear() : v.anoFab
    }));
    $divTabla.innerHTML = "";
    if (vehiculosTabla.length > 0) {
        $divTabla.appendChild(crearTablaConCheckbox(vehiculosTabla));
    }
}

// Habilitar/deshabilitar campos según tipo
function actualizarCamposPorTipo(tipo) {
    const isAereo = tipo === "Aereo";
    formABM.txtAltMax.disabled = !isAereo;
    formABM.txtAutonomia.disabled = !isAereo;
    formABM.txtCantPue.disabled = isAereo;
    formABM.txtCantRue.disabled = isAereo;
}

// Cargar formulario ABM
function cargarFormularioABM(vehiculo = null) {
    formABM.reset();
    formABM.txtId.disabled = true; // ID siempre inhabilitado

    if (vehiculo) {
        formABM.txtId.value = vehiculo.id;
        formABM.txtModelo.value = vehiculo.modelo;
        formABM.txtAnoFab.value = vehiculo.anoFab instanceof Date ? vehiculo.anoFab.getFullYear() : vehiculo.anoFab;
        formABM.txtVelMax.value = vehiculo.velMax;
        formABM.tipo.value = vehiculo.tipo;

        if (vehiculo.tipo === "Aereo") {
            formABM.txtAltMax.value = vehiculo.altMax;
            formABM.txtAutonomia.value = vehiculo.autonomia;
        } else {
            formABM.txtCantPue.value = vehiculo.cantPue;
            formABM.txtCantRue.value = vehiculo.cantRue;
        }
    }
    actualizarCamposPorTipo(vehiculo ? vehiculo.tipo : formABM.tipo.value);
    formDatosSection.style.display = 'none';
    formABM.style.display = 'block';
}

// Listener tipo ABM
formABM.tipo.addEventListener('change', () => {
    actualizarCamposPorTipo(formABM.tipo.value);
});

// Guardar cambios / alta / modificación
formABM.addEventListener('submit', e => {
    e.preventDefault();

    // ID autoincremental
    let idNuevo;
    if (!formABM.txtId.value) {
        idNuevo = vehiculos.length === 0 ? 1 : vehiculos.map(v => v.id).reduce((max, curr) => curr > max ? curr : max, 0) + 1;
    } else {
        idNuevo = parseInt(formABM.txtId.value);
    }

    const nuevo = {
        id: idNuevo,
        modelo: formABM.txtModelo.value,
        anoFab: parseInt(formABM.txtAnoFab.value),
        velMax: parseFloat(formABM.txtVelMax.value),
        tipo: formABM.tipo.value
    };

    if (nuevo.tipo === "Aereo") {
        nuevo.altMax = parseFloat(formABM.txtAltMax.value);
        nuevo.autonomia = parseFloat(formABM.txtAutonomia.value);
    } else {
        nuevo.cantPue = parseInt(formABM.txtCantPue.value);
        nuevo.cantRue = parseInt(formABM.txtCantRue.value);
    }

    const index = vehiculos.findIndex(v => v.id === idNuevo);
    if (index > -1) vehiculos[index] = nuevo;
    else vehiculos.push(nuevo);

    formABM.style.display = 'none';
    formDatosSection.style.display = 'block';
    actualizarTabla();
});

// Cancelar ABM
document.getElementById("btnCancelar").addEventListener("click", () => {
    formABM.reset();
    formABM.style.display = 'none';
    formDatosSection.style.display = 'block';
});

// Doble click sobre fila → editar
$divTabla.addEventListener('dblclick', e => {
    if (e.target.tagName === 'TD') {
        const id = e.target.parentElement.dataset.id;
        const vehiculo = vehiculos.find(v => v.id == id);
        cargarFormularioABM(vehiculo);
    }
});

// Alta desde botón
btnAgregar.addEventListener('click', () => cargarFormularioABM());

// Filtrar por tipo
selectTipo.addEventListener('change', () => {
    const tipo = selectTipo.value;
    const filtrados = tipo ? vehiculos.filter(v => v.tipo === tipo) : vehiculos;
    actualizarTabla(filtrados);
});

// Calcular velocidad máxima promedio
btnCalcular.addEventListener("click", () => {
    const tipo = selectTipo.value;
    const filtrados = tipo ? vehiculos.filter(v => v.tipo === tipo) : vehiculos;
    if (filtrados.length === 0) return alert("No hay vehículos para calcular");
    const sumaVel = filtrados.reduce((acc, v) => acc + v.velMax, 0);
    const promedio = sumaVel / filtrados.length;
    alert("Velocidad máxima promedio: " + promedio.toFixed(2));
});

// Inicializar tabla al cargar
actualizarTabla();
