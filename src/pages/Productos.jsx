import '../css/main.css'
import { useEffect } from "react";

const Productos=()=>{
    useEffect(() =>{
        if (!document.querySelector("script[src='/js/main.js']")) {
        const sc = document.createElement("script")
        sc.src = "/js/main.js"
        sc.async = true
        document.body.appendChild(sc)
        console.log("script cargado...")

        sc.onload = () =>{
            if(window.inicializarApp()){
                window.inicializarApp();
            }
            
        }
    } else {
        console.log("script No Cargado")
    }
    
    })
    return(
        <main>
        <h2 id="titulo-principal" className="titulo-principal">Todos Los Productos</h2>
        <div className="contenedor-login">
            <button id="login" className="boton-login "><i></i><a href="/login">Login</a></button>
        </div>
        <div id="contenedor-productos" className="contenedor-productos">
        </div>
        </main>
    
)}
export default Productos;