// ===============================
// AUTOMATIZACIÓN DE ASISTENCIA
// ===============================
function obtenerPuntaje(asistencia) {
    switch (asistencia) {
        case "PRESENTE": return 100;
        case "FALTA": return 0;
        case "PERMISO": return 100;
        case "ATRASO": return 80;
        default: return 0;
    }
}

// ===============================
// DATOS DE ENSAYOS POR ESTUDIANTE
// ===============================
const bandaData = {
    "12735760": {
        instrumento: "Tambor (Redoble)",
        codigo: "TAM-10",
        ensayos: [
            { actividad: "Ensayo", dia: "Fecha", asistencia: "", observacion: "" },
            { actividad: "Ensayo", dia: "Fecha", asistencia: "", observacion: "" },
            { actividad: "Ensayo", dia: "Fecha", asistencia: "", observacion: "" },
            { actividad: "Ensayo", dia: "Fecha", asistencia: "", observacion: "" }
        ]
    },
    "1234567": {
        instrumento: "Ninguno",
        codigo: "TPT-03",
        ensayos: [
            { actividad: "Ensayo", dia: "Fecha", asistencia: "", observacion: "" }
        ]
    }
};

// ===============================
// INICIO AL CARGAR PÁGINA
// ===============================
window.addEventListener("DOMContentLoaded", () => {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) {
        alert("Debes iniciar sesión para ver esta página");
        window.location.href = "index.html";
        return;
    }

    mostrarPerfil(estudiante);
    cargarEnsayos(estudiante);
    initDropdown();
    initCompromiso();
});

// ===============================
// MOSTRAR PERFIL
// ===============================
function mostrarPerfil(estudiante) {
    const studentName = document.getElementById("student-name");
    const nombreCompletoEl = document.getElementById("nombreCompleto");
    const courseName = document.getElementById("course-name");

    const instrumentName = document.getElementById("instrument-name");
    const codigoName = document.getElementById("codigo-name");

    // ✅ Nombre completo correcto
    const nombreCompleto = estudiante.nombre + " " + estudiante.apellido;

    // ✅ Mostrar hasta 2 nombres
    const nombres = (estudiante.nombre || "").split(" ");
    const nombreMostrar = nombres.slice(0, 2).join(" ");

    // HEADER (botón)
    if (studentName) studentName.textContent = nombreMostrar;

    // PERFIL COMPLETO
    if (nombreCompletoEl) nombreCompletoEl.textContent = nombreCompleto;

    // CURSO
    if (courseName) courseName.textContent = estudiante.curso;

    // DATOS DE BANDA
    const bandaInfo = bandaData[estudiante.ci] || {};

    if (instrumentName) instrumentName.textContent = bandaInfo.instrumento || "—";
    if (codigoName) codigoName.textContent = bandaInfo.codigo || "—";
}
// ===============================
// CARGAR ENSAYOS Y PROMEDIO
// ===============================
function cargarEnsayos(estudiante) {
    const tbody = document.getElementById("grades-table");
    if (!tbody) return;

    tbody.innerHTML = "";

    const ensayos = (bandaData[estudiante.ci] || {}).ensayos || [];

    let total = 0;
    let count = 0;

    ensayos.forEach(e => {
        const fila = document.createElement("tr");

        const puntaje = obtenerPuntaje(e.asistencia);

        if (puntaje < 51) {
            fila.classList.add("reprobado");
        } else {
            fila.classList.add("aprobado");
        }

        fila.innerHTML = `
            <td>${e.actividad}</td>
            <td>${e.dia}</td>
            <td>${e.asistencia}</td>
            <td><span class="puntaje">${puntaje}</span></td>
            <td>${e.observacion || ""}</td>
        `;

        tbody.appendChild(fila);

        total += puntaje;
        count++;
    });

    // ===============================
    // VALIDAR SI HAY DATOS REALES
    // ===============================
    const ensayosValidos = ensayos.filter(e => obtenerPuntaje(e.asistencia) > 0);

    if (ensayosValidos.length === 0) {
        const filaMensaje = document.createElement("tr");
        filaMensaje.innerHTML = `
            <td colspan="5" style="text-align:center; font-weight:bold;">
                USTED NO ES PARTE DE LA BANDA DE MÚSICA
            </td>
        `;
        tbody.appendChild(filaMensaje);
        return;
    }

    // ===============================
    // PROMEDIO FINAL
    // ===============================
    const suma = ensayosValidos.reduce((sum, e) => sum + obtenerPuntaje(e.asistencia), 0);
    const promedio = Math.round(suma / ensayosValidos.length);

    const estadoFinal = promedio >= 51 ? "APROBADO(A)" : "REPROBADO(A)";
    const clasePromedio = promedio < 51 ? "nota-baja" : "nota-alta";

    const filaPromedio = document.createElement("tr");

    filaPromedio.innerHTML = `
        <td><b>PROMEDIO</b></td>
        <td></td>
        <td></td>
        <td><b class="${clasePromedio}">${promedio}</b></td>
        <td><b class="${clasePromedio}">${estadoFinal}</b></td>
    `;

    tbody.appendChild(filaPromedio);
}

// ===============================
// DROPDOWN
// ===============================
function initDropdown() {
    const toggleBtn = document.getElementById("dropdownToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (toggleBtn && dropdownMenu) {
        toggleBtn.addEventListener("click", () => {
            dropdownMenu.classList.toggle("hidden");
        });
    }
}

// ===============================
// COMPROMISO
// ===============================
function initCompromiso() {
    const contenedor = document.getElementById('contenedorImagen');
    const img = document.getElementById('imagen');

    if (!contenedor || !img) return;

    let anchoActual = 100;

    document.getElementById('mostrarBtn').onclick = () => {
        contenedor.style.display = 'block';
        img.style.width = anchoActual + '%';
    };

    document.getElementById('ocultarBtn').onclick = () => {
        contenedor.style.display = 'none';
    };
}
// ===============================
// MENÚ LATERAL (MÓVIL)
// ===============================
function toggleMenu() {

    const paginaActual = window.location.pathname;

    if (paginaActual.includes("lateral.html")) {
        window.history.back(); // vuelve a la página anterior
    } else {
        window.location.href = "lateral.html";
    }
}
// ===============================
// CERRAR SESIÓN
// ===============================
function cerrarSesion() {
    localStorage.removeItem("estudiante");

    // 👇 marcar que cerró sesión
    sessionStorage.setItem("logout", "true");
   // 👇 IMPORTANTE: replace (no permite volver atrás)
    window.location.replace("index.html");
}
