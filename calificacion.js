// ===============================
// URL GOOGLE APPS SCRIPT
// ===============================

const URL_CALIFICACIONES =
    "https://script.google.com/macros/s/AKfycbyDoYSlZs8prDYpYE4vmadxZjH2CN2ZRWHtuF5Nae4AoB6Goe3TB0nUST0_A-eX2GvZEQ/exec";


// ===============================
// CARGAR DATOS DEL ESTUDIANTE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const data = JSON.parse(
        localStorage.getItem("estudiante")
    );

    if (!data) {
        window.location.href = "lateral.html";
        return;
    }

    const nombreCompleto =
        (data.nombre || "") + " " + (data.apellido || "");

    const nombreElemento =
        document.getElementById("student-name-main");

    if (nombreElemento) {
        nombreElemento.textContent =
            nombreCompleto.trim();
    }

    const cursoElemento =
        document.getElementById("course-name-main");

    if (cursoElemento) {
        cursoElemento.textContent =
            data.curso || "";
    }

    cargarNotas(data);
});


// ===============================
// CARGAR NOTAS DESDE GOOGLE SHEETS
// ===============================

async function cargarNotas(data) {

    const tabla =
        document.getElementById("grades-table");

    if (!tabla) {
        console.error("No existe grades-table");
        return;
    }

    // -------------------------------
    // MENSAJE DE CARGA
    // -------------------------------

    tabla.innerHTML = `
        <tr>
            <td colspan="6">
                Cargando calificaciones...
            </td>
        </tr>
    `;

    try {

        // -------------------------------
        // VERIFICAR CI
        // -------------------------------

        if (!data.ci) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="6">
                        No se encontró el CI del estudiante.
                    </td>
                </tr>
            `;

            return;
        }


        // -------------------------------
        // CREAR URL
        // -------------------------------

        const url =
            URL_CALIFICACIONES +
            "?ci=" +
            encodeURIComponent(data.ci);


        console.log(
            "Consultando calificaciones:",
            url
        );


        // -------------------------------
        // CONSULTAR GOOGLE APPS SCRIPT
        // -------------------------------

        const respuesta =
            await fetch(url);


        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP: " +
                respuesta.status
            );

        }


        // -------------------------------
        // CONVERTIR RESPUESTA A JSON
        // -------------------------------

        const resultado =
            await respuesta.json();


        console.log(
            "Respuesta de Google Sheets:",
            resultado
        );


        // -------------------------------
        // VERIFICAR ERROR
        // -------------------------------

        if (resultado.error) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="6">
                        ${
                            resultado.mensaje ||
                            "No se encontraron datos."
                        }
                    </td>
                </tr>
            `;

            return;
        }


        // -------------------------------
        // VERIFICAR CALIFICACIONES
        // -------------------------------

        if (
            !resultado.calificaciones ||
            !Array.isArray(
                resultado.calificaciones
            )
        ) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="6">
                        No se encontraron calificaciones.
                    </td>
                </tr>
            `;

            return;
        }


        // -------------------------------
        // MOSTRAR CALIFICACIONES
        // -------------------------------

        mostrarCalificaciones(
            resultado.calificaciones
        );


    } catch (error) {

        console.error(
            "Error al cargar calificaciones:",
            error
        );


        tabla.innerHTML = `
            <tr>
                <td colspan="6">
                    No se pudieron cargar las calificaciones.
                </td>
            </tr>
        `;

    }

}


// ===============================
// MOSTRAR CALIFICACIONES
// ===============================

function mostrarCalificaciones(calificaciones) {

    const tabla =
        document.getElementById(
            "grades-table"
        );

    if (!tabla) {
        return;
    }

    tabla.innerHTML = "";

    let suma = 0;

    let contador = 0;


    // ===============================
    // RECORRER TRIMESTRES
    // ===============================

    calificaciones.forEach(function (nota) {

        let puntaje = "";

        let autoevaluacion = "";

        let calificacion = "";


        // -------------------------------
        // PUNTAJE
        // -------------------------------

        if (
            nota.puntaje !== "" &&
            nota.puntaje !== null &&
            nota.puntaje !== undefined
        ) {

            puntaje =
                Number(nota.puntaje);

        }


        // -------------------------------
        // AUTOEVALUACIÓN
        // -------------------------------

        if (
            nota.autoevaluacion !== "" &&
            nota.autoevaluacion !== null &&
            nota.autoevaluacion !== undefined
        ) {

            autoevaluacion =
                Number(
                    nota.autoevaluacion
                );

        }


        // -------------------------------
        // CALIFICACIÓN
        // -------------------------------

        if (
            puntaje !== "" &&
            autoevaluacion !== ""
        ) {

            calificacion =
                puntaje +
                autoevaluacion;

        }

        else if (
            puntaje !== ""
        ) {

            calificacion =
                puntaje;

        }


        // -------------------------------
        // ESTADO
        // -------------------------------

        const estado =
            obtenerEstado(
                calificacion
            );


        const clase =
            obtenerClaseEstado(
                calificacion
            );


        // -------------------------------
        // CREAR FILA
        // -------------------------------

        const fila =
            document.createElement("tr");


        fila.innerHTML =

            "<td>" +
                (nota.trimestre || "") +
            "</td>" +

            "<td>" +
                (
                    puntaje !== ""
                        ? puntaje
                        : ""
                ) +
            "</td>" +

            "<td>" +
                (
                    autoevaluacion !== ""
                        ? autoevaluacion
                        : ""
                ) +
            "</td>" +

            '<td class="' +
                clase +
            '">' +
                (
                    calificacion !== ""
                        ? calificacion
                        : ""
                ) +
            "</td>" +

            '<td class="' +
                clase +
            '">' +
                (
                    estado || ""
                ) +
            "</td>" +

            "<td>" +
                (
                    nota.observacion || ""
                ) +
            "</td>";


        tabla.appendChild(
            fila
        );


        // -------------------------------
        // SUMAR PARA PROMEDIO
        // -------------------------------

        if (
            calificacion !== "" &&
            !isNaN(calificacion)
        ) {

            suma +=
                Number(calificacion);

            contador++;

        }

    });


    // ===============================
    // PROMEDIO
    // ===============================

    let promedio = "";

    let estadoPromedio = "";


    if (contador > 0) {

        promedio =
            Math.round(
                suma / contador
            );

        estadoPromedio =
            obtenerEstado(
                promedio
            );

    }


    // ===============================
    // FILA PROMEDIO
    // ===============================

    const filaPromedio =
        document.createElement("tr");


    filaPromedio.innerHTML =

        "<td><strong>PROMEDIO</strong></td>" +

        "<td>-</td>" +

        "<td>-</td>" +

        '<td class="' +
            obtenerClaseEstado(
                promedio
            ) +
        '">' +

            "<strong>" +
                (
                    promedio !== ""
                        ? promedio
                        : ""
                ) +
            "</strong>" +

        "</td>" +

        '<td class="' +
            obtenerClaseEstado(
                promedio
            ) +
        '">' +

            "<strong>" +
                (
                    estadoPromedio || ""
                ) +
            "</strong>" +

        "</td>" +

        "<td>-</td>";


    tabla.appendChild(
        filaPromedio
    );

}


// ===============================
// ESTADO
// ===============================

function obtenerEstado(calificacion) {

    if (
        calificacion === "" ||
        calificacion === null ||
        calificacion === undefined ||
        isNaN(calificacion)
    ) {

        return "";

    }


    if (
        Number(calificacion) >= 51
    ) {

        return "APROBADO(A)";

    }


    return "REPROBADO(A)";

}


// ===============================
// CLASE CSS
// ===============================

function obtenerClaseEstado(calificacion) {

    if (
        calificacion === "" ||
        calificacion === null ||
        calificacion === undefined ||
        isNaN(calificacion)
    ) {

        return "";

    }


    if (
        Number(calificacion) >= 51
    ) {

        return "aprobado";

    }


    return "reprobado";

}


// ===============================
// PDF
// ===============================

function verNota() {

    const estudiante =
        JSON.parse(
            localStorage.getItem(
                "estudiante"
            )
        );

    if (!estudiante) {

        alert(
            "No hay sesión activa"
        );

        return;
    }


    const visor =
        document.getElementById(
            "visorPDF"
        );


    if (visor) {

        visor.src =
            "notas/" +
            estudiante.ci +
            ".pdf";

    }

}


function descargarNota() {

    const estudiante =
        JSON.parse(
            localStorage.getItem(
                "estudiante"
            )
        );

    if (!estudiante) {

        alert(
            "No hay sesión activa"
        );

        return;
    }


    const link =
        document.createElement("a");


    link.href =
        "notas/" +
        estudiante.ci +
        ".pdf";


    link.download =
        estudiante.ci +
        ".pdf";


    link.click();

}


// ===============================
// MENÚ
// ===============================

function toggleMenu() {

    const paginaActual =
        window.location.pathname;


    if (
        paginaActual.includes(
            "lateral.html"
        )
    ) {

        window.history.back();

    }

    else {

        window.location.href =
            "lateral.html";

    }

}


// ===============================
// CERRAR SESIÓN
// ===============================

function cerrarSesion() {

    localStorage.removeItem(
        "estudiante"
    );


    sessionStorage.setItem(
        "logout",
        "true"
    );


    window.location.replace(
        "index.html"
    );

}


// ===============================
// BOTÓN NOTA
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const boton =
            document.getElementById(
                "btnNota"
            );


        if (!boton) {
            return;
        }


        boton.addEventListener(
            "click",
            function () {

                const modal =
                    document.getElementById(
                        "modalNota"
                    );


                if (modal) {

                    modal.style.display =
                        "flex";

                }

            }
        );

    }
);


// ===============================
// CERRAR MODAL
// ===============================

function cerrarModal() {

    const modal =
        document.getElementById(
            "modalNota"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// ===============================
// CERRAR AL TOCAR AFUERA
// ===============================

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "modalNota"
            );


        if (
            modal &&
            event.target === modal
        ) {

            modal.style.display =
                "none";

        }

    }
);
