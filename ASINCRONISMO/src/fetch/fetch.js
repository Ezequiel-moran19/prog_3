// fetch("https://jsonplaceholder.typicode.com/users") //Traemos la informacion que nos brinda la url
// .then(response => response.json()) //Transforma la respuestas en texto plano JSON a objetos en js para poder manipulat estos datos
// .then(data => console.table(data))
// .catch(error => console.error(error))

//Usamos async-await
async function obtenerDatos() {
   
    try {
        // Trae la informacion que la url nos brinda
        let res = await fetch("https://jsonplaceholder.typicode.com/users")
        // Procesamos la info y la transformamos a obj de js
        let data = await res.json()
    
        console.table(data)
        
    } catch (error) {
        console.error(error)
    }
}

obtenerDatos()