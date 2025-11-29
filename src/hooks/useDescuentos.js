// src/hooks/useDescuentos.js

import useApi from ".hooks/useApi";
const URL = "http://localhost:8084/api/descuento";

export default function useDescuentos() {
    const api = useApi(URL);
    return {
        ...api,
        obtenerDescuentos: () => api.get("/"),
        obtenerDescuento: (id) => api.get(`/${id}`),
        crearDescuento: (body) => api.post("/", body),
        actualizarDescuento: (id, body) => api.put(`/${id}`, body),
        eliminarDescuento: (id) => api.remove(`/${id}`)
    };
}
