// =======================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// =======================================

// Variables globales del carrito
let productosEnCarrito = [];

// Referencias a elementos del DOM
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciarCarrito = document.querySelector("#carrito-acciones-vaciar");
const botonComprarAhora = document.querySelector("#carrito-acciones-comprar");
const totalCarrito = document.querySelector("#total");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");


// =======================================
// INICIALIZACIÓN DEL CARRITO
// =======================================

// Inicializa el carrito cargando datos desde localStorage
function inicializarCarrito() {
    const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
    
    if (productosEnCarritoLS) {
        try {
            productosEnCarrito = JSON.parse(productosEnCarritoLS);
        } catch (error) {
            console.error("Error al parsear el carrito desde localStorage:", error);
            productosEnCarrito = [];
        }
    }
}


// =======================================
// FUNCIONES DE RENDERIZADO
// =======================================

// Carga y muestra los productos del carrito
function cargarProductosCarrito() {
    // Limpiar contenedor antes de cargar
    contenedorCarritoProductos.innerHTML = "";

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        // Mostrar carrito con productos
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        // Renderizar cada producto
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="h3-carrito"> 
                    <small>Título</small>
                    <h3 class="h3-carrito">${producto.titulo}</h3>
                </div>
                <div class="h3-carrito">
                    <small>Cantidad</small>
                    <div class="carrito-producto-cantidad-controles">
                        <button id="${producto.id}" class="carrito-producto-restar">-</button>
                        <p>${producto.cantidad}</p>
                        <button id="${producto.id}" class="carrito-producto-sumar">+</button>
                    </div>
                </div>
                <div class="h3-carrito">
                    <small>Precio</small>
                    <p>$${producto.precio.toLocaleString()}</p>
                </div>
                <div class="h3-carrito">
                    <small>Subtotal</small>
                    <p>$${(producto.precio * producto.cantidad).toLocaleString()}</p>
                </div>
                <button id="${producto.id}" class="carrito-producto-eliminar" title="Eliminar producto completo">
                    <i class="bi bi-trash3"></i>
                </button>
            `;
            contenedorCarritoProductos.append(div);
        });

        actualizarBotonesEliminar();
        actualizarBotonesIncrementar();
        actualizarBotonesDecrementar();
        actualizarTotal();
    } else {
        // Mostrar carrito vacío
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

// Actualiza el total del carrito
function actualizarTotal() {
    const total = productosEnCarrito.reduce((acc, producto) => {
        return acc + (producto.precio * producto.cantidad);
    }, 0);
    
    if (totalCarrito) {
        totalCarrito.innerText = `$${total.toLocaleString()}`;
    }
}


// =======================================
// GESTIÓN DE PRODUCTOS EN EL CARRITO
// =======================================

// Actualiza los event listeners de los botones eliminar
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProductoCompleto);
    });
}

// Actualiza los event listeners de los botones sumar cantidad
function actualizarBotonesIncrementar() {
    const botonesSumar = document.querySelectorAll(".carrito-producto-sumar");
    
    botonesSumar.forEach(boton => {
        boton.addEventListener("click", incrementarCantidad);
    });
}

// Actualiza los event listeners de los botones restar cantidad
function actualizarBotonesDecrementar() {
    const botonesRestar = document.querySelectorAll(".carrito-producto-restar");
    
    botonesRestar.forEach(boton => {
        boton.addEventListener("click", decrementarCantidad);
    });
}

// Incrementa la cantidad de un producto en el carrito
function incrementarCantidad(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    if (index !== -1) {
        productosEnCarrito[index].cantidad++;
        actualizarLocalStorage();
        cargarProductosCarrito();
        actualizarNumeritoCarrito();
    }
}

// Decrementa la cantidad de un producto en el carrito          //Luciano explocame porfavor 
function decrementarCantidad(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    if (index !== -1) {
        if (productosEnCarrito[index].cantidad > 1) {
            // Si hay más de 1, solo decrementar
            productosEnCarrito[index].cantidad--;
        } else {
            // Si solo hay 1, preguntar si quiere eliminar el producto
            if (confirm("¿Quieres eliminar este producto del carrito?")) {
                productosEnCarrito.splice(index, 1);
            } else {
                return; // No hacer nada si cancela
            }
        }
        
        actualizarLocalStorage();
        cargarProductosCarrito();
        actualizarNumeritoCarrito();
    }
}

// Elimina completamente un producto del carrito (todas las unidades)
function eliminarProductoCompleto(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    if (index !== -1) {
        const producto = productosEnCarrito[index];
        const mensaje = producto.cantidad > 1 
            ? `¿Estás seguro de que quieres eliminar todas las ${producto.cantidad} unidades de "${producto.titulo}"?`
            : `¿Estás seguro de que quieres eliminar "${producto.titulo}" del carrito?`;
            
        if (confirm(mensaje)) {
            productosEnCarrito.splice(index, 1);
            actualizarLocalStorage();
            cargarProductosCarrito();
            actualizarNumeritoCarrito();
        }
    }
}

// Elimina un producto del carrito (una unidad)
// function eliminarDelCarrito(e) {
//     const idBoton = e.currentTarget.id;
//     const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
//     if (index !== -1) {
//         productosEnCarrito.splice(index, 1);
//         actualizarLocalStorage();
//         cargarProductosCarrito();
        
//         // Actualizar numerito en main.js si existe
//         actualizarNumeritoCarrito();
//     }
// }

// Vacía completamente el carrito
function vaciarCarrito() {
    productosEnCarrito = [];
    actualizarLocalStorage();
    cargarProductosCarrito();
    actualizarNumeritoCarrito();
}

// Simula la compra del carrito
function comprarCarrito() {
    if (productosEnCarrito.length > 0) {
        productosEnCarrito = [];
        actualizarLocalStorage();
        
        // Mostrar mensaje de compra exitosa
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
        
        actualizarNumeritoCarrito();
    }
}


// =======================================
// FUNCIONES DE UTILIDAD
// =======================================

//Actualiza el localStorage con el estado actual del carrito
function actualizarLocalStorage() {
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//Actualiza el numerito del carrito en la página principal
function actualizarNumeritoCarrito() {
    const numerito = document.querySelector("#numerito");
    if (numerito) {
        const nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    }
}


// =======================================
// CONFIGURACIÓN DE EVENTOS
// =======================================

//Configura todos los event listeners del carrito
function configurarEventListeners() {
    // Botón vaciar carrito
    if (botonVaciarCarrito) {
        botonVaciarCarrito.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
                vaciarCarrito();
            }
        });
    }
    
    // Botón comprar
    if (botonComprarAhora) {
        botonComprarAhora.addEventListener("click", () => {
            if (productosEnCarrito.length > 0) {
                if (confirm("¿Confirmas la compra?")) {
                    comprarCarrito();
                }
            } else {
                alert("El carrito está vacío");
            }
        });
    }
}

//Inicializa la página del carrito
function inicializarPaginaCarrito() {
    // Cargar productos desde localStorage
    inicializarCarrito();
    
    // Renderizar productos en el carrito
    cargarProductosCarrito();
    
    // Configurar event listeners
    configurarEventListeners();
}

// =======================================
// EJECUCIÓN INICIAL
// =======================================

// Inicializar la página del carrito cuando se carga
document.addEventListener("DOMContentLoaded", inicializarPaginaCarrito);