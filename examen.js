// ================= DATOS SOLO NOTAS =================
const notasExamen = {
    // 1RO DE SECUNDARIA
    "15048000": { puntaje: 17 }, // DANIELA APAZA QUISPE
    "15681353": { puntaje: 31 }, // REBECA CADENA GUZMAN
    "15092130": { puntaje: 62 }, // LUCIO IVAN CALLIZAYA MAMANI
    "16923751": { puntaje: 40 }, // MAYRA LIZETH CALLIZAYA MAMANI
    "15969736": { puntaje: 31 }, // LUZ MELANY CARITA HUANCA
    "16681212": { puntaje: 27 }, // MIA SKARLETH CHIPANA DIAZ
    "15087360": { puntaje: 60 }, // SADITH CIELO CHOQUE APAZA
    "13344413": { puntaje: 0 }, // LEONARDO JOAQUIN CONDORI SOLIZ
    "15071381": { puntaje: 80 }, // PRUDE FERRUFINO LIMA MIRANDA
    "16010402": { puntaje: 45 }, // NEYMAR DEYVIS GUTIERREZ MAMANI
    "13393458": { puntaje: 37 }, // NEYMAR URIEL MAMANI APAZA
    "15053161": { puntaje: 50 }, // LIMBERT ANTHONY MAMANI LOPEZ
    "14427065": { puntaje: 20 }, // WILLIAM ALEXANDER MAMANI SEGALES
    "14303640": { puntaje: 38 }, // ANA GABRIELA PACAJES ARGANDOÑA
    "14305340": { puntaje: 30 }, // PAMELA ANGELA POMA GUTIERREZ
    "14305614": { puntaje: 27 }, // RONALD ANGEL POMA GUTIERREZ
    "16386894": { puntaje: 7 }, // GENESIS ARACELI POMA QUISPE
    "15970059": { puntaje: 0 }, // ASBEL JESUS QUISPE MAMANI
    "16956276": { puntaje: 40 }, // GISEL SILAY QUISPE PAUCARA
    "14849873": { puntaje: 51 },  // MAILEN YAMILETH TICONA PAUCARA
 // 2DO DE SECUNDARIA
    "15982427": { puntaje: 45 }, // YESICA VALENTINA ALANOCA RIOS
    "15047240": { puntaje: 20 }, // BLANCA BEATRIZ APAZA QUISPE
    "16771291": { puntaje: 19 }, // AIRAN JUAN AYALA RODRIGUEZ
    "12671788": { puntaje: 55 }, // ALISON MAYTE CALLIZAYA PAUCARA
    "15436406": { puntaje: 30 }, // LUIS ANTONIO CANAVIRI ESPINOZA
    "16202235": { puntaje: 55 }, // GIORGIO MORIS CEREZO ADUVIRI
    "15474617": { puntaje: 39 }, // SEBASTIAN DAVIDE CEREZO ADUVIRI
    "16970170": { puntaje: 9 }, // FABIAN CHAMBI GUTIERREZ
    "13087772": { puntaje: 20 }, // SARA SCARLETT CHAVEZ LIMACHI
    "14006431": { puntaje: 15 }, // SALVADOR DEIVID FLORES LOZA
    "13119552": { puntaje: 74 }, // LEONEL ALEXANDER LUNA MERLO
    "15294040": { puntaje: 70 }, // YERCO JHOEL MAMANI APAZA
    "16018425": { puntaje: 35 }, // YOSIMAR JHOEL MAMANI HUANCA
    "16335842": { puntaje: 1 }, // JHAEMY MARBEL MAMANI MARIN
    "16211614": { puntaje: 84 }, // NAIZETH AYLIN MAMANI MENDOZA
    "14006685": { puntaje: 0 }, // DENIS MAMANI QUISPE
    "14949245": { puntaje: 0 }, // RICARDO ANDRES MENDOZA MAYSER
    "15635453": { puntaje: 39 }, // JOHAN ERLAN PEREZ GUTIERREZ
    "13378621": { puntaje: 20 }, // ANA CELESTE PUSARI SARICORDIA
    "14108002": { puntaje: 20 }, // LIZETH LUNA QUISPE AMARU
    "16361717": { puntaje: 40 }, // ARACELI BRIANCA QUISPE CARRILLO
    "16886497": { puntaje: 1 }, // CRISTIAN KEVIN QUISPE MAMANI
    "15969914": { puntaje: 0 }, // NEYMAR DIDYEL QUISPE MAMANI
    "14974794": { puntaje: 39 },  // DAVID ZACARIAS YUJRA
 // 3RO DE SECUNDARIA
    "15781711": { puntaje: 0 }, // ASCENCIO ALI MAMANI
    "12454396": { puntaje: 0 }, // BRENDA MAYTE CALATAYUD YUJRA
    "16906396": { puntaje: 0 }, // GENESIS CECILIA CHINO COYO
    "14650991": { puntaje: 0 }, // ALEX WILDER CHOQUE APAZA
    "12863798": { puntaje: 0 }, // JUAN FERNANDO CORINA QUISPE
    "12894836": { puntaje: 0 }, // CRISTIAN ELVIS CUTIPA ESPEJO
    "12735760": { puntaje: 0 }, // KEYLA ALEIDIS ESPEJO ALANOCA
    "14007065": { puntaje: 0 }, // JASIEL NOEMI FLORES HUMEREZ
    "14481933": { puntaje: 0 }, // MIGUEL ANGEL FLORES VARGAS
    "15150735": { puntaje: 0 }, // GABRIEL KEVIN GARCIA GARCIA
    "15377451": { puntaje: 0 }, // RICARDO GONZALES ROSAS
    "15467033": { puntaje: 0 }, // FABRICIO DANIEL GUARACHI LIMACHI
    "13118786": { puntaje: 0 }, // ZOEY SUMAYA GUARACHI MARTINEZ
    "17981853": { puntaje: 0 }, // FRANK REINALDO IRAIPI MORALES
    "14678752": { puntaje: 0 }, // JOSE DAVID KENAPP FLORES
    "13119655": { puntaje: 0 }, // KEVIN PATRICIO LUNA MERLO
    "13053567": { puntaje: 0 }, // JHENNY YOSELIN MAMANI HUANCA
    "15069633": { puntaje: 0 }, // JUAN RODRIGO MAYTA MAMANI
    "16188827": { puntaje: 0 }, // JULIAN NEYMAR POMA QUISPE
    "16575605": { puntaje: 0 }, // GUADALUPE TATIANA QUISPE CARRILLO
    "14041113": { puntaje: 0 }, // DRAKE NOLAND QUISPE PAUCARA
    "13491581": { puntaje: 0 }, // LEIDY FLORA QUISPE QUISPE
    "15432789": { puntaje: 0 }, // KEVIN RAMIREZ VARGAS
    "15466974": { puntaje: 0 }, // EMILI CLARA SANCHEZ PAUCARA
    "15453680": { puntaje: 0 }, // AARON JUSTINIANO TAPIA SEJAS
    "14007170": { puntaje: 0 }, // ANGELA MASHIEL TICONA LIMA
    "15055926": { puntaje: 0 }, // VICTOR FERNANDO VALVERDE SANCHEZ
    "13394025": { puntaje: 0 }, // DELIA YUJRA SIRPA
    "13393302": { puntaje: 0 }, // LESLIE MAYLI ZACARI PAUCARA
    "14107325": { puntaje: 0 },  // JOSE ANTONIO ZAMBRANA OMONTE
 // 4TO DE SECUNDARIA
    "15048549": { puntaje: 81 }, // MARCO ANTONIO MENDOZA
    "15404949": { puntaje: 24 }, // ROY DAVID ARCE SOLIZ
    "15464131": { puntaje: 52 }, // PRISCILA ARTEAGA APAZA
    "15052589": { puntaje: 44 }, // LUZ DAYANA AVILE ULLOA
    "12864320": { puntaje: 48 }, // JUAN DE DIOS CHAMBI GUTIERREZ
    "11089196": { puntaje: 60 }, // ANGELA MILAGROS CHAMBI LUNA
    "14974833": { puntaje: 90 }, // MAITE CONDORI MAMANI
    "14292261": { puntaje: 81 }, // BRANDON GABRIEL CONTRERAS FLORES
    "12861699": { puntaje: 84 }, // BRYAN CRUZ QUISPE
    "14006569": { puntaje: 52 }, // JHONATAN DENNIS FLORES LOZA
    "15377402": { puntaje: 44 }, // JHAN CARLA GONZALES ROSAS
    "12541664": { puntaje: 56 }, // ALAN STYBEN GUARACHI CARRILLO
    "15474420": { puntaje: 51 }, // FRANKLIN MAMANI CASTRO
    "15053118": { puntaje: 58 }, // GUADALUPE MAMANI LOPEZ
    "13393796": { puntaje: 0 }, // MARIA ALICIA MAMANI MONTALVO
    "13119900": { puntaje: 82 }, // JHOVANA MATIAS CALLISAYA
    "00000000": { puntaje: 64 }, // GENESIS CAMILA QUISPE AMARU
    "15102057": { puntaje: 0 }, // YASMIN QUISPE APAZA
    "15049860": { puntaje: 61 }, // ALEJANDRA QUISPE MAMANI
    "15479403": { puntaje: 68 }, // LUZ NAYELLY QUISPE QUISPE
    "15054000": { puntaje: 90 }, // RAQUEL WARA ROQUE MENDOZA
    "13966969": { puntaje: 61 }, // SHODIN ALWA SILLERICO FERNANDEZ
    "15447429": { puntaje: 61 }, // ZEYLA JHANELA TORREZ ROJAS
    "12668648": { puntaje: 58 }, // ANGELES ARACELY TOVAR BOLIVAR
 // 5TO DE SECUNDARIA
    "15433023": { puntaje: 58 }, // DEIVID MANUEL CANAVIRI ESPINOZA
    "14643788": { puntaje: 45 }, // LISED CASAS RAMOS
    "16229387": { puntaje: 50 }, // LAURA NOELIA CHINO COYO
    "12861693": { puntaje: 55 }, // CAMILA EDURNE CHOQUE CUTIPA
    "14537581": { puntaje: 44 }, // JOEL MANUEL COARITE CHAMBILLA
    "13121449": { puntaje: 48 }, // CRISTOPHER MANUEL ESCOBAR OMONTE
    "14005594": { puntaje: 47 }, // WARA ESTER ESPEJO GUTIERREZ
    "13760384": { puntaje: 61 }, // VAYOLETH KAEL FLORES VARGAS
    "10938045": { puntaje: 49 }, // JHAMIL EDGAR GUZMAN COHARITE
    "14645148": { puntaje: 35 }, // ANDREA HINOJOSA QUISPE
    "16263855": { puntaje: 12 }, // CLARA MAMANI LIMA
    "14644824": { puntaje: 66 }, // JHORDY MARVIN MAMANI MARIN
    "15069646": { puntaje: 37 }, // NOEL FIDEL MAYTA MAMANI
    "12803282": { puntaje: 40 }, // DIETMAR RAYNARD MICHEL SOTO
    "14006584": { puntaje: 72 }, // MAYA ANGELA PATZI CASTILLO
    "14006654": { puntaje: 55 }, // MAYA MAYRA PATZI CASTILLO
    "12864319": { puntaje: 31 }, // YAIR ROGER PAUCARA COSME
    "14426906": { puntaje: 38 }, // RIVER CRISTIAN PAUCARA ILLANES
    "14108639": { puntaje: 58 }, // YERKO PEREZ POMA
    "10078682": { puntaje: 30 }, // MARIANELA RAMIREZ MENDOZA
    "15087156": { puntaje: 42 }, // ARTURO ANDRES ROQUE MENDOZA
    "15786673": { puntaje: 42 }, // EDDY VARGAS CHAMBILLA
    "12734905": { puntaje: 38 }, // ANGELO WILLIAMS VARGAS MAMANI
    "1234567": { puntaje: 48 },   // MALENA PIA GAMARRA BROTON
 // 6TO DE SECUNDARIA
    "13492936": { puntaje: 63 }, // ALEXIS SANTIAGO ALVARADO CARVAJAL
    "11089147": { puntaje: 43 }, // YAMIL DEYMAR CASTILLO FLORES
    "14879257": { puntaje: 73 }, // ANGEL CHAMBI GUTIERREZ
    "13757364": { puntaje: 73 }, // MAYRA DANETZA CHOQUETARQUI ERGUETA
    "16515023": { puntaje: 60 }, // YHENY KEILA ESPEJO CHAVEZ
    "13280044": { puntaje: 0 }, // EDSON DIEGO FERRANO MOLLO
    "8483392":  { puntaje: 48 }, // FERNANDO ISRAEL HUALLPARA CRUZ
    "8484185":  { puntaje: 100 }, // ANELIZ LOPEZ CACHI
    "12960769": { puntaje: 39 }, // DIEGO LEONEL LUCANA LLANQUECHOQUE
    "14007089": { puntaje: 83 }, // NATALIA LILIANA MENDOZA AMORAGA
    "10921323": { puntaje: 0 }, // ISRAEL PAUCARA MAMANI
    "15377311": { puntaje: 74 }, // ANAHI QUINO QUISBERT
    "14644329": { puntaje: 30 }, // ELVIS PABLO QUISPE LIMACHI
    "15049845": { puntaje: 68 }, // MARIANA QUISPE MAMANI
    "12481018": { puntaje: 58 }, // CLIVER ADEMAR QUISPE PAUCARA
    "14107870": { puntaje: 75 }, // DANNA MARICELA QUISPE POMA
    "14304279": { puntaje: 73 }, // DANER QUISPE QUISPE
    "14645393": { puntaje: 60 }, // DELIA JHOSELIN RAMOS PAUCARA
    "15231181": { puntaje: 46 }, // MUKTI RAMIRO REYES RIVEROS
    "15432390": { puntaje: 56 }, // DEIVIS ALEXANDER SOLAR ALBA
    "13120783": { puntaje: 71 }, // ANA CAROLINA SUXO CACERES
    "15056707": { puntaje: 96 }, // NATALIA VALVERDE SANCHEZ
    "16883042": { puntaje: 65 }, // SHARIE MILAGROS VARGAS ROJAS
    "13642808": { puntaje: 60 }, // JAZMINE ABIGAIL VELASCO ULO
    "12961057": { puntaje: 70 }  // ARIEL WILSON YARARI QUISPE
};


// ================= BOTÓN =================
document.getElementById("btnNota").addEventListener("click", function () {

    const data = JSON.parse(localStorage.getItem("estudiante"));
    const ci = data?.ci;

    const nombreCompleto = data
        ? data.nombre + " " + data.apellido
        : "Estudiante";

    const resultado = document.getElementById("resultado");
    const modal = document.getElementById("modalNota");

    if (notasExamen[ci]) {

        const puntaje = notasExamen[ci].puntaje;

        const estado = puntaje >= 51
            ? "<span style='color:green;'>✔ Aprobado</span>"
            : "<span style='color:red;'>❌ Reprobado</span>";

        resultado.innerHTML = `
            <strong>${nombreCompleto}</strong><br><br>
            Puntaje: <strong>${puntaje}/100</strong><br><br>
            ${estado}
        `;

    } else {
        resultado.innerHTML = `
            <strong>${nombreCompleto}</strong><br><br>
            No se encontró la nota.
        `;
    }

    modal.classList.add("activo");// 🔥 IMPORTANTE (antes era block)
});


// ================= CERRAR =================
function cerrarModal() {
    document.getElementById("modalNota").style.display = "none";
    document.getElementById("modalNota").classList.remove("activo");
}

window.onclick = function(event) {
    const modal = document.getElementById("modalNota");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
