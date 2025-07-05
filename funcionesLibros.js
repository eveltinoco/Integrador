// Importar el array de libros
const libros = require('./libros.js');

// Función para agregar un nuevo libro
const agregarLibro = (id, titulo, autor, anio, genero) => {
	const nuevoLibro = {
		id: id,
		titulo: titulo,
		autor: autor,
		anio: anio,
		género: genero,
		disponible: true
	}

	libros.push(nuevoLibro)
	return nuevoLibro
}

// Función para listar todos los libros
const listarTodosLosLibros = () => {
    if (libros.length === 0) {
        console.log("No hay libros registrados en el sistema.");
        return [];
    }
    
    console.log("=== LISTADO DE TODOS LOS LIBROS ===");
    libros.forEach(libro => {
        const estado = libro.disponible ? "Disponible" : "Prestado";
        console.log(`ID: ${libro.id}, Título: ${libro.titulo}, Autor: ${libro.autor}, Año: ${libro.anio}, Género: ${libro.género}, Estado: ${estado}`);
    });
    
    return libros;
}

// Algoritmo de búsqueda lineal
const buscarLibro = (criterio, valor) => {
	for (let i = 0; i < libros.length; i++) {
		if (libros[i][criterio] === valor) {
			return libros[i]
		}
	}
	return null
}

// Algoritmo de ordenamiento burbuja (bubble sort)
const ordenarLibros = (criterio) => {
	for (let i = 0; i < libros.length - 1; i++) {
		for (let j = 0; j < libros.length - i - 1; j++) {
			if (libros[j][criterio] > libros[j + 1][criterio]) {
				[libros[j], libros[j + 1]] = [libros[j + 1], libros[j]]
			}
		}
	}

	console.log(`Libros ordenados por ${criterio}:`)
	libros.forEach((libro) => {
		console.log(`${libro.título} - ${libro.autor} (${libro.anio})`)
	})
	return libros
}

// Función para borrar un libro por su ID
const borrarLibro = (id) => {
	const indice = libros.findIndex(libro => libro.id === id)
	if (indice !== -1) {
		libros.splice(indice, 1)
		console.log(`Libro con ID ${id} eliminado.`)
		return true
	} else {
		console.log(`No se encontró un libro con ID ${id}.`)
		return false
	}
}

// Función para buscar libros que contienen una palabra específica en el título
// Recorre el array de libros, busca la palabra en el título y devuelve los libros que la contienen.
// Si no hay coincidencias, devuelve un array vacío.
const librosConPalabrasEnTitulo = (palabra) => {
    let librosEncontrados = []

    // recorro el array de libros
    libros.forEach(libro => {
        // convierto a minúsculas para una búsqueda no sensible a mayúsculas/minúsculas
        const tituloLower = libro.titulo.toLowerCase()
        const palabraLower = palabra.toLowerCase()
        
        // busco si el título contiene la palabra
        if (tituloLower.includes(palabraLower)) {
            librosEncontrados.push(libro)
        }
    })

    return librosEncontrados
}

// Exportar todas las funciones relacionadas con libros
module.exports = {
    agregarLibro,
    buscarLibro,
    ordenarLibros,
    borrarLibro,
    librosConPalabrasEnTitulo,
    listarTodosLosLibros
};
