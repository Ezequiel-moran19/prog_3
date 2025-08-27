import { personas } from './persona.js';
import { crearTabla } from './dinamicas.js';

window.addEventListener('click', (e) => {
    if (e.target.matches("td")){
        console.log(e.target.parentElement.dataset.id);
    }
})

const $divTabla = document.getElementById('idTabla');
const actualizarTabla = (personas) => {
    $divTabla.appendChild(crearTabla(personas));
}

actualizarTabla(personas);