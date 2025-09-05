export class Alumno {
    constructor(dni, nombre, apellido) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    imprimirDatosAlumno() {
        // Mensaje en consola con backticks
        console.log(`Dni: ${this.dni}, Nombre: ${this.nombre}, Apellido: ${this.apellido}`);

        // Mostrar en el <nav>
        const nav = document.querySelector("nav");
        nav.innerHTML = `Alumno: ${this.nombre} ${this.apellido}`;
    }
}
