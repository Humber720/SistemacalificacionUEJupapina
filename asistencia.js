// ======================================================
// CONFIGURACIÓN
// ======================================================

// URL DE TU GOOGLE APPS SCRIPT
const URL_ASISTENCIA =
    "https://script.google.com/macros/s/AKfycbxlMYwOvAQrBfVnAyPgi0yPoV1GiSYEVcUQG9S-5-lrSknroWYQNvb2vyE2HzJxTdEZ/exec";


// ======================================================
// CARGAR ASISTENCIA
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const datosGuardados =
        localStorage.getItem("estudiante");

    if (!datosGuardados) {

        window.location.href = "index.html";

        return;
    }

    let data;

    try {

        data = JSON.parse(datosGuardados);

    } catch (error) {

        console.error(
            "Error leyendo los datos del estudiante:",
            error
        );

        window.location.href = "index.html";

        return;
    }


    // ==================================================
    // CARGAR ASISTENCIA
    // ==================================================

    cargarAsistencia(data);

});


// ======================================================
// CARGAR ASISTENCIA DESDE GOOGLE SHEETS
// ======================================================

async function cargarAsistencia(data) {

    const tabla =
        document.getElementById("asistencia-table");

    if (!tabla) return;


    // ==================================================
    // OBTENER CI
    // ==================================================

    const ci =
        String(data.ci || "").trim();


    if (!ci) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5">
                    No se encontró el CI del estudiante.
                </td>
            </tr>
        `;

        return;
    }


    // ==================================================
    // MENSAJE DE CARGA
    // ==================================================

    tabla.innerHTML = `
        <tr>
            <td colspan="5">
                Cargando asistencia...
            </td>
        </tr>
    `;


    try {

        // ==================================================
        // URL
        // ==================================================

        const url =
            URL_ASISTENCIA +
            "?accion=resumenAsistencia&ci=" +
            encodeURIComponent(ci);


        console.log(
            "Consultando asistencia:",
            url
        );


        // ==================================================
        // CONSULTAR APPS SCRIPT
        // ==================================================

        const respuesta =
            await fetch(url);


        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP: " +
                respuesta.status
            );

        }


        // ==================================================
        // JSON
        // ==================================================

        const resultado =
            await respuesta.json();


        console.log(
            "Respuesta de asistencia:",
            resultado
        );


        // ==================================================
        // VERIFICAR ERROR
        // ==================================================

        if (resultado.error) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="5">
                        ${resultado.mensaje ||
                        "Error al cargar asistencia."}
                    </td>
                </tr>
            `;

            return;
        }


        // ==================================================
        // VERIFICAR ASISTENCIA
        // ==================================================

        if (!resultado.asistencia) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="5">
                        No existen registros de asistencia.
                    </td>
                </tr>
            `;

            return;
        }


        // ==================================================
        // OBTENER TRIMESTRES
        // ==================================================

// ==================================================
// OBTENER TRIMESTRES
// ==================================================

const asistencia =
    resultado.asistencia || [];

const t1 =
    asistencia[0] || {};

const t2 =
    asistencia[1] || {};

const t3 =
    asistencia[2] || {};


        // ==================================================
        // CONVERTIR A NÚMEROS
        // ==================================================

        const t1Faltas =
            Number(t1.faltas) || 0;

        const t1Atrasos =
            Number(t1.atrasos) || 0;

        const t1Permisos =
            Number(t1.permisos) || 0;

        const t1Asistencias =
            Number(t1.asistencias) || 0;


        const t2Faltas =
            Number(t2.faltas) || 0;

        const t2Atrasos =
            Number(t2.atrasos) || 0;

        const t2Permisos =
            Number(t2.permisos) || 0;

        const t2Asistencias =
            Number(t2.asistencias) || 0;


        const t3Faltas =
            Number(t3.faltas) || 0;

        const t3Atrasos =
            Number(t3.atrasos) || 0;

        const t3Permisos =
            Number(t3.permisos) || 0;

        const t3Asistencias =
            Number(t3.asistencias) || 0;


        // ==================================================
        // SUMA ANUAL
        // ==================================================

        const totalFaltas =
            t1Faltas +
            t2Faltas +
            t3Faltas;


        const totalAtrasos =
            t1Atrasos +
            t2Atrasos +
            t3Atrasos;


        const totalPermisos =
            t1Permisos +
            t2Permisos +
            t3Permisos;


        const totalAsistencias =
            t1Asistencias +
            t2Asistencias +
            t3Asistencias;


        // ==================================================
        // FUNCIÓN PARA MOSTRAR "-"
        // ==================================================

        function mostrar(valor) {

            return valor === 0
                ? "-"
                : valor;

        }


        // ==================================================
        // CREAR TABLA
        // ==================================================

        tabla.innerHTML = `

            <!-- 1ER TRIMESTRE -->

            <tr>

                <td>
                    1er Trimestre
                </td>

                <td>
                    ${mostrar(t1Faltas)}
                </td>

                <td>
                    ${mostrar(t1Atrasos)}
                </td>

                <td>
                    ${mostrar(t1Permisos)}
                </td>

                <td>
                    ${mostrar(t1Asistencias)}
                </td>

            </tr>


            <!-- 2DO TRIMESTRE -->

            <tr>

                <td>
                    2do Trimestre
                </td>

                <td>
                    ${mostrar(t2Faltas)}
                </td>

                <td>
                    ${mostrar(t2Atrasos)}
                </td>

                <td>
                    ${mostrar(t2Permisos)}
                </td>

                <td>
                    ${mostrar(t2Asistencias)}
                </td>

            </tr>


            <!-- 3ER TRIMESTRE -->

            <tr>

                <td>
                    3er Trimestre
                </td>

                <td>
                    ${mostrar(t3Faltas)}
                </td>

                <td>
                    ${mostrar(t3Atrasos)}
                </td>

                <td>
                    ${mostrar(t3Permisos)}
                </td>

                <td>
                    ${mostrar(t3Asistencias)}
                </td>

            </tr>


            <!-- TOTAL ANUAL -->

            <tr class="fila-total">

                <td>
                    TOTAL / ANUAL
                </td>

                <td>
                    ${mostrar(totalFaltas)}
                </td>

                <td>
                    ${mostrar(totalAtrasos)}
                </td>

                <td>
                    ${mostrar(totalPermisos)}
                </td>

                <td>
                    ${mostrar(totalAsistencias)}
                </td>

            </tr>

        `;


    } catch (error) {

        // ==================================================
        // ERROR
        // ==================================================

        console.error(
            "Error al cargar asistencia:",
            error
        );


        tabla.innerHTML = `
            <tr>
                <td colspan="5">
                    No se pudo conectar con Google Sheets.
                </td>
            </tr>
        `;

    }

}