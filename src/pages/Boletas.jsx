
import { useState, useEffect } from "react";

function Boleta() {
    const [boletas, setBoletas] = useState([]);

    // Cargar boletas desde localStorage al montar el componente
    useEffect(() => {
        cargarBoletas();
    }, []);

    /**
     * Carga las boletas desde localStorage
     */
    const cargarBoletas = () => {
        const boletasGuardadas = JSON.parse(localStorage.getItem("boletasGuardadas")) || [];
        setBoletas(boletasGuardadas);
    };

    /**
     * Elimina una boleta específica según su índice
     */
    const eliminarBoleta = (index) => {
        const confirmar = window.confirm(`¿Eliminar la Boleta #${boletas[index].id}?`);

        if (confirmar) {
            const nuevasBoletas = [...boletas];
            nuevasBoletas.splice(index, 1);
            localStorage.setItem("boletasGuardadas", JSON.stringify(nuevasBoletas));
            setBoletas(nuevasBoletas);
        }
    };

    /**
     * Borra todas las boletas del almacenamiento
     */
    const borrarTodasBoletas = () => {
        const confirmar = window.confirm("¿Seguro que deseas borrar todas las boletas?");
        
        if (confirmar) {
            localStorage.removeItem("boletasGuardadas");
            setBoletas([]);
        }
    };

    return (
        <main>
            <div className="contenedor-titulo">
                <h2 className="titulo-principal">Historial de Boletas</h2>
                {boletas.length > 0 && (
                    <button 
                        className="boleta-borrar-todas" 
                        onClick={borrarTodasBoletas}>
                        Borrar todas
                    </button>
                )}
            </div>

            <section className="contenedor-boletas">
                {boletas.length === 0 ? (
                    <p>No hay boletas registradas.</p>
                ) : (
                    boletas.map((boleta, index) => (
                        <div 
                            key={`boleta-${boleta.id}-${index}`} 
                            className="boleta-container">
                            <div className="boleta-header">
                                <h3>Boleta #{boleta.id}</h3>
                                <button
                                    className="boleta-acciones-borrar"
                                    onClick={() => eliminarBoleta(index)}>
                                    Eliminar
                                </button>
                            </div>
                            <p className="boletas_letras">
                                <strong>Fecha:</strong> {boleta.fecha}
                            </p>

                            <table className="boleta-tabla">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="body-boleta">
                                    {boleta.productos.map((producto, idx) => (
                                        <tr key={`producto-${idx}`}>
                                            <td>{producto.titulo}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>${producto.precio.toLocaleString()}</td>
                                            <td>${(producto.precio * producto.cantidad).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="boleta-total">
                                <strong>Total:</strong> ${boleta.total.toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}

export default Boleta;
