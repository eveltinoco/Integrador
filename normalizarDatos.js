const libros = require("./libros.js")
const usuarios = require("./usuarios.js")


const normalizarDatos = () => {

// Convertir todos los títulos a mayúsculas.
// Eliminar espacios en blanco al inicio y final de los nombres de autores.
// Formatear los emails de los usuarios a minúsculas.

    libros.forEach(libro => {
        libro.titulo = libro.titulo.toUpperCase();
        libro.autor = libro.autor.trim();
    });
    
    usuarios.forEach(usuario => {
        usuario.nombre = usuario.nombre.trim();
        usuario.email = usuario.email.toLowerCase();
    });
    

};

module.exports = {
    normalizarDatos
};