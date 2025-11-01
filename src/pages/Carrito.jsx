import { useEffect } from "react";

const Carrito=()=> {
  useEffect(() =>{
    if (!document.querySelector("script[src='/js/carrito.js']")) {
    const sc = document.createElement("script")
    sc.src = "/js/carrito.js"
    sc.async = true
    document.body.appendChild(sc)
    console.log("script cargado...")

    sc.onload = () =>{
        if(window.inicializarPaginaCarrito()){
            window.inicializarPaginaCarrito()
        }
        
    }
} else {
    console.log("script No Cargado")
}
  })

  return (
    <main>
      <h2 className="titulo-principal">Carrito</h2>
      <div className="contenedor-carrito">
        
        {/* 🛑 EL CARRITO DEBE SER VACÍO PARA QUE 'carrito.js' LO LLENE */}
        {/* Estos ID's son cruciales, deben coincidir con los selectores en 'carrito.js' */}

        <p id="carrito-vacio" className="carrito-vacio-hidden">
          Tu carrito está vacío <i className="bi bi-emoji-frown"></i>
        </p>
        
        <div id="carrito-productos" className="carrito-productos">
            {/* Aquí es donde 'carrito.js' insertará los productos */}
        </div>

        <div id="carrito-acciones" className="carrito-acciones carrito-acciones-hidden">
          <div className="carrito-acciones-izquierda">
            <button id="carrito-acciones-vaciar" className="carrito-acciones-vaciar">
              Vaciar carrito
            </button>
          </div>
          <div className="carrito-acciones-derecha">
            <div className="carrito-acciones-total">
              <p>Total:</p>
              <p id="total">$0.00</p>
            </div>
            <button id="carrito-acciones-comprar" className="carrito-acciones-comprar">
              Comprar ahora
            </button>
          </div>
        </div>

        <p id="carrito-comprado" className="carrito-comprado-hidden">
          ¡Muchas gracias por tu compra! <i className="bi bi-emoji-kiss"></i>
        </p>

      </div>
    </main>
  );
}
export default Carrito;

