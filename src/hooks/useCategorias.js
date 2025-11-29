// src/hooks/useCategorias.js

import useApi from ".hooks/useApi";
const URL = "http://localhost:8085/api/categoria";

export default function useCategorias() {
    const api = useApi(URL);
    return {
        ...api,
        obtenerCategorias: () => api.get("/"),
        obtenerCategoria: (id) => api.get(`/${id}`),
        crearCategoria: (body) => api.post("/", body),
        actualizarCategoria: (id, body) => api.put(`/${id}`, body),
        eliminarCategoria: (id) => api.remove(`/${id}`)
    };
}
