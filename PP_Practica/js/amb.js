import { Persona } from './persona.js';
import { crearTabla } from './dinamicas.js';

const $divTabla = document.getElementById('idTabla');
const personas = JSON.parse(localStorage.getItem('personas')) || [];
const $formulario = document.forms[0];
const $btnSubmit = document.getElementById("btnSubmit");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");

// Ocultar botones por defecto
$btnEliminar.style.display = "none";
$btnCancelar.style.display = "inline-block"; // siempre disponible para alta también

actualizarTabla();

window.addEventListener('click', (e) => { 
    // Editar al hacer click en celda
    if (e.target.matches("td")) {
        const id = e.target.parentElement.dataset.id;
        const vehiculo = vehiculos.find(v => v.id == id);
        if (vehiculo) cargarFormularioABM(vehiculo);
    } 
    // Eliminar al hacer click en botón
    else if (e.target.matches("#btnEliminar")) {
        const id = parseInt(formABM.txtId.value);
        const index = vehiculos.findIndex(v => v.id == id);
        if (index > -1) vehiculos.splice(index, 1);
        formABM.reset();
        formABM.style.display = 'none';
        formDatosSection.style.display = 'block';
        actualizarTabla();
    }
});



// Función para cargar datos al formulario (edición)
function cargarFormulario(persona) {
    const { txtId, txtNombre, txtEdad, txtEmail, rdoGenero } = $formulario;
    txtId.value = persona.id;
    txtNombre.value = persona.nombre;
    txtEdad.value = persona.edad;
    txtEmail.value = persona.email;
    rdoGenero.value = persona.genero;

    $btnSubmit.value = "Modificar";
    $btnEliminar.style.display = "inline-block"; // solo visible en edición
}

// Evento Cancelar
$btnCancelar.addEventListener('click', () => {
    resetFormulario();
});

// Submit del formulario
$formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const { txtId, txtNombre, txtEdad, txtEmail, rdoGenero } = $formulario;

    const formPersona = new Persona(
        txtId.value,
        txtNombre.value,
        txtEdad.value,
        txtEmail.value,
        rdoGenero.value
    );

    if (formPersona.id === "") {
        formPersona.id = Date.now();
        handlerCreate(formPersona);
    } else {
        handlerUpdate(formPersona);
    }

    resetFormulario();
});

// Funciones CRUD
const handlerCreate = (nuevaPersona) => {
    personas.push(nuevaPersona);
    actualizarStorage();
    actualizarTabla();
}

const handlerUpdate = (personaEditada) => {
    const indice = personas.findIndex(persona => persona.id == personaEditada.id);
    personas.splice(indice, 1, personaEditada);
    personas.sort((a, b) => a.id - b.id);

    actualizarStorage();
    actualizarTabla();
}

const handlerDelete = (id) => {
    const indice = personas.findIndex(persona => persona.id == id);
    if (indice > -1) personas.splice(indice, 1);

    actualizarStorage();
    actualizarTabla();
}

// Actualizar tabla
function actualizarTabla() {
    while ($divTabla.firstChild) {
        $divTabla.removeChild($divTabla.firstChild);
    }
    if (personas.length > 0) {
        $divTabla.appendChild(crearTabla(personas));
    }
}

// Actualizar localStorage
const actualizarStorage = () => {
    localStorage.setItem('personas', JSON.stringify(personas));
}

// Reset de formulario y botones
function resetFormulario() {
    $formulario.reset();
    $btnSubmit.value = "Enviar";
    $btnEliminar.style.display = "none";
    // Cancelar siempre visible en alta
    $btnCancelar.style.display = "inline-block";
}