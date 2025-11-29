// src/hooks/useBoletas.js

import useApi from ".hooks/useApi";
const URL = "http://localhost:8088/api/boleta";

export default function useBoletas() {
    const api = useApi(URL);
    return {
        ...api,
        obtenerBoletas: () => api.get("/"),
        obtenerBoleta: (id) => api.get(`/${id}`),
        crearBoleta: (body) => api.post("/", body)
    };
}
