const libros = require("./libros.js")

// Funciones para calcular estadísticas de los libros
// Estas funciones calculan el promedio de años de publicación, el año más frecuente de publicación,
// y la diferencia entre el año del libro más antiguo y el más reciente.
// También se incluye una función para calcular todas las estadísticas y mostrarlas en la consola.
const obtenerPromedioAnioPublic = () => {
	const promedioAnios = libros.reduce((promedio, libro) => {
		return promedio + libro.anio
	}, 0)

	return promedioAnios / libros.length
}

// Función para obtener el año de publicación más frecuente
// Recorre el array de libros, cuenta cuántas veces aparece cada año,
// y devuelve el año que más veces aparece.
// Si no hay libros, devuelve 0.
const obtenerAnioPubliFrec = () => {
	let contAnioMasFrec = 0
	let anioMasFrec = 0

	// itero cada libro
	libros.forEach((libro) => {
		const fechaPub = libro.anio
		// busco la cantidad de veces que aparece el año en los libros
		const cantidadPorAnio = libros.filter(
			(libroFind) => libroFind.anio === fechaPub
		)
		if (cantidadPorAnio.length > contAnioMasFrec) {
			contAnioMasFrec = cantidadPorAnio.length
			anioMasFrec = cantidadPorAnio[0].anio
		}
	})

	return anioMasFrec
}

// Función para calcular la diferencia entre el año del libro más antiguo y el más reciente
// Recorre el array de libros, encuentra el año más antiguo y el más reciente,
// y devuelve la diferencia.
// Si no hay libros, devuelve 0.
const diferenciaAniosEntreLibroNuevoViejo = () => {
    let anioLibroViejo = libros[0].anio
    let anioLibroNuevo = libros[0].anio

    libros.forEach(libro => {
        if(libro.anio < anioLibroViejo){
            anioLibroViejo = libro.anio
        }
        if(libro.anio > anioLibroNuevo){
            anioLibroNuevo = libro.anio
        }
    })

    return anioLibroNuevo - anioLibroViejo

}

const calcularEstadisticas = () => {
	console.log("Promedio año de publicación: " + obtenerPromedioAnioPublic() + " años")
	console.log("Año de publicación más frecuente: " + obtenerAnioPubliFrec() + " años")
	console.log("Diferencia entre el año más antiguo y el más reciente: " + diferenciaAniosEntreLibroNuevoViejo() + " años")
}

module.exports = {
	calcularEstadisticas
}
