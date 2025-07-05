// Importar todos los módulos y funciones
const readline = require('readline');
const {
	agregarLibro,
	buscarLibro,
	ordenarLibros,
	borrarLibro,
	librosConPalabrasEnTitulo,
	listarTodosLosLibros
} = require("./funcionesLibros.js")
const {
	registrarUsuario,
	mostrarTodosLosUsuarios,
	buscarUsuario,
	borrarUsuario
} = require("./funcionesUsuarios.js")
const {
	prestarLibro,
	devolverLibro,
	generarReporteLibros
} = require("./funcionesPrestamos.js")
const { calcularEstadisticas } = require("./funcionesEstadisticas.js")


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para hacer preguntas y obtener respuestas del usuario
const pregunta = (texto) => {
    return new Promise((resolve) => {
        rl.question(texto, (respuesta) => {
            resolve(respuesta);
        });
    });
};

const menuPrincipal = async () => {
    let continuar = true;

    while (continuar) {
        console.clear();
        console.log("===========================================");
        console.log("  SISTEMA DE GESTIÓN DE BIBLIOTECA");
        console.log("===========================================");
        console.log("1. Agregar Libro");
        console.log("2. Registrar Usuario");
        console.log("3. Prestar Libro");
        console.log("4. Devolver Libro");
        console.log("5. Generar Reporte de Libros");
        console.log("6. Buscar Libro");
        console.log("7. Buscar Usuario");
        console.log("8. Borrar Libro");
        console.log("9. Borrar Usuario");
        console.log("10. Ordenar Libros");
        console.log("11. Mostrar Todos los Usuarios");
        console.log("12. Libros con Palabras en Título");
        console.log("13. Calcular Estadísticas");
        console.log("14. Listar Todos los Libros");
        console.log("15. Salir");
        console.log("===========================================");

        const opcion = await pregunta("Ingrese el número de la opción deseada: ");

		switch (opcion) {
			case "1": // Agregar Libro
				console.clear();
				console.log("=== AGREGAR NUEVO LIBRO ===");
				const id = parseInt(await pregunta("Ingrese el ID del libro: "));
				const titulo = await pregunta("Ingrese el título del libro: ");
				const autor = await pregunta("Ingrese el autor del libro: ");
				const anio = parseInt(await pregunta("Ingrese el año de publicación: "));
				const genero = await pregunta("Ingrese el género del libro: ");

				const nuevoLibro = agregarLibro(id, titulo, autor, anio, genero);
				console.log("Libro agregado exitosamente:", nuevoLibro);
				await pregunta("Presione Enter para continuar...");
				break;

			case "2": // Registrar Usuario
				console.clear();
				console.log("=== REGISTRAR NUEVO USUARIO ===");
				const nombre = await pregunta("Ingrese el nombre del usuario: ");
				const email = await pregunta("Ingrese el email del usuario: ");

				const nuevoUsuario = registrarUsuario(nombre, email);
				console.log("Usuario registrado exitosamente:", nuevoUsuario);
				await pregunta("Presione Enter para continuar...");
				break;

			case "3": // Prestar Libro
				console.clear();
				console.log("=== PRESTAR LIBRO ===");
				const idLibroPrestamo = parseInt(
					await pregunta("Ingrese el ID del libro a prestar: ")
				);
				const idUsuarioPrestamo = parseInt(
					await pregunta("Ingrese el ID del usuario: ")
				);

				prestarLibro(idLibroPrestamo, idUsuarioPrestamo);
				await pregunta("Presione Enter para continuar...");
				break;

			case "4": // Devolver Libro
				console.clear();
				console.log("=== DEVOLVER LIBRO ===");
				const idLibroDevolucion = parseInt(
					await pregunta("Ingrese el ID del libro a devolver: ")
				);
				const idUsuarioDevolucion = parseInt(
					await pregunta("Ingrese el ID del usuario: ")
				);

				devolverLibro(idLibroDevolucion, idUsuarioDevolucion);
				await pregunta("Presione Enter para continuar...");
				break;

			case "5": // Generar Reporte de Libros
				console.clear();
				console.log("=== REPORTE DE LIBROS ===");
				generarReporteLibros();
				await pregunta("Presione Enter para continuar...");
				break;

			case "6": // Buscar Libro
				console.clear();
				console.log("=== BUSCAR LIBRO ===");
				console.log(
					"Criterios de búsqueda disponibles: id, titulo, autor, anio, género"
				);
				const criterioBusqueda = await pregunta("Ingrese el criterio de búsqueda: ");
				const valorBusqueda = await pregunta("Ingrese el valor a buscar: ");

				const libroEncontrado = buscarLibro(criterioBusqueda, valorBusqueda);
				if (libroEncontrado) {
					console.log("Libro encontrado:", libroEncontrado);
				} else {
					console.log("No se encontró ningún libro con ese criterio.");
				}
				await pregunta("Presione Enter para continuar...");
				break;

			case "7": // Buscar Usuario
				console.clear();
				console.log("=== BUSCAR USUARIO ===");
				const emailBusqueda = await pregunta("Ingrese el email del usuario a buscar: ");

				const usuarioEncontrado = buscarUsuario(emailBusqueda);
				if (usuarioEncontrado) {
					console.log("Usuario encontrado:", usuarioEncontrado);
				} else {
					console.log("No se encontró ningún usuario con ese email.");
				}
				await pregunta("Presione Enter para continuar...");
				break;

			case "8": // Borrar Libro
				console.clear();
				console.log("=== BORRAR LIBRO ===");
				const idLibroBorrar = parseInt(
					await pregunta("Ingrese el ID del libro a borrar: ")
				);

				borrarLibro(idLibroBorrar);
				await pregunta("Presione Enter para continuar...");
				break;

			case "9": // Borrar Usuario
				console.clear();
				console.log("=== BORRAR USUARIO ===");
				const idUsuarioBorrar = parseInt(
					await pregunta("Ingrese el ID del usuario a borrar: ")
				);

				borrarUsuario(idUsuarioBorrar);
				await pregunta("Presione Enter para continuar...");
				break;

			case "10": // Ordenar Libros
				console.clear();
				console.log("=== ORDENAR LIBROS ===");
				console.log(
					"Criterios de ordenamiento disponibles: titulo, autor, anio, género"
				);
				const criterioOrdenamiento = await pregunta(
					"Ingrese el criterio para ordenar: "
				);

				ordenarLibros(criterioOrdenamiento);
				await pregunta("Presione Enter para continuar...");
				break;

			case "11": // Mostrar Todos los Usuarios
				console.clear();
				console.log("=== TODOS LOS USUARIOS ===");
				const todosLosUsuarios = mostrarTodosLosUsuarios();
				if (todosLosUsuarios.length > 0) {
					console.log("Lista de usuarios registrados:");
					todosLosUsuarios.forEach(usuario => {
						console.log(`ID: ${usuario.id}, Nombre: ${usuario.nombre}, Email: ${usuario.email}, Libros prestados: ${usuario.librosPrestados.length}`);
					});
				} else {
					console.log("No hay usuarios registrados en el sistema.");
				}
				await pregunta("Presione Enter para continuar...");
				break;

			case "12": // Libros con Palabras en Título
				console.clear();
				console.log("=== LIBROS CON PALABRAS EN TÍTULO ===");
				const palabra = await pregunta("Ingrese la palabra a buscar en los títulos: ");

				const librosEncontrados = librosConPalabrasEnTitulo(palabra)
				if (librosEncontrados && librosEncontrados.length > 0) {
					console.log(
						`Se encontraron ${librosEncontrados.length} libros con la palabra "${palabra}" en el título.`
					)
					librosEncontrados.forEach((libro) => {
						console.log(`- ${libro.titulo} (${libro.autor})`)
					})
				} else {
					console.log(
						`No se encontraron libros con la palabra "${palabra}" en el título.`
					);
				}
				await pregunta("Presione Enter para continuar...");
				break;

			case "13": // Calcular Estadísticas
				console.clear();
				console.log("=== ESTADÍSTICAS DEL SISTEMA ===");
				calcularEstadisticas();
				await pregunta("Presione Enter para continuar...");
				break;
				
			case "14": // Listar Todos los Libros
				console.clear();
				listarTodosLosLibros();
				await pregunta("Presione Enter para continuar...");
				break;

			case "15": // Salir
				console.log(
					"Gracias por usar el Sistema de Gestión de Biblioteca. ¡Hasta pronto!"
				);
				continuar = false;
				rl.close(); // Cerrar la interfaz de readline al salir
				break;

			default:
				console.log("Opción inválida. Por favor, intente nuevamente.");
				await pregunta("Presione Enter para continuar...");
		}
	}
};

// Ejecutar el menú principal
menuPrincipal().catch(error => {
    console.error("Error en el menú principal:", error);
    process.exit(1);
});
