import React, { useState, useEffect } from "react";
import "../css/main.css";
import { useNavigate } from "react-router-dom";
import useBoletas from "../hooks/useBoleta";

function Boleta() {
    const [boletas, setBoletas] = useState([]);
    const navigate = useNavigate();

    // Importar funciones del microservicio
    const { obtenerBoletas, eliminarBoleta } = useBoletas();

    // Cargar boletas desde el microservicio
    useEffect(() => {
        cargarBoletas();
    }, []);

    /**
     * Llama a la API para obtener las boletas
     */
    const cargarBoletas = async () => {
        try {
            const response = await obtenerBoletas();
            setBoletas(response.data);
        } catch (error) {
            console.error("Error al obtener boletas:", error);
        }
    };

    /**
     * Elimina una boleta llamando al microservicio
     */
    const borrarBoleta = async (id) => {
        const confirmar = window.confirm(`¿Eliminar la boleta #${id}?`);

        if (confirmar) {
            try {
                await eliminarBoleta(id);
                // Volvemos a cargar la lista desde el backend
                cargarBoletas();
            } catch (error) {
                console.error("Error al eliminar boleta:", error);
            }
        }
    };

    /**
     * Borra todas las boletas: solo funciona si tu API tiene endpoint DELETE ALL
     */
    const borrarTodasBoletas = async () => {
        const confirmar = window.confirm("¿Seguro que deseas borrar todas las boletas?");

        if (confirmar) {
            try {
                // Si tu backend NO tiene deleteAll, debo crear un loop
                for (let boleta of boletas) {
                    await eliminarBoleta(boleta.id);
                }
                cargarBoletas();
            } catch (error) {
                console.error("Error al borrar todas las boletas:", error);
            }
        }
    };

    return (
        <main>
            <div className="contenedor-titulo">
                <h2 className="titulo-principal">Historial de Boletas</h2>

                <div className="admin-opciones">
                    <button 
                        className="boton-admin" 
                        onClick={() => navigate("/admin")}
                    >
                        Volver
                    </button>
                </div>

                {boletas.length > 0 && (
                    <button 
                        className="boleta-borrar-todas"
                        onClick={borrarTodasBoletas}
                    >
                        Borrar todas
                    </button>
                )}
            </div>

            <section id='boletas-container' className="contenedor-boletas">
                {boletas.length === 0 ? (
                    <p>No hay boletas registradas.</p>
                ) : (
                    boletas.map((boleta) => (
                        <div 
                            key={boleta.id}
                            className="boleta-container"
                        >
                            <div className="boleta-header">
                                <h3>Boleta #{boleta.id}</h3>
                                <button
                                    className="boleta-acciones-borrar"
                                    onClick={() => borrarBoleta(boleta.id)}
                                >
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
                                <tbody>
                                    {boleta.productos.map((producto, idx) => (
                                        <tr key={idx}>
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
