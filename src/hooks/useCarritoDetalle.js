// src/hooks/useCarritoDetalle.js

import useApi from ".hooks/useApi";
const URL = "http://localhost:8087/api/carrito_detalle";

export default function useCarritoDetalle() {
    const api = useApi(URL);
    return {
        ...api,
        obtenerDetallePorCarrito: (idCarrito) => api.get(`/carrito/${idCarrito}`),
        agregarProducto: (body) => api.post("/", body),
        actualizarCantidad: (id, body) => api.put(`/${id}`, body),
        eliminarDetalle: (id) => api.remove(`/${id}`)
    };
}
