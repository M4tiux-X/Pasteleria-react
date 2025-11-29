// src/hooks/useUsuarios.js

import useApi from ".hooks/useApi";
const URL = "http://localhost:8082/api/usuario";

export default function useUsuarios() {
    const api = useApi(URL);
    return {
        ...api,
        obtenerUsuarios: () => api.get("/"),
        obtenerUsuario: (id) => api.get(`/${id}`),
        crearUsuario: (body) => api.post("/", body),
        actualizarUsuario: (id, body) => api.put(`/${id}`, body),
        eliminarUsuario: (id) => api.remove(`/${id}`)
    };
}
