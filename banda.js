// ===============================
// DATOS DE ENSAYOS POR ESTUDIANTE
// ===============================
const bandaData = {
    "1234567": {
        instrumento: "Tambor (Redoble)",
        codigo: "TAM-10",
        ensayos: [
            { actividad: "Ensayo tarde", dia: "Miércoles 20 de Agosto", asistencia: "PRESENTE", puntaje: 100, observacion: "" },
            { actividad: "Ensayo tarde", dia: "Miércoles 27 de Agosto", asistencia: "PRESENTE", puntaje: 100, observacion: "" },
            { actividad: "Ensayo tarde", dia: "Lunes 1 de Septiembre", asistencia: "PRESENTE", puntaje: 100, observacion: "" },
            { actividad: "Ensayo tarde", dia: "Viernes 12 de Septiembre", asistencia: "PRESENTE", puntaje: 100, observacion: "" },
        ]
    },
    "7654321": {
        instrumento: "Trompeta",
        codigo: "TPT-03",
        ensayos: [
            { actividad: "Ensayo tarde", dia: "Miércoles 20 de Agosto", asistencia: "FALTA", puntaje: 0, observacion: "" },
            { actividad: "Ensayo tarde", dia: "Miércoles 27 de Agosto", asistencia: "PRESENTE", puntaje: 100, observacion: "" },
            { actividad: "Ensayo tarde", dia: "Lunes 1 de Septiembre", asistencia: "FALTA", puntaje: 0, observacion: "" },
            { actividad: "Ensayo tarde", dia: "Viernes 12 de Septiembre", asistencia: "PRESENTE", puntaje: 100, observacion: "" },
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

    // Mostrar perfil en la página y en el header
    mostrarPerfil(estudiante);

    // Cargar ensayos y calcular promedio
    cargarEnsayos(estudiante);

    // Inicializar dropdown
    initDropdown();

    // Inicializar funcionalidad de compromiso
    initCompromiso();
});

function mostrarPerfil(estudiante) {
    // Obtener elementos
    const studentName = document.getElementById("student-name"); // botón header
    const nombreCompleto = document.getElementById("nombreCompleto"); // dropdown
    const courseName = document.getElementById("course-name");

    const instrumentName = document.getElementById("instrument-name");
    const codigoName = document.getElementById("codigo-name");

    // ✅ Obtener solo el primer nombre
    const primerNombre = estudiante.nombreCompleto.split(" ")[0];

    // ✅ Mostrar en el botón (solo nombre)
    if (studentName) studentName.textContent = primerNombre;

    // ✅ Mostrar en dropdown (nombre completo)
    if (nombreCompleto) nombreCompleto.textContent = estudiante.nombreCompleto;

    // ✅ Mostrar curso
    if (courseName) courseName.textContent = estudiante.curso;

    // ===============================
    // DATOS DE BANDA
    // ===============================
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

        // 🎯 COLOR SEGÚN NOTA
        if (e.puntaje < 51) {
            fila.classList.add("reprobado");
        } else {
            fila.classList.add("aprobado");
        }

fila.innerHTML = `
    <td>${e.actividad}</td>
    <td>${e.dia}</td>
    <td>${e.asistencia}</td>
    <td><span class="puntaje">${e.puntaje}</span></td>
    <td>${e.observacion || ""}</td>
`;

        tbody.appendChild(fila);

        total += e.puntaje;
        count++;
    });

    // ===============================
    // PROMEDIO FINAL
    // ===============================
    const promedio = count > 0 ? Math.round(total / count) : 0;
    const estadoFinal = promedio >= 51 ? "APROBADO(A)" : "REPROBADO(A)";

    const filaPromedio = document.createElement("tr");

    // 🎯 CLASE PARA NÚMERO Y ESTADO
    let clasePromedio = "";

    if (promedio < 51) {
        clasePromedio = "nota-baja";
    } else {
        clasePromedio = "nota-alta";
    }

    // ✅ FILA COMPLETA
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
// DROPDOWN HEADER
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
// MOSTRAR / OCULTAR COMPROMISO
// ===============================
function initCompromiso() {
    const contenedor = document.getElementById('contenedorImagen');
    const img = document.getElementById('imagen');
    if (!contenedor || !img) return;

    let anchoActual = 100;
    const minAncho = 30;
    const maxAncho = 100;

    document.getElementById('mostrarBtn').addEventListener('click', () => {
        contenedor.style.display = 'block';
        img.style.width = anchoActual + '%';
    });

    document.getElementById('ocultarBtn').addEventListener('click', () => {
        contenedor.style.display = 'none';
    });

    document.getElementById('aumentar').addEventListener('click', () => {
        if (anchoActual < maxAncho) {
            anchoActual += 10;
            if (anchoActual > maxAncho) anchoActual = maxAncho;
            img.style.width = anchoActual + '%';
        }
    });

    document.getElementById('reducir').addEventListener('click', () => {
        if (anchoActual > minAncho) {
            anchoActual -= 10;
            if (anchoActual < minAncho) anchoActual = minAncho;
            img.style.width = anchoActual + '%';
        }
    });
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

// Función para cerrar sesión location.replace()	El historial no permite volver a plataforma
function logout() {
    // Elimina la sesión
    localStorage.removeItem("loggedUser");

    // Redirige reemplazando la historia (impide volver con "Atrás")
    location.replace("index.html");
}
