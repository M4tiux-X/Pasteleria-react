// --- REGISTRO DE NUEVOS USUARIOS ---
document.getElementById("form-registro").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = document.getElementById("new-username").value.trim();
    const pass = document.getElementById("new-password").value.trim();
    const role = document.getElementById("new-role").value;
    const mensaje = document.getElementById("mensajeRegistro");

    if (!user || !pass) {
        mensaje.textContent = "Debes ingresar usuario y contraseña.";
        mensaje.style.color = "red";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el usuario ya existe
    if (usuarios.some(u => u.username === user)) {
        mensaje.textContent = "El usuario ya existe.";
        mensaje.style.color = "red";
        return;
    }

    // Agregar nuevo usuario
    usuarios.push({ username: user, password: pass, role: role });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "Usuario registrado correctamente como " + role;
    mensaje.style.color = "green";

    // Limpiar el formulario después de registrar
    setTimeout(() => {
        e.target.reset();
        mensaje.textContent = "";
    }, 1500);
});


// --- LOGIN DE USUARIOS EXISTENTES ---
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("mensaje");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar usuario en localStorage
    const usuarioEncontrado = usuarios.find(u => u.username === user && u.password === pass);

    if (usuarioEncontrado) {
        // Guardar usuario logueado
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

        mensaje.style.color = "green";
        mensaje.textContent = `Bienvenido ${user} (${usuarioEncontrado.role})`;

        //Limpiar el formulario antes de redirigir
        e.target.reset();

        //Redirigir según el rol
        setTimeout(() => {
            if (usuarioEncontrado.role === "ADMIN") {
                window.location.href = "admin.html";  // vista administrador
            } else {
                window.location.href = "index.html";  // vista usuario normal
            }
        }, 1000);
    } else {
        mensaje.style.color = "red";
        mensaje.textContent = "Usuario o contraseña incorrectos";
    }
});