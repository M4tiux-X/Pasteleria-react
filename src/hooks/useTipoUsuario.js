// src/hooks/useTipoUsuario.js

import useApi from ".hooks/useApi";
const URL = "http://localhost:8081/api/tipo_usuario";

export default function useTipoUsuario() {
    const api = useApi(URL);
    return {
        ...api,
        obtenerTipos: () => api.get("/"),
        obtenerTipo: (id) => api.get(`/${id}`),
        crearTipo: (body) => api.post("/", body),
        actualizarTipo: (id, body) => api.put(`/${id}`, body),
        eliminarTipo: (id) => api.remove(`/${id}`)
    };
}
