// ===============================
// LIBRETA.JS - MOSTRAR NOTAS POR TRIMESTRE
// ===============================
// BASE DE DATOS CORREGIDA (solo calificaciones)
const estudiantesNotas = {
    "1234567": {
        descripcion: "Usted tiene 4 áreas reprobadas",
        calificaciones: {
            "1er Trim.": [
                { area: "LENGUA EXTRANJERA", calificacion: 45, estado: "REPROBADO(A)", observacion: "" },
                { area: "CIENCIAS SOCIALES", calificacion: 43, estado: "REPROBADO(A)", observacion: "" },
                { area: "COSMOVISIONES", calificacion: 46, estado: "REPROBADO(A)", observacion: "" }
            ],
            "2do Trim.": [
                { area: "ARTES PLÁSTICAS", calificacion: 35, estado: "REPROBADO(A)", observacion: "" }
            ],
            "3er Trim.": []
        }
    },
    "7654321": {
        descripcion: "Usted no tiene áreas reprobadas",
        calificaciones: {
            "1er Trim.": [],
            "2do Trim.": [],
            "3er Trim.": []
        }
    }
};

// ===============================
// USUARIO ACTUAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("estudiante"));

    if (!data) {
        window.location.href = "lateral.html";
        return;
    }

    const CI = data.ci;
    const estudiante = estudiantesNotas[CI];

    if (!estudiante) {
        alert("Estudiante no encontrado");
        return;
    }

    mostrarPerfil(data, estudiante);
    cargarNotas(estudiante);
});

// ===============================
// MOSTRAR PERFIL (HEADER + SECCIÓN STUDENT-INFO)
// ===============================
function mostrarPerfil(data, estudianteNotas) {
    const nombreCompleto = data.nombre + " " + data.apellido;

    // PERFIL HEADER
    const studentName = document.getElementById("student-name");
    if (studentName) studentName.textContent = data.nombre;

    const nombreSpan = document.getElementById("nombreCompleto");
    if (nombreSpan) nombreSpan.textContent = nombreCompleto;

    const cursoHeader = document.getElementById("course-name");
    if (cursoHeader) cursoHeader.textContent = data.curso;

    // SECCIÓN STUDENT-INFO
    const studentNameMain = document.querySelector(".student-info #student-name");
    if (studentNameMain) studentNameMain.textContent = nombreCompleto;

    const courseNameMain = document.querySelector(".student-info #course-name");
    if (courseNameMain) courseNameMain.textContent = data.curso;

    const descripcion = document.querySelector(".student-info #descripcion-name");
    if (descripcion) descripcion.textContent = estudianteNotas.descripcion;
}

// ===============================
// CARGAR NOTAS POR TRIMESTRE
// ===============================
function cargarNotas(estudianteNotas) {
    const trimestres = ["1er Trim.", "2do Trim.", "3er Trim."];

    trimestres.forEach((trim, index) => {
        const tbody = document.getElementById(`grades-trim-${index+1}`);
        if (!tbody) return;

        tbody.innerHTML = ""; // limpiar tabla

        const lista = estudianteNotas.calificaciones[trim] || [];

        if (lista.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">SIN ÁREAS REPROBADAS</td>
                </tr>
            `;
            return;
        }

        lista.forEach(nota => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${nota.area}</td>
                <td>${nota.calificacion}</td>
                <td style="color:red; font-weight:bold;">${nota.estado}</td>
                <td>${nota.observacion || "-"}</td>
            `;
            tbody.appendChild(fila);
        });
    });
}
// ===============================
// PARA DESCARGAR LIBRETAS EN PDF
// ===============================
function verLibreta() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) {
        alert("No hay sesión activa");
        return;
    }

    const ci = estudiante.ci;

    // ⚠️ Carpeta: libretas
    const filePath = `libretas/${ci}.pdf`;

    document.getElementById("visorLibreta").src = filePath;
}

function descargarLibreta() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) {
        alert("No hay sesión activa");
        return;
    }

    const ci = estudiante.ci;
    const filePath = `libretas/${ci}.pdf`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = `${ci}.pdf`;
    link.click();
}

// 🔒 PROTEGER ACCESO
const estudiante = localStorage.getItem("estudiante");

if (!estudiante) {
    window.location.href = "index.html";
}
// Función para cerrar sesión location.replace()	El historial no permite volver a plataforma
function logout() {
    // Elimina la sesión
    localStorage.removeItem("loggedUser");

    // Redirige reemplazando la historia (impide volver con "Atrás")
    location.replace("index.html");
}
