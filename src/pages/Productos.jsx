import '../css/main.css';
import { useEffect, useState } from "react";
import { productos as catalogo } from '../data/Productos';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
  });

  // Cargar catálogo al montar
  useEffect(() => {
    setProductos(catalogo);
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));

    // Actualizar el numerito del carrito en el Navbar
    const numerito = document.getElementById("numerito");
    if (numerito) {
      const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
      numerito.textContent = total;
    }

  }, [carrito]);

  // === MANEJO DE BOTONES DE CATEGORÍA (Navbar) ===
  useEffect(() => {
    const botones = document.querySelectorAll(".boton-categoria");

    const manejarClick = (e) => {
      const categoriaId = e.currentTarget.id;
      setCategoriaSeleccionada(categoriaId);

      // Actualizar título
      const titulo = document.getElementById("titulo-principal");
      if (titulo) {
        if (categoriaId === "todos") {
          titulo.innerText = "Todos los Productos";
        } else {
          // Buscar nombre de categoría legible
          const prodCat = catalogo.find(p => 
            p.menu.we.toLowerCase().includes(categoriaId.toLowerCase())
          );
          titulo.innerText = prodCat ? prodCat.menu.we : "Categoría";
        }
      }

      // Marcar botón activo
      botones.forEach(btn => btn.classList.remove("active"));
      e.currentTarget.classList.add("active");
    };

    botones.forEach(btn => btn.addEventListener("click", manejarClick));
    return () => botones.forEach(btn => btn.removeEventListener("click", manejarClick));
  }, []);

  // === AGREGAR PRODUCTO AL CARRITO ===
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      const actualizado = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // === FILTRAR PRODUCTOS ===
  const productosFiltrados =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(p =>
          p.menu.we.toLowerCase().includes(categoriaSeleccionada.toLowerCase())
        );

  return (
    <main>
      <h2 id="titulo-principal" className="titulo-principal">
        Todos los Productos
      </h2>

      <div id="contenedor-productos" className="contenedor-productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <div key={producto.id} className="producto-detalle">
              <img
                src={producto.imagen}
                alt={producto.titulo}
                className="producto-imagen"
              />
              <h3 className="producto-titulo">{producto.titulo}</h3>
              <p>{producto.categoria.nombre}</p>
              <p>${producto.precio.toLocaleString()}</p>
              <button
                className="producto-agregar"
                onClick={() => agregarAlCarrito(producto)}
              >
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </main>
  );
};

export default Productos;
