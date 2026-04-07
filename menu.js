// ===============================
// BASE DE DATOS DE ESTUDIANTES
// ===============================
const estudiantes = {
    "1234567": { nombre: "VALENTINA", apellido: "PEREZ QUISPE", curso: "1ro de Secundaria" },
    "7654321": { nombre: "JUAN", apellido: "LOPEZ MAMANI", curso: "2do de Secundaria" }
};

// ===============================
// INICIALIZAR EVENTOS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    // 🔒 PROTECCIÓN DE ACCESO (ANTI-ATRÁS)
    const sesion = localStorage.getItem("estudiante");
    const pagina = window.location.pathname.split("/").pop();

    if (!sesion && pagina !== "index.html") window.location.replace("index.html");
    if (sesion && pagina === "index.html") window.location.replace("menu.html");

    // BLOQUEAR BOTÓN ATRÁS
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => window.history.pushState(null, null, window.location.href));

    // EVITAR CACHE
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) window.location.reload();
    });

    // LOGIN FORM
    const form = document.getElementById("loginForm");
    if (form) form.addEventListener("submit", (e) => { e.preventDefault(); login(); });

    // AUTOLOGIN
    const data = localStorage.getItem("estudiante");
    if (data && window.location.pathname.includes("index.html")) window.location.href = "menu.html";

    // MOSTRAR PERFIL SI HAY SESIÓN
    if (data) mostrarPerfilHeader();

    // DROPDOWN PERFIL
    const toggle = document.getElementById("dropdownToggle");
    if (toggle) toggle.addEventListener("click", () => {
        document.getElementById("dropdownMenu").classList.toggle("active");
    });

    // LATERAL
    const lateralBtn = document.querySelector(".menu-lateral-btn");
    if (lateralBtn) lateralBtn.addEventListener("click", toggleMenu);

    // BOTONES DE CURSO
    const cursoBtns = document.querySelectorAll(".sidebar button");
    cursoBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            mostrarContenido(e.currentTarget.dataset.curso, e);
        });
    });
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
    setTimeout(() => window.location.href = "menu.html", 800);
}

// ===============================
// MOSTRAR PERFIL EN HEADER Y DROPDOWN
// ===============================
function mostrarPerfilHeader() {
    const data = JSON.parse(localStorage.getItem("estudiante"));
    if (!data) {
        if (!window.location.pathname.includes("index.html")) window.location.href = "index.html";
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
// LIMPIAR INPUTS
// ===============================
function limpiarInputs() {
    const password = document.getElementById("password");
    if (password) password.value = "";
}

// ===============================
// CERRAR SESIÓN
// ===============================
function cerrarSesion() {
    localStorage.removeItem("estudiante");
    window.location.href = "index.html";
}

// ===============================
// MOSTRAR / OCULTAR CONTRASEÑA
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

    nextBtn.addEventListener("click", () => { showNext(); resetTimer(); });
    prevBtn.addEventListener("click", () => { showPrev(); resetTimer(); });

    function resetTimer() {
        clearInterval(interval);
        interval = setInterval(showNext, 4000);
    }
});

// ===============================
// RESALTAR CABECERA AUTOMÁTICO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#menuScroll a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) link.classList.add("activo");
        else link.classList.remove("activo");
    });
});

// ===============================
// LATERAL
// ===============================
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('activo');
    // Guardar página actual para "volver"
    localStorage.setItem('paginaActual', window.location.pathname.split('/').pop());
}

function mostrarContenido(curso, event) {
    const titulo = document.getElementById('tituloCurso');
    const info = document.getElementById('infoCurso');

    switch(curso) {
        case '1roSecundaria':
            titulo.textContent = '1ro de Secundaria';
            info.textContent = 'Información del 1ro de Secundaria';
            break;
        case '2doSecundaria':
            titulo.textContent = '2do de Secundaria';
            info.textContent = 'Información del 2do de Secundaria';
            break;
        case '3roSecundaria':
            titulo.textContent = '3ro de Secundaria';
            info.textContent = 'Información del 3ro de Secundaria';
            break;
        case '4toSecundaria':
            titulo.textContent = '4to de Secundaria';
            info.textContent = 'Información del 4to de Secundaria';
            break;
        case '5toSecundaria':
            titulo.textContent = '5to de Secundaria';
            info.textContent = 'Información del 5to de Secundaria';
            break;
        case '6toSecundaria':
            titulo.textContent = '6to de Secundaria';
            info.textContent = 'Información del 6to de Secundaria';
            break;
        case 'himnos':
            titulo.textContent = 'Himnos Patrióticos';
            info.textContent = 'Información sobre Himnos Patrióticos';
            break;
        case 'partituras':
            titulo.textContent = 'Partituras Musicales';
            info.textContent = 'Información sobre Partituras Musicales';
            break;
        default:
            titulo.textContent = 'Selecciona un curso';
            info.textContent = 'Aquí se mostrará la información del curso seleccionado.';
    }

    // Resaltar botón activo
    document.querySelectorAll('.sidebar button').forEach(btn => btn.classList.remove('activo'));
    if (event) event.currentTarget.classList.add('activo');
}

// BOTÓN "VOLVER" DESDE LATERAL (SI NECESARIO)
function volverPagina() {
    const pagina = localStorage.getItem('paginaActual') || 'menu.html';
    window.location.href = pagina;
}
