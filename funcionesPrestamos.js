const libros = require("./libros.js")
const usuarios = require("./usuarios.js")

// Función para prestar un libro a un usuario
// Verifica si el libro y el usuario existen, si el libro está disponible,
// y actualiza el estado del libro y del usuario.
// Devuelve true si el préstamo fue exitoso, false en caso contrario.
prestarLibro = (idLibro, idUsuario) => {
	const libro = libros.find((libro) => libro.id === idLibro)
	const usuario = usuarios.find((usuario) => usuario.id === idUsuario)

	if (!libro) {
		console.log(`Libro con ID ${idLibro} no encontrado.`)
		return false
	}

	if (!usuario) {
		console.log(`Usuario con ID ${idUsuario} no encontrado.`)
		return false
	}

	if (!libro.disponible) {
		console.log(`El libro "${libro.título}" no está disponible para préstamo.`)
		return false
	}

	libro.disponible = false
	usuario.librosPrestados.push(libro.id)
	console.log(`Libro "${libro.título}" prestado a ${usuario.nombre}.`)
	return true
}

// Función para devolver un libro prestado por un usuario
// Verifica si el libro y el usuario existen, si el usuario tiene el libro prestado
// y actualiza el estado del libro y del usuario.
// Devuelve true si la devolución fue exitosa, false en caso contrario.

const devolverLibro = (idLibro, idUsuario) => {
	const libro = libros.find((libro) => libro.id === idLibro)
	const usuario = usuarios.find((usuario) => usuario.id === idUsuario)

	if (!libro) {
		console.log(`Libro con ID ${idLibro} no encontrado.`)
		return false
	}

	if (!usuario) {
		console.log(`Usuario con ID ${idUsuario} no encontrado.`)
		return false
	}

	const index = usuario.librosPrestados.indexOf(libro.id)
	if (index === -1) {
		console.log(
			`${usuario.nombre} no tiene prestado el libro "${libro.título}".`
		)
		return false
	}

	libro.disponible = true
	usuario.librosPrestados.splice(index, 1)
	console.log(`Libro "${libro.título}" devuelto por ${usuario.nombre}.`)
	return true
}

// Función para generar un reporte de los libros
// Muestra el total de libros, los libros prestados, los libros por género,
// el libro más antiguo y el libro más reciente.
// Imprime el reporte en la consola.
const generarReporteLibros = () => {
	console.log("Reporte de Libros:")
	console.log(`Total de libros: ${libros.length}`)
	console.log("libros prestados:")
	const librosPrestados = libros.filter((libro) => !libro.disponible)
	librosPrestados.forEach((libro) => {
		const estado = libro.disponible ? "Disponible" : "No Disponible"
		console.log(
			`ID: ${libro.id}, Título: ${libro.título}, Autor: ${libro.autor}, Año: ${libro.anio}, Género: ${libro.género}, Estado: ${estado}`
		)
	})

    console.log("Libros por género:")
    const generos = [...new Set(libros.map(libro => libro.género))]
    generos.forEach((genero) => {
        const librosPorGenero = libros.filter(libro => libro.género === genero);
        console.log(`Género: ${genero}, Total: ${librosPorGenero.length} libros`);
    });

    console.log("Libro más antiguo:")

    const libroMasAntiguo = libros.reduce((antiguo, actual) => {
        return (antiguo.anio < actual.anio) ? antiguo : actual;
    }, libros[0]);

    console.log(`Título: ${libroMasAntiguo.título}, Autor: ${libroMasAntiguo.autor}, Año: ${libroMasAntiguo.anio}`);

    console.log("Libro más reciente:")

    const libroMasReciente = libros.reduce((reciente, actual) => {
        return (reciente.anio > actual.anio) ? reciente : actual;
    }, libros[0]);
    console.log(`Título: ${libroMasReciente.título}, Autor: ${libroMasReciente.autor}, Año: ${libroMasReciente.anio}`);

}

module.exports = {
    prestarLibro,
    devolverLibro,
    generarReporteLibros
}
