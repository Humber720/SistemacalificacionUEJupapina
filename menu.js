// ===============================
// BASE DE DATOS DE ESTUDIANTES
// ===============================
const estudiantes = {
    "1234567": { nombre: "VALENTINA", apellido: "PEREZ QUISPE", curso: "1ro de Secundaria" },
    "7654321": { nombre: "JUAN", apellido: "LOPEZ MAMANI", curso: "2do de Secundaria" }
};

// ===============================
// 🔒 CONTROL GLOBAL DE SESIÓN (ANTI-ATRÁS)
// ===============================
(function () {

    const pagina = window.location.pathname.split("/").pop();
    const sesion = localStorage.getItem("estudiante");

    // 🔓 SI ESTÁ EN LOGIN
    if (pagina === "index.html" || pagina === "") {
        if (sesion) {
            location.replace("menu.html"); // 🔥 NO permite volver
        }
        return;
    }

    // 🔒 SI NO HAY SESIÓN → BLOQUEAR
    if (!sesion) {
        location.replace("index.html");
        return;
    }

    // 🚫 BLOQUEAR BOTÓN ATRÁS
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        location.replace("index.html");
    };

    // 🔥 EVITAR CACHE (CLAVE EN CELULAR)
    window.addEventListener("pageshow", function (event) {
        if (event.persisted) {
            location.reload();
        }
    });

})();


// ===============================
// INICIALIZAR EVENTOS
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const data = localStorage.getItem("estudiante");

    // LOGIN FORM
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            login();
        });
    }

    // MOSTRAR DATOS SI HAY SESIÓN
    if (data) {
        mostrarPerfilHeader();
    }

    // DROPDOWN PERFIL
    const toggle = document.getElementById("dropdownToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.getElementById("dropdownMenu").classList.toggle("active");
        });
    }

});


// ===============================
// LOGIN
// ===============================
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    limpiarMensaje();

    if (!username || !password) return mostrarMensaje("Complete todos los campos", "red");
    if (!/^[0-9]+$/.test(username)) return mostrarMensaje("Solo números en el CI", "red");
    if (username !== password) return mostrarMensaje("El usuario y contraseña deben ser iguales", "red");

    const estudiante = estudiantes[username];
    if (!estudiante) return mostrarMensaje("CI no registrado", "red");

    const datos = {
        ci: username,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        nombreCompleto: estudiante.nombre + " " + estudiante.apellido,
        curso: estudiante.curso
    };

    localStorage.setItem("estudiante", JSON.stringify(datos));

    mostrarMensaje("Ingreso correcto...", "green");

    setTimeout(() => location.replace("menu.html"), 800); // 🔥 CLAVE
}


// ===============================
// MOSTRAR PERFIL
// ===============================
function mostrarPerfilHeader() {
    const data = JSON.parse(localStorage.getItem("estudiante"));
    if (!data) {
        location.replace("index.html");
        return;
    }

    const nombreCompleto = data.nombre + " " + data.apellido;

    const studentName = document.getElementById("student-name");
    if (studentName) studentName.textContent = data.nombre;

    const nombreSpan = document.getElementById("nombreCompleto");
    if (nombreSpan) nombreSpan.textContent = nombreCompleto;

    const cursoHeader = document.getElementById("course-name");
    if (cursoHeader) cursoHeader.textContent = data.curso;

    const nombrePrincipal = document.getElementById("nombrePrincipal");
    if (nombrePrincipal) nombrePrincipal.textContent = "Estudiante: " + nombreCompleto;

    const cursoPrincipal = document.getElementById("cursoPrincipal");
    if (cursoPrincipal) cursoPrincipal.textContent = data.curso;

    const studentNameMain = document.getElementById("student-name-main");
    if (studentNameMain) studentNameMain.textContent = nombreCompleto;

    const courseNameMain = document.getElementById("course-name-main");
    if (courseNameMain) courseNameMain.textContent = data.curso;
}


// ===============================
// MENSAJES
// ===============================
function mostrarMensaje(texto, color) {
    const mensaje = document.getElementById("mensaje");
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.style.color = color;
    }
}

function limpiarMensaje() {
    const mensaje = document.getElementById("mensaje");
    if (mensaje) mensaje.textContent = "";
}


// ===============================
// CERRAR SESIÓN (MEJORADO)
// ===============================
function cerrarSesion() {
    localStorage.removeItem("estudiante");
    location.replace("index.html"); // 🔥 evita volver
}


// ===============================
// MOSTRAR / OCULTAR PASSWORD
// ===============================
function togglePasswordVisibility() {
    const input = document.getElementById("password");
    const eyeOpen = document.getElementById("eyeOpen");
    const eyeClose = document.getElementById("eyeClose");

    if (input.type === "password") {
        input.type = "text";
        eyeOpen.style.display = "none";
        eyeClose.style.display = "inline";
    } else {
        input.type = "password";
        eyeOpen.style.display = "inline";
        eyeClose.style.display = "none";
    }
}


// ===============================
// SCROLL MENÚ
// ===============================
function scrollMenu(valor) {
    const menu = document.getElementById("menuScroll");
    if (menu) menu.scrollLeft += valor;
}


// ===============================
// PUBLICIDAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".publicidad img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (!slides.length) return;

    let index = 0;
    let interval = setInterval(showNext, 4000);

    function showSlide(n) {
        slides.forEach((img, i) => {
            img.classList.remove("active");
            if (i === n) img.classList.add("active");
        });
    }

    function showNext() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    function showPrev() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    nextBtn?.addEventListener("click", () => {
        showNext();
        resetTimer();
    });

    prevBtn?.addEventListener("click", () => {
        showPrev();
        resetTimer();
    });

    function resetTimer() {
        clearInterval(interval);
        interval = setInterval(showNext, 4000);
    }
});


// ===============================
// MENÚ ACTIVO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#menuScroll a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("activo");
        } else {
            link.classList.remove("activo");
        }
    });
});
