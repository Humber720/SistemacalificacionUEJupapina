// ===============================
// LIBRETA.JS - MOSTRAR NOTAS POR TRIMESTRE
// ===============================

// ===============================
// FUNCIÓN ESTADO
// ===============================
function obtenerEstado(calificacion) {
    return calificacion >= 51 ? "APROBADO(A)" : "REPROBADO(A)";
}

// ===============================
// FUNCIÓN AUTOMÁTICA DESCRIPCIÓN
// ===============================
function generarDescripcion(calificaciones) {
    let reprobadas = 0;

    Object.values(calificaciones).forEach(lista => {
        lista.forEach(nota => {
            if (nota.calificacion !== "" && nota.calificacion < 51) {
                reprobadas++;
            }
        });
    });

    if (reprobadas === 0) {
        return "Usted no tiene áreas reprobadas";
    } else if (reprobadas === 1) {
        return "Usted tiene 1 área reprobada";
    } else {
        return `Usted tiene ${reprobadas} áreas reprobadas`;
    }
}

// ===============================
// BASE DE DATOS
// ===============================
const estudiantesNotas = {
// ===============================
// 3ro de Secundaria
// ===============================
    "15781711": { // ALI MAMANI ASCENCIO
        calificaciones: {
            "1er Trim.": [
                { area: "COMUNICACIÓN Y LENGUAJES: CASTELLANA Y ORIGINARIA", calificacion: "40", observacion: "" }
            ],
            "2do Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "3er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ]
        }
    },
    "12454396": { // CALATAYUD YUJRA BRENDA
        calificaciones: {
            "1er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "2do Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "3er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ]
        }
    },
    "16906396": { // CHINO COYO GENESIS
        calificaciones: {
            "1er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "2do Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "3er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ]
        }
    },
    "14650991": { // CHOQUE APAZA ALEX WILDER
        calificaciones: {
            "1er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "2do Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "3er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ]
        }
    },
    "12863798": { // CORINA QUISPE JUAN FERNANDO
        calificaciones: {
            "1er Trim.": [
                { area: "COMUNICACIÓN Y LENGUAJES: CASTELLANA Y ORIGINARIA", calificacion: "40", observacion: "" },
                { area: "ARTES PLÁSTICAS Y VISUALES", calificacion: "47", observacion: "" },
                { area: "MATEMÁTICA", calificacion: "35", observacion: "" },
                { area: "TÉCNICA TECNOLOGICA ESPECIALIZADA", calificacion: "40", observacion: "" },
                { area: "CIENCIA NATURALES: BIOLOGÍA - GEOGRAFÍA", calificacion: "35", observacion: "" },
                { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "35", observacion: "" },
                { area: "CIENCIAS NATURALES: QUÍMICA", calificacion: "35", observacion: "" },
                { area: "COSMOVISIÓNES, FILOSFÍA Y SICOLOGÍA", calificacion: "40", observacion: "" },
                { area: "VALORES, ESPIRITUALIDADES Y RELIGIONES", calificacion: "48", observacion: "" }
            ],
            "2do Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "3er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ]
        }
    },
    "12894836": { // CRISTIAN ELVIS CUTIPA ESPEJO
        calificaciones: {
            "1er Trim.": [
                { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "48", observacion: "" }
            ],
            "2do Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ],
            "3er Trim.": [
                { area: "", calificacion: "", observacion: "" }
            ]
        }
    },

    "12735760": { // KEYLA ALEIDIS ESPEJO ALANOCA
        calificaciones: {
            "1er Trim.": [{ area: "MUSICA", calificacion: "45", observacion: "" },
                { area: "EFI", calificacion: "45", observacion: "" },
                { area: "RELIGIÓN", calificacion: "45", observacion: "" }
            ],

            "2do Trim.": [{ area: "LENGUAJE", calificacion: "50", observacion: "" }],
            "3er Trim.": [{ area: "COMPUTACIÓN", calificacion: "50", observacion: "" }]
        }
    },

    "14007065": { // JASIEL NOEMI FLORES HUMEREZ
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "14481933": { // MIGUEL ANGEL FLORES VARGAS
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "15150735": { // GABRIEL KEVIN GARCIA GARCIA
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "15377451": { // RICARDO GONZALES ROSAS
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "15467033": { // FABRICIO DANIEL GUARACHI LIMACHI
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "13118786": { // ZOEY SUMAYA GUARACHI MARTINEZ
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "17981853": { // FRANK REINALDO IRAIPI MORALES
        calificaciones: {
            "1er Trim.": [{ area: "COMUNICACIÓN Y LENGUAJES: CASTELLANA Y ORIGINARIA", calificacion: "40", observacion: "" },
                    { area: "EDUCACIÓN MUSICAL", calificacion: "46", observacion: "" },
                    { area: "MATEMÁTICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIA NATURALES: BIOLOGÍA - GEOGRAFÍA", calificacion: "35", observacion: "" },
                    { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIAS NATURALES: QUÍMICA", calificacion: "35", observacion: "" },
                    { area: "COSMOVISIÓNES, FILOSFÍA Y SICOLOGÍA", calificacion: "40", observacion: "" },
                    { area: "VALORES, ESPIRITUALIDADES Y RELIGIONES", calificacion: "46", observacion: "" }
            ],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },
    "14678752": { // KENAPP FLORES JOSE DAVID
        calificaciones: {
            "1er Trim.": [{ area: "COMUNICACIÓN Y LENGUAJES: CASTELLANA Y ORIGINARIA", calificacion: "40", observacion: "" },
                    { area: "LENGUA EXTRANJERA", calificacion: "46", observacion: "" },
                    { area: "EDUCACIÓN MUSICAL", calificacion: "41", observacion: "" },
                    { area: "MATEMÁTICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIA NATURALES: BIOLOGÍA - GEOGRAFÍA", calificacion: "40", observacion: "" },
                    { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIAS NATURALES: QUÍMICA", calificacion: "35", observacion: "" },
                    { area: "COSMOVISIÓNES, FILOSFÍA Y SICOLOGÍA", calificacion: "40", observacion: "" },
                    { area: "VALORES, ESPIRITUALIDADES Y RELIGIONES", calificacion: "47", observacion: "" }
            ],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },
    "13119655": { // KEVIN PATRICIO LUNA MERLO
        calificaciones: {
            "1er Trim.": [{ area: "CIENCIAS SOCIALES", calificacion: "43", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "13053567": { // JHENNY YOSELIN MAMANI HUANCA
        calificaciones: {
            "1er Trim.": [{ area: "MATEMÁTICA", calificacion: "42", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "15069633": { // JUAN RODRIGO MAYTA MAMANI
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "16188827": { // JULIAN NEYMAR POMA QUISPE
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "16575605": { // GUADALUPE TATIANA QUISPE CARRILLO
        calificaciones: {
            "1er Trim.": [{ area: "ARTES PLÁSTICAS Y VISUALES", calificacion: "49", observacion: "" },
                { area: "MATEMÁTICA", calificacion: "42", observacion: "" },
                { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "35", observacion: "" }
            ],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "14041113": { // DRAKE NOLAND QUISPE PAUCARA
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "13491581": { // LEIDY FLORA QUISPE QUISPE
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "15432789": { // KEVIN RAMIREZ VARGAS
        calificaciones: {
            "1er Trim.": [{ area: "COMUNICACIÓN Y LENGUAJES: CASTELLANA Y ORIGINARIA", calificacion: "40", observacion: "" },
                    { area: "LENGUA EXTRANJERA", calificacion: "48", observacion: "" },
                    { area: "CIENCIAS SOCIALES", calificacion: "43", observacion: "" },
                    { area: "MATEMÁTICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIA NATURALES: BIOLOGÍA - GEOGRAFÍA", calificacion: "43", observacion: "" },
                    { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIAS NATURALES: QUÍMICA", calificacion: "35", observacion: "" },
                    { area: "COSMOVISIÓNES, FILOSFÍA Y SICOLOGÍA", calificacion: "40", observacion: "" }
            ],     
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "15466974": { // EMILI CLARA SANCHEZ PAUCARA
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "15453680": { // AARON JUSTINIANO TAPIA SEJAS
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "14007170": { // ANGELA MASHIEL TICONA LIMA
        calificaciones: {
            "1er Trim.": [{ area: "COMUNICACIÓN Y LENGUAJES: CASTELLANA Y ORIGINARIA", calificacion: "40", observacion: "" },
                    { area: "MATEMÁTICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIA NATURALES: BIOLOGÍA - GEOGRAFÍA", calificacion: "40", observacion: "" },
                    { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIAS NATURALES: QUÍMICA", calificacion: "35", observacion: "" },
                    { area: "COSMOVISIÓNES, FILOSFÍA Y SICOLOGÍA", calificacion: "40", observacion: "" }
            ],    
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "15055926": { // VICTOR FERNANDO VALVERDE SANCHEZ
        calificaciones: {
            "1er Trim.": [{ area: "COMUNICACIÓN Y LENGUAJES: CASTELLANA Y ORIGINARIA", calificacion: "40", observacion: "" },
                    { area: "CIENCIAS SOCIALES", calificacion: "42", observacion: "" },
                    { area: "EDUCACIÓN MUSICAL", calificacion: "46", observacion: "" },
                    { area: "ARTES PLÁSTICAS Y VISUALES", calificacion: "49", observacion: "" },
                    { area: "MATEMÁTICA", calificacion: "35", observacion: "" },
                    { area: "CIENCIA NATURALES: BIOLOGÍA - GEOGRAFÍA", calificacion: "40", observacion: "" },
                    { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "41", observacion: "" },
                    { area: "CIENCIAS NATURALES: QUÍMICA", calificacion: "41", observacion: "" },
                    { area: "COSMOVISIÓNES, FILOSFÍA Y SICOLOGÍA", calificacion: "40", observacion: "" },
                    { area: "VALORES, ESPIRITUALIDADES Y RELIGIONES", calificacion: "46", observacion: "" }
            ],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "13394025": { // DELIA YUJRA SIRPA
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "13393302": { // LESLIE MAYLI ZACARI PAUCARA
        calificaciones: {
            "1er Trim.": [{ area: "COMUNICACIÓN Y LENGUAJES: CASTELLANA Y ORIGINARIA", calificacion: "40", observacion: "" },
                 { area: "MATEMÁTICA", calificacion: "35", observacion: "" },
                  { area: "CIENCIAS NATURALES: FÍSICA", calificacion: "35", observacion: "" }
            ],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },

    "14107325": { // JOSE ANTONIO ZAMBRANA OMONTE
        calificaciones: {
            "1er Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "2do Trim.": [{ area: "", calificacion: "", observacion: "" }],
            "3er Trim.": [{ area: "", calificacion: "", observacion: "" }]
        }
    },
    // 👉 puedes seguir agregando todos igual...
};

// ===============================
// INICIO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("estudiante"));

    if (!data) {
        window.location.href = "lateral.html";
        return;
    }

    const CI = data.ci;
    const estudiante = estudiantesNotas[CI];

    // ===============================
    // VALIDAR CURSO
    // ===============================
    if (data.curso !== "3ro de Secundaria") {

        mostrarPerfil(data, {});

        ["1","2","3"].forEach(num => {
            const tbody = document.getElementById(`grades-trim-${num}`);
            if (!tbody) return;

            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center; font-weight:bold; color:red;">
                        SOLO PARA 3ro de Secundaria (Asesor Prof. Humberto)
                    </td>
                </tr>
            `;
        });

        return;
    }

    // ===============================
    // VALIDAR ESTUDIANTE
    // ===============================
    if (!estudiante) {
        alert("Estudiante no encontrado");
        return;
    }

    mostrarPerfil(data, estudiante);
    cargarNotas(estudiante);
});

// ===============================
// MOSTRAR PERFIL
// ===============================
function mostrarPerfil(data, estudianteNotas) {
    const nombreCompleto = data.nombre + " " + data.apellido;

    // HEADER
    const studentName = document.getElementById("student-name");
    if (studentName) studentName.textContent = data.nombre;

    const nombreSpan = document.getElementById("nombreCompleto");
    if (nombreSpan) nombreSpan.textContent = nombreCompleto;

    const cursoHeader = document.getElementById("course-name");
    if (cursoHeader) cursoHeader.textContent = data.curso;

    // INFO
    const studentNameMain = document.querySelector(".student-info #student-name");
    if (studentNameMain) studentNameMain.textContent = nombreCompleto;

    const courseNameMain = document.querySelector(".student-info #course-name");
    if (courseNameMain) courseNameMain.textContent = data.curso;

    const descripcion = document.querySelector(".student-info #descripcion-name");

    if (descripcion && estudianteNotas.calificaciones) {
        descripcion.textContent = generarDescripcion(estudianteNotas.calificaciones);
    }
}

// ===============================
// CARGAR NOTAS
// ===============================
function cargarNotas(estudianteNotas) {
    const trimestres = ["1er Trim.", "2do Trim.", "3er Trim."];

    trimestres.forEach((trim, index) => {
        const tbody = document.getElementById(`grades-trim-${index+1}`);
        if (!tbody) return;

        tbody.innerHTML = "";

        const lista = estudianteNotas.calificaciones[trim] || [];

        // ✅ SOLO NOTAS VÁLIDAS
        const notasValidas = lista.filter(n => n.calificacion !== "");

        // ✅ SOLO REPROBADOS
        const reprobados = notasValidas.filter(n => n.calificacion < 51);

        // 🔴 SI NO HAY DATOS
        if (notasValidas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">
                        SIN REGISTROS
                    </td>
                </tr>
            `;
            return;
        }

        // 🟢 SI NO HAY REPROBADOS
        if (reprobados.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center; font-weight:bold; color:green;">
                        USTED NO TIENE ÁREAS REPROBADAS
                    </td>
                </tr>
            `;
            return;
        }

        // 🔴 MOSTRAR SOLO REPROBADOS
        reprobados.forEach(nota => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${nota.area}</td>
                <td>${nota.calificacion}</td>
                <td style="color:red; font-weight:bold;">
                    REPROBADO(A)
                </td>
                <td>${nota.observacion || "-"}</td>
            `;

            tbody.appendChild(fila);
        });
    });
}

// ===============================
// PDF
// ===============================
function verLibreta() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) {
        alert("No hay sesión activa");
        return;
    }

    document.getElementById("visorLibreta").src = `libretas/${estudiante.ci}.pdf`;
}

function descargarLibreta() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) {
        alert("No hay sesión activa");
        return;
    }

    const link = document.createElement("a");
    link.href = `libretas/${estudiante.ci}.pdf`;
    link.download = `${estudiante.ci}.pdf`;
    link.click();
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
