import { Aereo } from '../../clases/aereo.js';
import { Terrestre } from '../../clases/terrestre.js';
import { obtenerProximoId } from '../vehiculos.js';
import { obtenerElementosFormulario } from '../../modulos/form/gestor-formulario.js';

// Obtener vehículo desde los datos del formulario
export function obtenerVehiculoDesdeFormulario(formularioABM) {
    const { 
        txtId, 
        txtModelo, 
        txtAnoFab, 
        txtVelMax, 
        tipo,
        txtAltMax, 
        txtAutonomia, 
        txtCantPue, 
        txtCantRue 
    } = formularioABM;
    
    const id = txtId.value ? parseInt(txtId.value) : obtenerProximoId();
    const modelo = txtModelo.value;
    const anoFab = parseInt(txtAnoFab.value);
    const velMax = parseFloat(txtVelMax.value);
    
    if (tipo.value === "Aereo") {
        const altMax = parseFloat(txtAltMax.value);
        const autonomia = parseFloat(txtAutonomia.value);
        return new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
    }
    
    const cantPue = parseInt(txtCantPue.value);
    const cantRue = parseInt(txtCantRue.value);
    return new Terrestre(id, modelo, anoFab, velMax, cantPue, cantRue);
}

// Actualizar campos según el tipo de vehículo
export function actualizarCamposPorTipo(tipo) {
    const { 
        txtAltMax, 
        txtAutonomia, 
        txtCantPue, 
        txtCantRue 
    } = obtenerElementosFormulario();
    
    const esAereo = tipo === "Aereo";
    
    txtAltMax.disabled = !esAereo;
    txtAutonomia.disabled = !esAereo;
    txtCantPue.disabled = esAereo;
    txtCantRue.disabled = esAereo;
}

// Resetear formulario
export function reiniciarFormulario(modo = "Agregar") {
    const { formularioABM, botonEnviar, botonEliminar } = obtenerElementosFormulario();
    
    formularioABM.reset();
    botonEnviar.value = modo === "Agregar" ? "Agregar" : "Modificar";
    botonEliminar.style.display = modo === "Agregar" ? "none" : "inline-block";
    actualizarCamposPorTipo(formularioABM.tipo.value);
}

// Llenar formulario para edición
export function llenarFormularioEdicion(vehiculo) {
    const { 
        formularioABM, 
        botonEnviar, 
        botonEliminar, 
        botonCancelar 
    } = obtenerElementosFormulario();
    
    const { id, modelo, anoFab, velMax } = vehiculo;
    
    formularioABM.txtId.value = id;
    formularioABM.txtModelo.value = modelo;
    formularioABM.txtAnoFab.value = anoFab;
    formularioABM.txtVelMax.value = velMax;

    if (vehiculo instanceof Aereo) {
        const { altMax, autonomia } = vehiculo;
        formularioABM.tipo.value = "Aereo";
        formularioABM.txtAltMax.value = altMax;
        formularioABM.txtAutonomia.value = autonomia;
    } else if (vehiculo instanceof Terrestre) {
        const { cantPue, cantRue } = vehiculo;
        formularioABM.tipo.value = "Terrestre";
        formularioABM.txtCantPue.value = cantPue;
        formularioABM.txtCantRue.value = cantRue;
    }
    
    botonEnviar.value = "Modificar";
    botonEliminar.style.display = "inline-block";
    botonCancelar.style.display = "none";
}

// Configurar modo alta
export function configurarModoAlta() {
    const { botonEnviar, botonEliminar, botonCancelar } = obtenerElementosFormulario();
    
    botonEnviar.value = "Agregar";
    botonEliminar.style.display = "none";
    botonCancelar.style.display = "inline-block";
}