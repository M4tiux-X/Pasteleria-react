import { useState, useEffect } from "react";

const API_PEDIDOS = "http://localhost:8083/api/pedido"; 
// Ajusta el puerto si tu microservicio usa otro. 
// Verifícalo en application.properties → server.port

export const usePedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener todos los pedidos
    const getPedidos = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_PEDIDOS);
            if (!response.ok) throw new Error("Error al obtener los pedidos");

            const data = await response.json();
            setPedidos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Crear un nuevo pedido
    const createPedido = async (pedidoData) => {
        try {
            setLoading(true);
            const response = await fetch(API_PEDIDOS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pedidoData),
            });

            if (!response.ok) throw new Error("Error al crear el pedido");

            await getPedidos();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Obtener pedido por ID
    const getPedidoById = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_PEDIDOS}/${id}`);
            if (!response.ok) throw new Error("Pedido no encontrado");

            return await response.json();
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar un pedido
    const updatePedido = async (id, pedidoData) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_PEDIDOS}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pedidoData),
            });

            if (!response.ok) throw new Error("Error al actualizar el pedido");

            await getPedidos();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Eliminar un pedido
    const deletePedido = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_PEDIDOS}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar el pedido");

            await getPedidos();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Cargar al inicio
    useEffect(() => {
        getPedidos();
    }, []);

    return {
        pedidos,
        loading,
        error,
        getPedidos,
        createPedido,
        getPedidoById,
        updatePedido,
        deletePedido,
    };
};
