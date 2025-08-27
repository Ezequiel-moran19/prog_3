// export const personas = [
//   { id: 1, nombre: "Juan", apellido: "Pérez", edad: 30, email: "juan.perez@example.com", genero: "Masculino" },
//   { id: 2, nombre: "María", apellido: "García", edad: 25, email: "maria.garcia@example.com", genero: "Femenino" },
//   { id: 3, nombre: "Carlos", apellido: "López", edad: 40, email: "carlos.lopez@example.com", genero: "Masculino" },
//   { id: 4, nombre: "Ana", apellido: "Martínez", edad: 35, email: "ana.martinez@example.com", genero: "Femenino" },
//   { id: 5, nombre: "Luis", apellido: "Gómez", edad: 28, email: "luis.gomez@example.com", genero: "Masculino" },
//   { id: 6, nombre: "Sofía", apellido: "Díaz", edad: 32, email: "sofia.diaz@example.com", genero: "Femenino" },
//   { id: 7, nombre: "Pedro", apellido: "Fernández", edad: 45, email: "pedro.fernandez@example.com", genero: "Masculino" },
//   { id: 8, nombre: "Laura", apellido: "Torres", edad: 27, email: "laura.torres@example.com", genero: "Femenino" },
//   { id: 9, nombre: "Miguel", apellido: "Sánchez", edad: 38, email: "miguel.sanchez@example.com", genero: "Masculino" },
//   { id: 10, nombre: "Lucía", apellido: "Romero", edad: 29, email: "lucia.romero@example.com", genero: "Femenino" }
// ];

export class Persona {
  constructor(id, nombre, edad, email, genero) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
    this.genero = genero;
  }
}

