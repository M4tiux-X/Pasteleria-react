// =======================================
// CONFIGURACIÓN Y DATOS DE LA APLICACIÓN
// =======================================

// Catálogo de productos de la pastelería
const productos = [
    // Tortas cuadradas
    {
        id: "TC001",
        titulo: "Torta Cuadrada de Chocolate",
        imagen: "./img/Tortas_Cuadradas/Torta_cuadrada_chocolate.jpg",
        categoria: {
            nombre: "Tortas Cuadradas",
            id: "Tortas cuadradas"
        },
        menu: {
            we: "torta",
            nom: "Torta"
        },
        precio: 45000,
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."
    },
    {
        id: "TC002",
        titulo: "Torta Cuadrada de Frutas",
        imagen: "./img/Tortas_Cuadradas/Torta_cuadrada_frutas.jpg",
        categoria: {
            nombre: "Tortas Cuadradas",
            id: "Tortas Cuadradas"
        },
        menu: {
            we: "torta",
            nom: "Torta"
        },
        precio: 50000,
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones."
    },
    // Tortas circulares
    {
        id: "TT001",
        titulo: "Torta Circular de Vainilla",
        imagen: "./img/Tortas_circulares/Torta_circular_vainilla.jpg",
        categoria: {
            nombre: "Tortas Circulares",
            id: "Tortas Circulares"
        },
        menu: {
            we: "torta",
            nom: "Torta"
        },
        precio: 40000,
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión."

    },
    {
        id: "TT002",
        titulo: "Torta Circular de Manjar",
        imagen: "./img/Tortas_circulares/Torta_circular_manjar.png",
        categoria: {
            nombre: "Tortas Circulares",
            id: "Tortas Circulares"
        },
        menu: {
            we: "torta",
            nom: "Torta"
        },
        precio: 42000,
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos."
    },
    // Postres individuales
    {
        id: "PI001",
        titulo: "Mousse de Chocolate",
        imagen: "./img/Postres_individuales/Mousse_de_chocolate_individual.jpg",
        categoria: {
            nombre: "Postres Individuales",
            id: "Postres Individuales"
        },
        menu: {
            we: "individuales",
            nom: "Individuales"
        },
        precio: 5000,
        descripcion:"Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate"
    },
    {
        id: "PI002",
        titulo: "Tiramisú Clásico",
        imagen: "./img/Postres_individuales/Tiramisu_de_chocolate_individual.jpg",
        categoria: {
            nombre: "Postres Individuales",
            id: "Postres Individuales"
        },
        menu: {
            we: "individuales",
            nom: "Individuales"
        },
        precio: 5000,
        descripcion:"Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida."
    },
    // Productos sin azúcar
    {
        id: "PSA001",
        titulo: "Torta Sin Azúcar de Naranja",
        imagen: "./img/Sin_azucar/Torta_naranza_sin_azucar.jpg",
        categoria: {
            nombre: "Productos Sin Azúcar",
            id: "Productos Sin Azúcar"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 48000,
        descripcion:"Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables."
    },
    {
        id: "PSA002",
        titulo: "Cheesecake Sin Azúcar",
        imagen: "./img/Sin_azucar/Cheesecake_sin_azucar.jpg",
        categoria: {
            nombre: "Productos Sin Azúcar",
            id: "Productos Sin Azúcar"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 47000,
        descripcion:"Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa"
    },
    // Pastelería tradicional
    {
        id: "PT001",
        titulo: "Empanada de Manzana",
        imagen: "./img/Pasteleria_tradicional/Empanada_de_manzana.jpg",
        categoria: {
            nombre: "Pastelería Tradicional",
            id: "Pastelería Tradicional"
        },
        menu: {
            we: "especiales",
            nom: "Especiales"
        },
        precio: 3000,
        descripcion:"Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda."
    },
    {
        id: "PT002",
        titulo: "Tarta de Santiago",
        imagen: "./img/Pasteleria_tradicional/Tarta_de_Santiago.jpg",
        categoria: {
            nombre: "Pastelería Tradicional",
            id: "Pastelería Tradicional"
        },
        menu: {
            we: "especiales",
            nom: "Especiales"
        },
        precio: 6000,
        descripcion:"Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos"
    },
    // Productos sin gluten
    {
        id: "PG001",
        titulo: "Brownie Sin Gluten",
        imagen: "./img/Sin_gluten/Brownie_sin_gluten.jpg",
        categoria: {
            nombre: "Productos Sin Gluten",
            id: "Productos Sin Gluten"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 4000,
        descripcion:"Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor"
    },
    {
        id: "PG002",
        titulo: "Pan Sin Gluten",
        imagen: "./img/Sin_gluten/Pan_sin_gluten.jpg",
        categoria: {
            nombre: "Productos Sin Gluten",
            id: "Productos Sin Gluten"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 3500,
        descripcion:"Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida."
    },
    // Productos veganos
    {
        id: "PV001",
        titulo: "Torta Vegana de Chocolate",
        imagen: "./img/Tortas_veganas/Torta_chocolate_vegano1.jpg",
        categoria: {
            nombre: "Productos Veganos",
            id: "Productos Veganos"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 50000,
        descripcion:"Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos."
    },
    {
        id: "PV002",
        titulo: "Galletas Veganas de Avena",
        imagen: "./img/Tortas_veganas/galletas_avena_veganas.jpg",
        categoria: {
            nombre: "Productos Veganos",
            id: "Productos Veganos"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 4500,
        descripcion:"Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano."
    },
    // Tortas especiales
    {
        id: "TE001",
        titulo: "Torta Especial de Cumpleaños",
        imagen: "./img/Tortas_especiales/Torta_cumpleaños.jpg",
        categoria: {
            nombre: "Tortas Especiales",
            id: "Tortas Especiales"
        },
        menu: {
            we: "especiales",
            nom: "Especiales"
        },
        precio: 55000,
        descripcion:"Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos"
    },
    {
        id: "TE002",
        titulo: "Torta Especial de Boda",
        imagen: "./img/Tortas_especiales/Torta_boda.jpg",
        categoria: {
            nombre: "Tortas Especiales",
            id: "Tortas Especiales"
        },
        menu: {
            we: "especiales",
            nom: "Especiales"
        },
        precio: 60000,
        descripcion:"Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda."
    }
];

// Referencias a elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesMenu = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numeritoElemento = document.querySelector("#numerito");
let botonesAgregar = document.querySelectorAll(".producto-agregar");

// =======================================
// FUNCIONES DE UTILIDAD Y RENDERIZADO
// =======================================

function cargarProductos(productosElegidos) {
    // Limpiar el contenedor antes de cargar nuevos productos
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalle">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

/**
 * Actualiza los event listeners de los botones "Agregar"
 */
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

/**
 * Actualiza el número mostrado en el icono del carrito
 */
function actualizarNumerito() {

    if (numeritoElemento) {
        const nuevoNumerito = productosEnCarrito.reduce((acc, p) => acc + p.cantidad, 0); 
        numeritoElemento.innerText = nuevoNumerito;
    }
}
// =======================================
// GESTIÓN DEL CARRITO DE COMPRAS
// =======================================

// Variables globales del carrito
let productosEnCarrito;

/**
 * Inicializa el carrito desde localStorage o crea uno vacío
 */
function inicializarCarrito() {
    let productosEnCarritoLocalStorage = localStorage.getItem("productos-en-carrito");
    
    if (productosEnCarritoLocalStorage) {
        productosEnCarrito = JSON.parse(productosEnCarritoLocalStorage);
        actualizarNumerito();
    } else {
        productosEnCarrito = [];
    }
    
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        // Si el producto ya está en el carrito, incrementar cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        // Si es un producto nuevo, agregarlo con cantidad 1
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarNumerito();
    
    // Guardar en localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// =======================================
// CONFIGURACIÓN DE EVENTOS Y INICIALIZACIÓN
// =======================================

/**
 * Configura los event listeners para los botones del menú
 */
function configurarEventListeners() {
    botonesMenu.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // Remover clase active de todos los botones
            botonesMenu.forEach(boton => boton.classList.remove("active"));
            // Agregar clase active al botón clickeado
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id !== "todos") {
                // Filtrar productos por categoría
                const productoMenu = productos.find(producto => producto.menu.we === e.currentTarget.id);
                tituloPrincipal.innerText = productoMenu.menu.nom;

                const productosBoton = productos.filter(producto => producto.menu.we === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                // Mostrar todos los productos
                tituloPrincipal.innerText = "Todos Los Productos";
                cargarProductos(productos);
            }
        });
    });
}

/**
 * Inicializa la aplicación
 */
function inicializarApp() {
    // Inicializar carrito desde localStorage
    inicializarCarrito();
    
    // Cargar todos los productos al inicio
    cargarProductos(productos);
    
    // Configurar event listeners
    configurarEventListeners();
}

// =======================================
// EJECUCIÓN INICIAL
// =======================================

// Inicializar la aplicación cuando se carga la página
inicializarApp();

