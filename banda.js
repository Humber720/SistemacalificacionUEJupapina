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
// API DE GOOGLE SHEETS
// ===============================
const API_BANDA = "https://script.google.com/macros/s/AKfycby-P00UHVTTnfiYdRcCsvVAiHd74wk19NByVbKg7xF_umbN2tldO6Sfni-vYSg838FZ/exec";

// ===============================
// INICIO AL CARGAR PÁGINA
// ===============================
window.addEventListener("DOMContentLoaded", async () => {

    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) {
        alert("Debes iniciar sesión para ver esta página");
        window.location.href = "index.html";
        return;
    }

    try {
        const url = API_BANDA + "?ci=" + estudiante.ci;
        const respuesta = await fetch(url);
        const texto = await respuesta.text();
        console.log("RESPUESTA REAL:", texto);
        let datos;
        try {
            datos = JSON.parse(texto);
        } catch (e) {
            console.error("NO ES JSON:", texto);
            alert("El servidor no devolvió JSON válido");
            console.log(texto);
            return;
        }
    // ===============================
    // Para mostrar mensaje si no forma en la Banda
    // ===============================
    if (!datos.existe) {

        estudiante.banda = {
            curso: "",
            instrumento: "",
            codigo: "",
            ensayos: []
        };

        mostrarPerfil(estudiante);
        cargarEnsayos(estudiante);
        return;
    }
        estudiante.banda = datos;
        mostrarPerfil(estudiante);
        cargarEnsayos(estudiante);
    } catch (error) {
    console.error("ERROR REAL:", error);
    alert("No fue posible conectar con Google Sheets."); 
}

    initDropdown();

    initCompromiso();

});

// ===============================
// MOSTRAR PERFIL
// ===============================
function mostrarPerfil(estudiante) {

const bandaInfo = estudiante.banda; // 👈 PRIMERO

const studentName = document.getElementById("student-name");
const nombreCompletoEl = document.getElementById("nombreCompleto");
const courseName = document.getElementById("course-name");
const instrumentName = document.getElementById("instrument-name");
const codigoName = document.getElementById("codigo-name");

// nombre
const nombreCompleto = estudiante.nombre + " " + estudiante.apellido;

const nombres = (estudiante.nombre || "").split(" ");
const nombreMostrar = nombres.slice(0, 2).join(" ");

if (studentName) studentName.textContent = nombreMostrar;
if (nombreCompletoEl) nombreCompletoEl.textContent = nombreCompleto;

// 👇 AHORA SÍ
if (courseName) courseName.textContent = bandaInfo.curso;
if (instrumentName) instrumentName.textContent = bandaInfo.instrumento;
if (codigoName) codigoName.textContent = bandaInfo.codigo;

}
//fecha para ensayos
function formatearFecha(fecha) {

    if (!fecha) return "";

    const f = new Date(fecha);

    const dia = String(f.getDate()).padStart(2, "0");
    const mes = String(f.getMonth() + 1).padStart(2, "0");
    const anio = f.getFullYear();

    return `${dia}-${mes}-${anio}`;
}
// ===============================
// CARGAR ENSAYOS Y PROMEDIO
// ===============================
function cargarEnsayos(estudiante) {
    const tbody = document.getElementById("grades-table");
    if (!tbody) return;

    tbody.innerHTML = "";


    const ensayos = estudiante.banda?.ensayos || [];

    let total = 0;
    let count = 0;

    ensayos.forEach(e => {
        const fila = document.createElement("tr");

        const puntaje = e.asistencia ? obtenerPuntaje(e.asistencia) : "";

        if (puntaje < 51) {
            fila.classList.add("reprobado");
        } else {
            fila.classList.add("aprobado");
        }

        fila.innerHTML = `
            <td>${e.actividad}</td>
            <td>${formatearFecha(e.dia)}</td>
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
    const ensayosValidos = ensayos.filter(
    e => e.asistencia && e.asistencia.trim() !== ""
    );

    if (ensayosValidos.length === 0) {
        const filaMensaje = document.createElement("tr");
        filaMensaje.innerHTML = `
            <td colspan="5" style="text-align:center; font-weight:bold; color:red;">
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
