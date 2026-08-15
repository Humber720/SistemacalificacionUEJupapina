// ======================================================
// URL DEL NUEVO GOOGLE APPS SCRIPT
// ======================================================

const URL_LIBRETAS =
    "https://script.google.com/macros/s/AKfycbyH-t_plJhfyy1sSnRAwdWT7zJ2BZ8MeQUN1oTJDT1boEl3xkWuSAazNNdC5k7sSa6u/exec";


// ======================================================
// FUNCIÓN ESTADO
// ======================================================

function obtenerEstado(calificacion) {

    const nota = Number(calificacion);

    return nota >= 51
        ? "APROBADO(A)"
        : "REPROBADO(A)";
}


// ======================================================
// FUNCIÓN AUTOMÁTICA DESCRIPCIÓN
// ======================================================

function generarDescripcion(calificaciones) {

    let reprobadas = 0;


    Object.values(calificaciones).forEach(lista => {

        lista.forEach(nota => {

            const calificacion =
                Number(nota.calificacion);


            if (
                nota.calificacion !== "" &&
                !isNaN(calificacion) &&
                calificacion < 51
            ) {

                reprobadas++;

            }

        });

    });


    // -----------------------------------------------
    // NINGUNA REPROBADA
    // -----------------------------------------------

    if (reprobadas === 0) {

        return "Usted no tiene áreas reprobadas";

    }


    // -----------------------------------------------
    // UNA REPROBADA
    // -----------------------------------------------

    if (reprobadas === 1) {

        return "Usted tiene 1 área reprobada";

    }


    // -----------------------------------------------
    // VARIAS REPROBADAS
    // -----------------------------------------------

    return `Usted tiene ${reprobadas} áreas reprobadas`;

}


// ======================================================
// MENSAJE CARGANDO
// ======================================================

function mostrarCargando() {

    // -----------------------------------------------
    // DESCRIPCIÓN
    // -----------------------------------------------

    // -----------------------------------------------
    // TABLAS
    // -----------------------------------------------

    ["1", "2", "3"].forEach(num => {

        const tbody =
            document.getElementById(
                `grades-trim-${num}`
            );


        if (!tbody) {
            return;
        }


        tbody.innerHTML = `
            <tr>
                <td colspan="4"
                    style="
                        text-align:center;
                        font-weight:bold;
                        padding:18px;
                        color:#2563eb;
                    ">
                    ⏳ Cargando materias reprobadas...
                </td>
            </tr>
        `;

    });

}


// ======================================================
// INICIO
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // -------------------------------------------
        // OBTENER ESTUDIANTE
        // -------------------------------------------

        const data =
            JSON.parse(
                localStorage.getItem("estudiante")
            );


        // -------------------------------------------
        // VALIDAR SESIÓN
        // -------------------------------------------

        if (!data) {

            window.location.href =
                "lateral.html";

            return;

        }


        // -------------------------------------------
        // CI
        // -------------------------------------------

        const CI =
            String(data.ci || "").trim();


        if (!CI) {

            alert(
                "No se encontró el CI del estudiante."
            );

            return;

        }


        // -------------------------------------------
        // MOSTRAR DATOS BÁSICOS
        // -------------------------------------------

        mostrarPerfilBasico(data);


        // -------------------------------------------
        // MOSTRAR CARGANDO
        // -------------------------------------------

        mostrarCargando();


        // -------------------------------------------
        // CONSULTAR GOOGLE SHEETS
        // -------------------------------------------

        try {

            const url =
                `${URL_LIBRETAS}?ci=${encodeURIComponent(CI)}`;


            console.log(
                "Consultando Libretas:",
                url
            );


            const respuesta =
                await fetch(url);


            const resultado =
                await respuesta.json();


            console.log(
                "Respuesta Libretas:",
                resultado
            );


            // ---------------------------------------
            // ERROR DEL APPS SCRIPT
            // ---------------------------------------

            if (resultado.error) {

                console.error(
                    "Error Apps Script:",
                    resultado.mensaje
                );


                mostrarTablasSinDatos(
                    resultado.mensaje ||
                    "No se pudieron cargar las calificaciones."
                );


                return;

            }


            // ---------------------------------------
            // ESTUDIANTE NO ENCONTRADO
            // ---------------------------------------

            if (!resultado.existe) {

                mostrarTablasSinDatos(
                    "ESTUDIANTE NO ENCONTRADO"
                );


                const descripcion =
                    document.querySelector(
                        ".student-info #descripcion-name"
                    );


                if (descripcion) {

                    descripcion.textContent =
                        "No se encontraron datos del estudiante.";

                }


                return;

            }


            // ---------------------------------------
            // OBTENER INFORMACIÓN
            // ---------------------------------------

            const estudiante =
                resultado.estudiante || {};


            const calificaciones =
                resultado.calificaciones || {


                    "1er Trim.": [],

                    "2do Trim.": [],

                    "3er Trim.": []

                };


            // ---------------------------------------
            // MOSTRAR PERFIL
            // ---------------------------------------

            mostrarPerfil(
                data,
                {
                    calificaciones:
                        calificaciones
                },
                estudiante
            );


            // ---------------------------------------
            // CARGAR NOTAS
            // ---------------------------------------

            cargarNotas({

                calificaciones:
                    calificaciones

            });


        } catch (error) {

            console.error(
                "Error consultando Libretas:",
                error
            );


            mostrarTablasSinDatos(
                "No se pudieron cargar los datos."
            );


            const descripcion =
                document.querySelector(
                    ".student-info #descripcion-name"
                );


            if (descripcion) {

                descripcion.textContent =
                    "No se pudieron cargar las materias reprobadas.";

            }

        }

    }
);


// ======================================================
// MOSTRAR PERFIL BÁSICO
// ======================================================

function mostrarPerfilBasico(data) {

    const nombreCompleto =
        `${data.nombre || ""} ${data.apellido || ""}`.trim();


    // -----------------------------------------------
    // HEADER
    // -----------------------------------------------

    const studentName =
        document.getElementById(
            "student-name"
        );


    if (studentName) {

        studentName.textContent =
            data.nombre || "";

    }


    const nombreSpan =
        document.getElementById(
            "nombreCompleto"
        );


    if (nombreSpan) {

        nombreSpan.textContent =
            nombreCompleto;

    }


    const cursoHeader =
        document.getElementById(
            "course-name"
        );


    if (cursoHeader) {

        cursoHeader.textContent =
            data.curso || "";

    }


    // -----------------------------------------------
    // INFORMACIÓN PRINCIPAL
    // -----------------------------------------------

    const studentNameMain =
        document.querySelector(
            ".student-info #student-name"
        );


    if (studentNameMain) {

studentName.textContent =
    data.nombre || "";

    }


    const courseNameMain =
        document.querySelector(
            ".student-info #course-name"
        );


    if (courseNameMain) {

        courseNameMain.textContent =
            data.curso || "";

    }

}

// ======================================================
// MOSTRAR PERFIL
// ======================================================

function mostrarPerfil(
    data,
    estudianteNotas,
    estudianteSheets
) {

    // ==================================================
    // EL NOMBRE SIEMPRE VIENE DE LOCALSTORAGE
    // NO DE GOOGLE SHEETS
    // ==================================================

    const nombreCompleto =
        `${data.nombre || ""} ${data.apellido || ""}`.trim();


    // ==================================================
    // EL CURSO TAMBIÉN VIENE DE LOCALSTORAGE
    // ==================================================

    const curso =
        data.curso || "";


    // ==================================================
    // HEADER SUPERIOR DERECHO
    // EJEMPLO: ASCENCIO
    // ==================================================

    const studentName =
        document.getElementById(
            "student-name"
        );


    if (studentName) {

        studentName.textContent =
            data.nombre || "";

    }


    // ==================================================
    // NOMBRE COMPLETO
    // ==================================================

    const nombreSpan =
        document.getElementById(
            "nombreCompleto"
        );


    if (nombreSpan) {

        nombreSpan.textContent =
            nombreCompleto;

    }


    // ==================================================
    // CURSO
    // ==================================================

    const cursoHeader =
        document.getElementById(
            "course-name"
        );


    if (cursoHeader) {

        cursoHeader.textContent =
            curso;

    }


    // ==================================================
    // INFORMACIÓN PRINCIPAL
    // ==================================================

    const studentNameMain =
        document.querySelector(
            ".student-info #student-name"
        );


    if (studentNameMain) {

        studentNameMain.textContent =
            nombreCompleto;

    }


    const courseNameMain =
        document.querySelector(
            ".student-info #course-name"
        );


    if (courseNameMain) {

        courseNameMain.textContent =
            curso;

    }


    // ==================================================
    // DESCRIPCIÓN
    // ESTA SÍ SE CALCULA CON GOOGLE SHEETS
    // ==================================================

    const descripcion =
        document.querySelector(
            ".student-info #descripcion-name"
        );


    if (
        descripcion &&
        estudianteNotas &&
        estudianteNotas.calificaciones
    ) {

        descripcion.textContent =
            generarDescripcion(
                estudianteNotas.calificaciones
            );

    }

}


// ======================================================
// CARGAR NOTAS
// ======================================================

function cargarNotas(estudianteNotas) {

    const trimestres = [

        "1er Trim.",
        "2do Trim.",
        "3er Trim."

    ];


    trimestres.forEach(
        (trim, index) => {

            const tbody =
                document.getElementById(
                    `grades-trim-${index + 1}`
                );


            if (!tbody) {
                return;
            }


            tbody.innerHTML = "";


            // ---------------------------------------
            // OBTENER LISTA
            // ---------------------------------------

            const lista =
                estudianteNotas
                    .calificaciones[trim] || [];


            // ---------------------------------------
            // NOTAS VÁLIDAS
            // ---------------------------------------

            const notasValidas =
                lista.filter(nota => {

                    return (

                        nota.calificacion !== "" &&

                        !isNaN(
                            Number(
                                nota.calificacion
                            )
                        )

                    );

                });


            // ---------------------------------------
            // SIN REGISTROS
            // ---------------------------------------

            if (notasValidas.length === 0) {

                tbody.innerHTML = `
                    <tr>
                        <td colspan="4"
                            style="
                                text-align:center;
                            ">
                            SIN REGISTROS
                        </td>
                    </tr>
                `;

                return;

            }


            // ---------------------------------------
            // BUSCAR REPROBADOS
            // ---------------------------------------

            const reprobados =
                notasValidas.filter(nota => {

                    return Number(
                        nota.calificacion
                    ) < 51;

                });


            // ---------------------------------------
            // NINGÚN REPROBADO
            // ---------------------------------------

            if (reprobados.length === 0) {

                tbody.innerHTML = `
                    <tr>
                        <td colspan="4"
                            style="
                                text-align:center;
                                font-weight:bold;
                                color:green;
                            ">
                            USTED NO TIENE ÁREAS REPROBADAS
                        </td>
                    </tr>
                `;

                return;

            }


            // ---------------------------------------
            // MOSTRAR SOLO REPROBADOS
            // ---------------------------------------

            reprobados.forEach(nota => {

                const fila =
                    document.createElement("tr");


                const calificacion =
                    Number(
                        nota.calificacion
                    );


                fila.innerHTML = `

                    <td>
                        ${nota.area || "-"}
                    </td>

                    <td>
                        ${calificacion}
                    </td>

                    <td style="
                        color:red;
                        font-weight:bold;
                    ">
                        ${obtenerEstado(
                            calificacion
                        )}
                    </td>

                    <td>
                        ${nota.observacion || "-"}
                    </td>

                `;


                tbody.appendChild(fila);

            });

        }
    );

}


// ======================================================
// MOSTRAR ERROR EN LAS TABLAS
// ======================================================

function mostrarTablasSinDatos(mensaje) {

    ["1", "2", "3"].forEach(num => {

        const tbody =
            document.getElementById(
                `grades-trim-${num}`
            );


        if (!tbody) {
            return;
        }


        tbody.innerHTML = `
            <tr>
                <td colspan="4"
                    style="
                        text-align:center;
                        font-weight:bold;
                    ">
                    ${mensaje}
                </td>
            </tr>
        `;

    });

}


// ======================================================
// PDF
// ======================================================

function verLibreta() {

    const estudiante =
        JSON.parse(
            localStorage.getItem("estudiante")
        );


    if (!estudiante) {

        alert(
            "No hay sesión activa"
        );

        return;

    }


    document.getElementById(
        "visorLibreta"
    ).src =
        `libretas/${estudiante.ci}.pdf`;

}


// ======================================================
// DESCARGAR LIBRETA
// ======================================================

function descargarLibreta() {

    const estudiante =
        JSON.parse(
            localStorage.getItem("estudiante")
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
        `libretas/${estudiante.ci}.pdf`;


    link.download =
        `${estudiante.ci}.pdf`;


    link.click();

}


// ======================================================
// CERRAR SESIÓN
// ======================================================

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
