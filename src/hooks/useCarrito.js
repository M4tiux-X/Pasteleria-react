// src/hooks/useCarrito.js

import useApi from ".hooks/useApi";
const URL = "http://localhost:8086/api/carrito";

export default function useCarrito() {
    const api = useApi(URL);
    return {
        ...api,
        obtenerCarritoUsuario: (idUsuario) => api.get(`/usuario/${idUsuario}`),
        crearCarrito: (body) => api.post("/", body),
        eliminarCarrito: (id) => api.remove(`/${id}`)
    };
}
