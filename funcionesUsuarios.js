// Importar el array de libros
const usuarios = require('./usuarios.js');


// Funciones para gestionar usuarios en la biblioteca

// guardar los usuarios en un array
const registrarUsuario = (nombre, email) => {
	const nuevoUsuario = {
		id: usuarios.length + 1,
		nombre: nombre,
		email: email,
		librosPrestados: []
	};

	usuarios.push(nuevoUsuario);
	return nuevoUsuario;
}

// Mostrar todos los usuarios registrados
const mostrarTodosLosUsuarios = () => {
	return usuarios;
}


// Buscar un usuario por email
// Si se encuentra, se devuelve el objeto del usuario.
const buscarUsuario = (email) => {
	for (let i = 0; i < usuarios.length; i++) {
		if (usuarios[i].email === email) {
			return usuarios[i];
		}
	}
	return null;
}

// Borrar un usuario por ID
// Si se encuentra un usuario con el ID, se elimina.
// Si no se encuentra ninguno, se devuelve false.
const borrarUsuario = (id) => {
	const indice = usuarios.findIndex(usuario => usuario.id === id);

	if (indice !== -1) {
		const usuarioEliminado = usuarios[indice];
		usuarios.splice(indice, 1);
		console.log(`Usuario ${usuarioEliminado.nombre} (ID: ${id}) eliminado.`);
		return true;
	} else {
		console.log(`No se encontró un usuario con ID ${id}.`);
		return false;
	}
}

module.exports = {
	registrarUsuario,
	mostrarTodosLosUsuarios,
	buscarUsuario,
	borrarUsuario
};