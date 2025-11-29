// src/hooks/useProductos.js

import useApi from ".hooks/useApi";
const URL = "http://localhost:8080/api/productos";

export default function useProductos() {
    const api = useApi(URL);
    return {
        ...api,
        obtenerProductos: () => api.get("/"),
        obtenerProducto: (id) => api.get(`/${id}`),
        crearProducto: (body) => api.post("/", body),
        actualizarProducto: (id, body) => api.put(`/${id}`, body),
        eliminarProducto: (id) => api.remove(`/${id}`)
    };
}
