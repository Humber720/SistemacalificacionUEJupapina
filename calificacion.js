// ===============================
// CARGAR DATOS DEL ESTUDIANTE Y VALIDAR SESIÓN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("estudiante"));

    if (!data) {
        window.location.href = "lateral.html";
        return;
    }

    const nombreCompleto = data.nombre + " " + data.apellido;

    document.getElementById("student-name-main").textContent = nombreCompleto;
    document.getElementById("course-name-main").textContent = data.curso;

    cargarNotas(data);
});

// ===============================
// BASE DE DATOS (SIN CALIFICACIÓN)
// ===============================
const estudiantesNotas = {
    // 1ro de Secundaria
    "15048000": { // APAZA QUISPE DANIELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "38", autoevaluacion: "", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15681353": { // CADENA GUZMAN REBECA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "49", autoevaluacion: "4", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15092130": { // CALLIZAYA MAMANI LUCIO IVAN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "58", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16923751": { // CALLIZAYA MAMANI MAYRA LIZETH
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "62", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15969736": { // CARITA HUANCA LUZ MELANY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "78", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16681212": { // CHIPANA DIAZ MIA SKARLETH
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "80", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15087360": { // CHOQUE APAZA SADITH CIELO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "87", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13344413": { // CONDORI SOLIZ LEONARDO JOAQUIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "14", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15071381": { // FERRUFINO LIMA MIRANDA PRUDE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "82", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16010402": { // GUTIERREZ MAMANI NEYMAR DEYVIS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "76", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13393458": { // MAMANI APAZA NEYMAR URIEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "49", autoevaluacion: "", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15053161": { // MAMANI LOPEZ LIMBERT ANTHONY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "42", autoevaluacion: "", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14427065": { // MAMANI SEGALES WILLIAM ALEXANDER
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "79", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14303640": { // PACAJES ARGANDOÑA ANA GABRIELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "80", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14305340": { // POMA GUTIERREZ PAMELA ANGELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "81", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14305614": { // POMA GUTIERREZ RONALD ANGEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "80", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16386894": { // POMA QUISPE GENESIS ARACELI
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "77", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15970059": { // QUISPE MAMANI ASBEL JESUS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "21", autoevaluacion: "", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16956276": { // QUISPE PAUCARA GISEL SILAY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "60", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14849873": { // TICONA PAUCARA MAILEN YAMILETH
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "85", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    // 2do de Secundaria
    "15982427": { // ALANOCA RIOS YESICA VALENTINA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "84", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15047240": { // APAZA QUISPE BLANCA BEATRIZ
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "35", autoevaluacion: "", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16771291": { // AYALA RODRIGUEZ AIRAN JUAN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "68", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12671788": { // CALLIZAYA PAUCARA ALISON MAYTE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "87", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15436406": { // CANAVIRI ESPINOZA LUIS ANTONIO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "47", autoevaluacion: "5", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16202235": { // CEREZO ADUVIRI GIORGIO MORIS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "46", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15474617": { // CEREZO ADUVIRI SEBASTIAN DAVIDE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "28", autoevaluacion: "4", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16970170": { // CHAMBI GUTIERREZ FABIAN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "33", autoevaluacion: "5", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13087772": { // CHAVEZ LIMACHI SARA SCARLETT
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "56", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14006431": { // FLORES LOZA SALVADOR DEIVID
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "53", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13119552": { // LUNA MERLO LEONEL ALEXANDER
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "56", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15294040": { // MAMANI APAZA YERCO JHOEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "64", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16018425": { // MAMANI HUANCA YOSIMAR JHOEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "68", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16335842": { // MAMANI MARIN JHAEMY MARBEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "55", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16211614": { // MAMANI MENDOZA NAIZETH AYLIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "79", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14006685": { // MAMANI QUISPE DENIS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "25", autoevaluacion: "", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14949245": { // MENDOZA MAYSER RICARDO ANDRES
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "53", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15635453": { // PEREZ GUTIERREZ JOHAN ERLAN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "53", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13378621": { // PUSARI SARICORDIA ANA CELESTE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "43", autoevaluacion: "4", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14108002": { // QUISPE AMARU LIZETH LUNA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "39", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16361717": { // QUISPE CARRILLO ARACELI BRIANCA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "69", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16886497": { // QUISPE MAMANI CRISTIAN KEVIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "40", autoevaluacion: "5", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15969914": { // QUISPE MAMANI NEYMAR DIDYEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "21", autoevaluacion: "", observacion: "Completar hasta lunes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14974794": { // ZACARIAS YUJRA DAVID
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "56", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },

    // 3ro de Secundaria
    "15781711": { // ALI MAMANI ASCENCIO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "34", autoevaluacion: "5", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12454396": { // CALATAYUD YUJRA BRENDA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "67", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16906396": { // CHINO COYO GENESIS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "56", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14650991": { // CHOQUE APAZA ALEX WILDER
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "84", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12863798": { // CORINA QUISPE JUAN FERNANDO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "38", autoevaluacion: "5", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12894836": { // CUTIPA ESPEJO CRISTIAN ELVIS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "73", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12735760": { // ESPEJO ALANOCA KEYLA ALEIDIS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "80", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14007065": { // FLORES HUMEREZ JASIEL NOEMI
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "71", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14481933": { // FLORES VARGAS MIGUEL ANGEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "69", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15150735": { // GARCIA GARCIA GABRIEL KEVIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "68", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15377451": { // GONZALES ROSAS RICARDO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "65", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15467033": { // GUARACHI LIMACHI FABRICIO DANIEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "61", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13118786": { // GUARACHI MARTINEZ ZOEY SUMAYA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "72", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "17981853": { // IRAIPI MORALES FRANK REINALDO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "21", autoevaluacion: "4", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14678752": { // KENAPP FLORES JOSE DAVID
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "12", autoevaluacion: "4", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13119655": { // LUNA MERLO KEVIN PATRICIO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "48", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13053567": { // MAMANI HUANCA JHENNY YOSELIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "55", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15069633": { // MAYTA MAMANI JUAN RODRIGO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "45", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16188827": { // POMA QUISPE JULIAN NEYMAR
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "60", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16575605": { // QUISPE CARRILLO GUADALUPE TATIANA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "69", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14041113": { // QUISPE PAUCARA DRAKE NOLAND
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "74", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13491581": { // QUISPE QUISPE LEIDY FLORA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "83", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15432789": { // RAMIREZ VARGAS KEVIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "43", autoevaluacion: "5", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15466974": { // SANCHEZ PAUCARA EMILI CLARA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "68", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15453680": { // TAPIA SEJAS AARON JUSTINIANO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "90", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14007170": { // TICONA LIMA ANGELA MASHIEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "44", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15055926": { // VALVERDE SANCHEZ VICTOR FERNANDO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "38", autoevaluacion: "3", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13394025": { // YUJRA SIRPA DELIA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "87", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13393302": { // ZACARI PAUCARA LESLIE MAYLI
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "63", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14107325": { // ZAMBRANA OMONTE JOSE ANTONIO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "54", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },

    // 4to de Secundaria
    "15048549": { // MENDOZA MARCO ANTONIO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "67", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15404949": { // ARCE SOLIZ ROY DAVID
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "48", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15464131": { // ARTEAGA APAZA PRISCILA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "74", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15052589": { // AVILE ULLOA LUZ DAYANA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "68", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12864320": { // CHAMBI GUTIERREZ JUAN DE DIOS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "50", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "11089196": { // CHAMBI LUNA ANGELA MILAGROS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "48", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14974833": { // CONDORI MAMANI MAITE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "88", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14292261": { // CONTRERAS FLORES BRANDON GABRIEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "53", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12861699": { // CRUZ QUISPE BRYAN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "77", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14006569": { // FLORES LOZA JHONATAN DENNIS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "47", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15377402": { // GONZALES ROSAS JHAN CARLA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "58", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12541664": { // GUARACHI CARRILLO ALAN STYBEN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "50", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15474420": { // MAMANI CASTRO FRANKLIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "57", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15053118": { // MAMANI LOPEZ GUADALUPE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "67", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13393796": { // MAMANI MONTALVO MARIA ALICIA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "51", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13119900": { // MATIAS CALLISAYA JHOVANA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "72", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "00000000": { // QUISPE AMARU GENESIS CAMILA (SIN CI)
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "52", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15102057": { // QUISPE APAZA YASMIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "54", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15049860": { // QUISPE MAMANI ALEJANDRA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "55", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15479403": { // QUISPE QUISPE LUZ NAYELLY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "56", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15054000": { // ROQUE MENDOZA RAQUEL WARA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "69", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13966969": { // SILLERICO FERNANDEZ SHODIN ALWA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "75", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15447429": { // TORREZ ROJAS ZEYLA JHANELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "85", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12668648": { // TOVAR BOLIVAR ANGELES ARACELY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "45", autoevaluacion: "3", observacion: "Completar hasta Miercoles" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    // 5to de Secundaria
    "15433023": { // CANAVIRI ESPINOZA DEIVID MANUEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "50", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14643788": { // CASAS RAMOS LISED
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "72", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16229387": { // CHINO COYO LAURA NOELIA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "74", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12861693": { // CHOQUE CUTIPA CAMILA EDURNE
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "67", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14537581": { // COARITE CHAMBILLA JOEL MANUEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "53", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13121449": { // ESCOBAR OMONTE CRISTOPHER MANUEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "61", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14005594": { // ESPEJO GUTIERREZ WARA ESTER
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "89", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13760384": { // FLORES VARGAS VAYOLETH KAEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "89", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "10938045": { // GUZMAN COHARITE JHAMIL EDGAR
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "54", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14645148": { // HINOJOSA QUISPE ANDREA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "64", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16263855": { // MAMANI LIMA CLARA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "55", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14644824": { // MAMANI MARIN JHORDY MARVIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "72", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15069646": { // MAYTA MAMANI NOEL FIDEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "46", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12803282": { // MICHEL SOTO DIETMAR RAYNARD
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "74", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14006584": { // PATZI CASTILLO MAYA ANGELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "89", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14006654": { // PATZI CASTILLO MAYA MAYRA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "90", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12864319": { // PAUCARA COSME YAIR ROGER
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "65", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14426906": { // PAUCARA ILLANES RIVER CRISTIAN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "48", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14108639": { // PEREZ POMA YERKO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "81", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "10078682": { // RAMIREZ MENDOZA MARIANELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "61", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15087156": { // ROQUE MENDOZA ARTURO ANDRES
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "49", autoevaluacion: "3", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15786673": { // VARGAS CHAMBILLA EDDY
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "61", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12734905": { // VARGAS MAMANI ANGELO WILLIAMS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "60", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
        "1234567": { // GAMARRA BROTON MALENA PIA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "49", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },

    //6to de Secundaria
    "13492936": { // ALVARADO CARVAJAL ALEXIS SANTIAGO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "52", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "11089147": { // CASTILLO FLORES YAMIL DEYMAR
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "40", autoevaluacion: "", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14879257": { // CHAMBI GUTIERREZ ANGEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "62", autoevaluacion: "", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13757364": { // CHOQUETARQUI ERGUETA MAYRA DANETZA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "54", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16515023": { // ESPEJO CHAVEZ YHENY KEILA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "87", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13280044": { // FERRANO MOLLO EDSON DIEGO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "40", autoevaluacion: "", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "8483392": { // HUALLPARA CRUZ FERNANDO ISRAEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "86", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "8484185": { // LOPEZ CACHI ANELIZ
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "63", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12960769": { // LUCANA LLANQUECHOQUE DIEGO LEONEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "74", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14007089": { // MENDOZA AMORAGA NATALIA LILIANA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "71", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "10921323": { // PAUCARA MAMANI ISRAEL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "26", autoevaluacion: "", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15377311": { // QUINO QUISBERT ANAHI
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "69", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14644329": { // QUISPE LIMACHI ELVIS PABLO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "44", autoevaluacion: "4", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15049845": { // QUISPE MAMANI MARIANA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "80", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12481018": { // QUISPE PAUCARA CLIVER ADEMAR
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "67", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14107870": { // QUISPE POMA DANNA MARICELA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "55", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14304279": { // QUISPE QUISPE DANER
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "52", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "14645393": { // RAMOS PAUCARA DELIA JHOSELIN
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "61", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15231181": { // REYES RIVEROS MUKTI RAMIRO
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "27", autoevaluacion: "5", observacion: "Completar hasta Martes" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15432390": { // SOLAR ALBA DEIVIS ALEXANDER
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "81", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13120783": { // SUXO CACERES ANA CAROLINA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "86", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "15056707": { // VALVERDE SANCHEZ NATALIA
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "91", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "16883042": { // VARGAS ROJAS SHARIE MILAGROS
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "89", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "13642808": { // VELASCO ULO JAZMINE ABIGAIL
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "49", autoevaluacion: "5", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
    "12961057": { // YARARI QUISPE ARIEL WILSON
        calificaciones: [
            { trimestre: "1er Trim.", puntaje: "56", autoevaluacion: "4", observacion: "" },
            { trimestre: "2do Trim.", puntaje: "", autoevaluacion: "", observacion: "" },
            { trimestre: "3er Trim.", puntaje: "", autoevaluacion: "", observacion: "" }
        ]
    },
};

// ===============================
// CARGAR NOTAS (AUTOMÁTICO)
// ===============================
function cargarNotas(data) {
    const tabla = document.getElementById("grades-table");
    if (!tabla) return;

    tabla.innerHTML = "";

    const notasEstudiante = estudiantesNotas[data.ci]?.calificaciones || [];

    let suma = 0;
    let contador = 0;

    notasEstudiante.forEach(nota => {

        const puntaje = nota.puntaje === "" ? "" : Number(nota.puntaje);
        const auto = nota.autoevaluacion === "" ? "" : Number(nota.autoevaluacion);

        // ✅ CALCULAR AUTOMÁTICO
        let calif = "";

        // 👉 Si hay ambos, suma
        if (puntaje !== "" && auto !== "") {
            calif = puntaje + auto;
        }
        // 👉 Si solo hay puntaje, usar puntaje
        else if (puntaje !== "") {
            calif = puntaje;
        }

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${nota.trimestre}</td>
            <td>${nota.puntaje || ""}</td>
            <td>${nota.autoevaluacion || ""}</td>
            <td class="${obtenerClaseEstado(calif)}">${calif}</td>
            <td class="${obtenerClaseEstado(calif)}">${obtenerEstado(calif)}</td>
            <td>${nota.observacion || ""}</td>
        `;
        tabla.appendChild(fila);

        // ✅ sumar solo si hay nota
        if (calif !== "" && !isNaN(calif)) {
            suma += calif;
            contador++;
        }
    });

    // ===============================
    // PROMEDIO
    // ===============================
    let promedio = "";
    let estadoFinal = "";

    if (contador > 0) {
        promedio = Math.round(suma / contador);
        estadoFinal = obtenerEstado(promedio);
    }

    const filaPromedio = document.createElement("tr");
    filaPromedio.innerHTML = `
        <td><strong>PROMEDIO</strong></td>
        <td>-</td>
        <td>-</td>
        <td class="${obtenerClaseEstado(promedio)}"><strong>${promedio}</strong></td>
        <td class="${obtenerClaseEstado(promedio)}"><strong>${estadoFinal}</strong></td>
        <td>-</td>
    `;
    tabla.appendChild(filaPromedio);
}

// ===============================
// ESTADO
// ===============================
function obtenerEstado(calificacion) {
    if (calificacion === "" || calificacion === null || isNaN(calificacion)) {
        return "";
    }
    return calificacion >= 51 ? "APROBADO(A)" : "REPROBADO(A)";
}

function obtenerClaseEstado(calificacion) {
    if (calificacion === "" || calificacion === null || isNaN(calificacion)) {
        return "";
    }
    return calificacion >= 51 ? "aprobado" : "reprobado";
}

// ===============================
// PDF
// ===============================
function verNota() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));
    if (!estudiante) return alert("No hay sesión activa");

    document.getElementById("visorPDF").src = `notas/${estudiante.ci}.pdf`;
}

function descargarNota() {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));
    if (!estudiante) return alert("No hay sesión activa");

    const link = document.createElement("a");
    link.href = `notas/${estudiante.ci}.pdf`;
    link.download = `${estudiante.ci}.pdf`;
    link.click();
}

// ===============================
// MENÚ
// ===============================
function toggleMenu() {
    const paginaActual = window.location.pathname;

    if (paginaActual.includes("lateral.html")) {
        window.history.back();
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
// ===============================
// BOTON PARA EXAMEN
// ===============================
// ================= BOTÓN MOSTRAR NOTA =================
document.getElementById("btnNota").addEventListener("click", function () {

    const estudiante = JSON.parse(localStorage.getItem("estudiante"));
    const modal = document.getElementById("modalNota");
    const resultado = document.getElementById("resultado");

    if (!estudiante) {
        resultado.innerHTML = "No hay sesión activa.";
        modal.style.display = "flex";
        return;
    }

    const ci = estudiante.ci;
    const datos = estudiantesNotas[ci];

    if (datos && datos.calificaciones.length > 0) {
        const examen = datos.calificaciones[0]; // 1er trimestre
        const puntaje = Number(examen.puntaje || 0);

        const estado = puntaje >= 51
            ? `<span class="aprobado">✔ Aprobado</span>`
            : `<span class="reprobado">❌ Reprobado</span>`;

        resultado.innerHTML = `
            <div class="modal-info">
                <h4>${estudiante.nombre} ${estudiante.apellido}</h4>
                <p>Puntaje: <strong>${puntaje}/100</strong></p>
                <p>${estado}</p>
            </div>
        `;
    } else {
        resultado.innerHTML = "No se encontró la nota.";
    }

    modal.style.display = "flex";
});


// ================= CERRAR MODAL =================
function cerrarModal() {
    document.getElementById("modalNota").style.display = "none";
}

// cerrar al tocar fuera
window.onclick = function(event) {
    const modal = document.getElementById("modalNota");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
