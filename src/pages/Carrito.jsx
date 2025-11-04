import { useEffect, useState } from "react";
import "../css/main.css";
import React from "react";


const Carrito = () => {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
  });

  const [setBoletas] = useState([]);

  // Recalcular total
  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  // Guardar carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    const numerito = document.getElementById("numerito");
    if (numerito)
      numerito.textContent = carrito.reduce(
        (acc, p) => acc + p.cantidad,
        0
      );
  }, [carrito]);

  // === MANEJADORES ===

  const incrementar = (id) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const decrementar = (id) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const eliminarProducto = (id) => {
    const prod = carrito.find((p) => p.id === id);
    if (
      window.confirm(
        `¿Eliminar "${prod.titulo}" del carrito?`
      )
    ) {
      setCarrito((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const vaciarCarrito = () => {
    if (window.confirm("¿Vaciar carrito?")) {
      setCarrito([]);
    }
  };

  const comprar = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    if (!window.confirm("¿Confirmas la compra?")) return;

    const nuevaBoleta = {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total: total,
    };

    const boletasGuardadas =
      JSON.parse(localStorage.getItem("boletasGuardadas")) || [];
    const actualizadas = [...boletasGuardadas, nuevaBoleta];

    localStorage.setItem(
      "boletasGuardadas",
      JSON.stringify(actualizadas)
    );
    setBoletas(actualizadas);
    setCarrito([]);
    alert("¡Compra realizada con éxito!");
  };

  // === RENDERIZADO ===

  if (carrito.length === 0) {
    return (
      <main>
        <h2 className="titulo-principal">Carrito</h2>
        <p id="carrito-vacio">
          Tu carrito está vacío <i className="bi bi-emoji-frown"></i>
        </p>
      </main>
    );
  }

  return (
    <main>
      <h2 className="titulo-principal">Carrito</h2>

      <div className="contenedor-carrito">
        <div id="carrito-productos" className="carrito-productos">
          {carrito.map((producto) => (
            <div key={producto.id} className="carrito-producto">
              <img
                className="carrito-producto-imagen"
                src={producto.imagen}
                alt={producto.titulo}
              />

              <div className="h3-carrito">
                <small>Título</small>
                <h3 className="h3-carrito">{producto.titulo}</h3>
              </div>

              <div className="h3-carrito">
                <small>Cantidad</small>
                <div className="carrito-producto-cantidad-controles">
                  <button
                    onClick={() => decrementar(producto.id)}
                    className="carrito-producto-restar"
                  >
                    -
                  </button>
                  <p>{producto.cantidad}</p>
                  <button
                    onClick={() => incrementar(producto.id)}
                    className="carrito-producto-sumar"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="h3-carrito">
                <small>Precio</small>
                <p>${producto.precio.toLocaleString()}</p>
              </div>

              <div className="h3-carrito">
                <small>Subtotal</small>
                <p>
                  ${(producto.precio * producto.cantidad).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => eliminarProducto(producto.id)}
                className="carrito-producto-eliminar"
                title="Eliminar producto completo"
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          ))}
        </div>

        <div id="carrito-acciones" className="carrito-acciones">
          <div className="carrito-acciones-izquierda">
            <button
              id="carrito-acciones-vaciar"
              className="carrito-acciones-vaciar"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>
          </div>
          <div className="carrito-acciones-derecha">
            <div className="carrito-acciones-total">
              <p>Total:</p>
              <p id="total">${total.toLocaleString()}</p>
            </div>
            <button
              id="carrito-acciones-comprar"
              className="carrito-acciones-comprar"
              onClick={comprar}
            >
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Carrito;
