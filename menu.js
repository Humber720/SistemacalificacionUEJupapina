// 👇 VARIABLE GLOBAL (AQUÍ)
let navegacionInterna = false;
// ===============================
// VERIFICAR SESIÓN AL CARGAR PÁGINA (Previene volver atrás)
// ===============================
(function() {
    function verificarSesion() {
        const estudiante = localStorage.getItem("estudiante");
        const currentPage = window.location.pathname.split("/").pop();

        // Si no hay sesión y no estamos en index.html, redirige al login
        if (!estudiante && currentPage !== "index.html") {
            window.location.href = "index.html";
        }
    }

    // Ejecutar inmediatamente al cargar
    verificarSesion();

    // Ejecutar también cuando la página se vuelve visible (botón atrás en móviles)
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "visible") {
            verificarSesion();
        }
    });
})();

// ===============================
// BASE DE DATOS DE ESTUDIANTES
// ===============================
const estudiantes = {
    //1RO DE SECUNDARIA
    "1234567": { nombre: "HUMBERTO", apellido: "YUPANQUI CONDORI", curso: "1ro de Secundaria" },
    "15048000": { nombre: "DANIELA", apellido: "APAZA QUISPE", curso: "1ro de Secundaria" },
    "15681353": { nombre: "REBECA", apellido: "CADENA GUZMAN", curso: "1ro de Secundaria" },
    "15092130": { nombre: "LUCIO IVAN", apellido: "CALLIZAYA MAMANI", curso: "1ro de Secundaria" },
    "16923751": { nombre: "MAYRA LIZETH", apellido: "CALLIZAYA MAMANI", curso: "1ro de Secundaria" },
    "15969736": { nombre: "LUZ MELANY", apellido: "CARITA HUANCA", curso: "1ro de Secundaria" },
    "16681212": { nombre: "MIA SKARLETH", apellido: "CHIPANA DIAZ", curso: "1ro de Secundaria" },
    "15087360": { nombre: "SADITH CIELO", apellido: "CHOQUE APAZA", curso: "1ro de Secundaria" },
    "13344413": { nombre: "LEONARDO JOAQUIN", apellido: "CONDORI SOLIZ", curso: "1ro de Secundaria" },
    "15071381": { nombre: "PRUDE", apellido: "FERRUFINO LIMA MIRANDA", curso: "1ro de Secundaria" },
    "16010402": { nombre: "NEYMAR DEYVIS", apellido: "GUTIERREZ MAMANI", curso: "1ro de Secundaria" },
    "13393458": { nombre: "NEYMAR URIEL", apellido: "MAMANI APAZA", curso: "1ro de Secundaria" },
    "15053161": { nombre: "LIMBERT ANTHONY", apellido: "MAMANI LOPEZ", curso: "1ro de Secundaria" },
    "14427065": { nombre: "WILLIAM ALEXANDER", apellido: "MAMANI SEGALES", curso: "1ro de Secundaria" },
    "14303640": { nombre: "ANA GABRIELA", apellido: "PACAJES ARGANDOÑA", curso: "1ro de Secundaria" },
    "14305340": { nombre: "PAMELA ANGELA", apellido: "POMA GUTIERREZ", curso: "1ro de Secundaria" },
    "14305614": { nombre: "RONALD ANGEL", apellido: "POMA GUTIERREZ", curso: "1ro de Secundaria" },
    "16386894": { nombre: "GENESIS ARACELI", apellido: "POMA QUISPE", curso: "1ro de Secundaria" },
    "15970059": { nombre: "ASBEL JESUS", apellido: "QUISPE MAMANI", curso: "1ro de Secundaria" },
    "16956276": { nombre: "GISEL SILAY", apellido: "QUISPE PAUCARA", curso: "1ro de Secundaria" },
    "14849873": { nombre: "MAILEN YAMILETH", apellido: "TICONA PAUCARA", curso: "1ro de Secundaria" },

    //2DO DE SECUNDARIA}
    "15982427": { nombre: "YESICA VALENTINA", apellido: "ALANOCA RIOS", curso: "2do de Secundaria" },
    "15047240": { nombre: "BLANCA BEATRIZ", apellido: "APAZA QUISPE", curso: "2do de Secundaria" },
    "16771291": { nombre: "AIRAN JUAN", apellido: "AYALA RODRIGUEZ", curso: "2do de Secundaria" },
    "12671788": { nombre: "ALISON MAYTE", apellido: "CALLIZAYA PAUCARA", curso: "2do de Secundaria" },
    "15436406": { nombre: "LUIS ANTONIO", apellido: "CANAVIRI ESPINOZA", curso: "2do de Secundaria" },
    "16202235": { nombre: "GIORGIO MORIS", apellido: "CEREZO ADUVIRI", curso: "2do de Secundaria" },
    "15474617": { nombre: "SEBASTIAN DAVIDE", apellido: "CEREZO ADUVIRI", curso: "2do de Secundaria" },
    "16970170": { nombre: "FABIAN", apellido: "CHAMBI GUTIERREZ", curso: "2do de Secundaria" },
    "13087772": { nombre: "SARA SCARLETT", apellido: "CHAVEZ LIMACHI", curso: "2do de Secundaria" },
    "14006431": { nombre: "SALVADOR DEIVID", apellido: "FLORES LOZA", curso: "2do de Secundaria" },
    "13119552": { nombre: "LEONEL ALEXANDER", apellido: "LUNA MERLO", curso: "2do de Secundaria" },
    "15294040": { nombre: "YERCO JHOEL", apellido: "MAMANI APAZA", curso: "2do de Secundaria" },
    "16018425": { nombre: "YOSIMAR JHOEL", apellido: "MAMANI HUANCA", curso: "2do de Secundaria" },
    "16335842": { nombre: "JHAEMY MARBEL", apellido: "MAMANI MARIN", curso: "2do de Secundaria" },
    "16211614": { nombre: "NAIZETH AYLIN", apellido: "MAMANI MENDOZA", curso: "2do de Secundaria" },
    "14006685": { nombre: "DENIS", apellido: "MAMANI QUISPE", curso: "2do de Secundaria" },
    "14949245": { nombre: "RICARDO ANDRES", apellido: "MENDOZA MAYSER", curso: "2do de Secundaria" },
    "15635453": { nombre: "JOHAN ERLAN", apellido: "PEREZ GUTIERREZ", curso: "2do de Secundaria" },
    "13378621": { nombre: "ANA CELESTE", apellido: "PUSARI SARICORDIA", curso: "2do de Secundaria" },
    "14108002": { nombre: "LIZETH LUNA", apellido: "QUISPE AMARU", curso: "2do de Secundaria" },
    "16361717": { nombre: "ARACELI BRIANCA", apellido: "QUISPE CARRILLO", curso: "2do de Secundaria" },
    "16886497": { nombre: "CRISTIAN KEVIN", apellido: "QUISPE MAMANI", curso: "2do de Secundaria" },
    "15969914": { nombre: "NEYMAR DIDYEL", apellido: "QUISPE MAMANI", curso: "2do de Secundaria" },
    "14974794": { nombre: "DAVID", apellido: "ZACARIAS YUJRA", curso: "2do de Secundaria" },

    //3ro Secundaria
    "15781711": { nombre: "ASCENCIO", apellido: "ALI MAMANI", curso: "3ro de Secundaria" },
    "12454396": { nombre: "BRENDA MAYTE", apellido: "CALATAYUD YUJRA", curso: "3ro de Secundaria" },
    "16906396": { nombre: "GENESIS CECILIA", apellido: "CHINO COYO", curso: "3ro de Secundaria" },
    "14650991": { nombre: "ALEX WILDER", apellido: "CHOQUE APAZA", curso: "3ro de Secundaria" },
    "12863798": { nombre: "JUAN FERNANDO", apellido: "CORINA QUISPE", curso: "3ro de Secundaria" },
    "12894836": { nombre: "CRISTIAN ELVIS", apellido: "CUTIPA ESPEJO", curso: "3ro de Secundaria" },
    "12735760": { nombre: "KEYLA ALEIDIS", apellido: "ESPEJO ALANOCA", curso: "3ro de Secundaria" },
    "14007065": { nombre: "JASIEL NOEMI", apellido: "FLORES HUMEREZ", curso: "3ro de Secundaria" },
    "14481933": { nombre: "MIGUEL ANGEL", apellido: "FLORES VARGAS", curso: "3ro de Secundaria" },
    "15150735": { nombre: "GABRIEL KEVIN", apellido: "GARCIA GARCIA", curso: "3ro de Secundaria" },
    "15377451": { nombre: "RICARDO", apellido: "GONZALES ROSAS", curso: "3ro de Secundaria" },
    "15467033": { nombre: "FABRICIO DANIEL", apellido: "GUARACHI LIMACHI", curso: "3ro de Secundaria" },
    "13118786": { nombre: "ZOEY SUMAYA", apellido: "GUARACHI MARTINEZ", curso: "3ro de Secundaria" },
    "17981853": { nombre: "FRANK REINALDO", apellido: "IRAIPI MORALES", curso: "3ro de Secundaria" },
    "14678752": { nombre: "JOSE DAVID", apellido: "KENAPP FLORES", curso: "3ro de Secundaria" },
    "13119655": { nombre: "KEVIN PATRICIO", apellido: "LUNA MERLO", curso: "3ro de Secundaria" },
    "13053567": { nombre: "JHENNY YOSELIN", apellido: "MAMANI HUANCA", curso: "3ro de Secundaria" },
    "15069633": { nombre: "JUAN RODRIGO", apellido: "MAYTA MAMANI", curso: "3ro de Secundaria" },
    "16188827": { nombre: "JULIAN NEYMAR", apellido: "POMA QUISPE", curso: "3ro de Secundaria" },
    "16575605": { nombre: "GUADALUPE TATIANA", apellido: "QUISPE CARRILLO", curso: "3ro de Secundaria" },
    "14041113": { nombre: "DRAKE NOLAND", apellido: "QUISPE PAUCARA", curso: "3ro de Secundaria" },
    "13491581": { nombre: "LEIDY FLORA", apellido: "QUISPE QUISPE", curso: "3ro de Secundaria" },
    "15432789": { nombre: "KEVIN", apellido: "RAMIREZ VARGAS", curso: "3ro de Secundaria" },
    "15466974": { nombre: "EMILI CLARA", apellido: "SANCHEZ PAUCARA", curso: "3ro de Secundaria" },
    "15453680": { nombre: "AARON JUSTINIANO", apellido: "TAPIA SEJAS", curso: "3ro de Secundaria" },
    "14007170": { nombre: "ANGELA MASHIEL", apellido: "TICONA LIMA", curso: "3ro de Secundaria" },
    "15055926": { nombre: "VICTOR FERNANDO", apellido: "VALVERDE SANCHEZ", curso: "3ro de Secundaria" },
    "13394025": { nombre: "DELIA", apellido: "YUJRA SIRPA", curso: "3ro de Secundaria" },
    "13393302": { nombre: "LESLIE MAYLI", apellido: "ZACARI PAUCARA", curso: "3ro de Secundaria" },
    "14107325": { nombre: "JOSE ANTONIO", apellido: "ZAMBRANA OMONTE", curso: "3ro de Secundaria" },

    //4to de Secundaria
    "15048549": { nombre: "MARCO ANTONIO", apellido: "MENDOZA", curso: "4to de Secundaria" },
    "15404949": { nombre: "ROY DAVID", apellido: "ARCE SOLIZ", curso: "4to de Secundaria" },
    "15464131": { nombre: "PRISCILA", apellido: "ARTEAGA APAZA", curso: "4to de Secundaria" },
    "15052589": { nombre: "LUZ DAYANA", apellido: "AVILE ULLOA", curso: "4to de Secundaria" },
    "12864320": { nombre: "JUAN DE DIOS", apellido: "CHAMBI GUTIERREZ", curso: "4to de Secundaria" },
    "11089196": { nombre: "ANGELA MILAGROS", apellido: "CHAMBI LUNA", curso: "4to de Secundaria" },
    "14974833": { nombre: "MAITE", apellido: "CONDORI MAMANI", curso: "4to de Secundaria" },
    "14292261": { nombre: "BRANDON GABRIEL", apellido: "CONTRERAS FLORES", curso: "4to de Secundaria" },
    "12861699": { nombre: "BRYAN", apellido: "CRUZ QUISPE", curso: "4to de Secundaria" },
    "14006569": { nombre: "JHONATAN DENNIS", apellido: "FLORES LOZA", curso: "4to de Secundaria" },
    "15377402": { nombre: "JHAN CARLA", apellido: "GONZALES ROSAS", curso: "4to de Secundaria" },
    "12541664": { nombre: "ALAN STYBEN", apellido: "GUARACHI CARRILLO", curso: "4to de Secundaria" },
    "15474420": { nombre: "FRANKLIN", apellido: "MAMANI CASTRO", curso: "4to de Secundaria" },
    "15053118": { nombre: "GUADALUPE", apellido: "MAMANI LOPEZ", curso: "4to de Secundaria" },
    "13393796": { nombre: "MARIA ALICIA", apellido: "MAMANI MONTALVO", curso: "4to de Secundaria" },
    "13119900": { nombre: "JHOVANA", apellido: "MATIAS CALLISAYA", curso: "4to de Secundaria" },
    "00000000": { nombre: "GENESIS CAMILA", apellido: "QUISPE AMARU", curso: "4to de Secundaria" },
    "15102057": { nombre: "YASMIN", apellido: "QUISPE APAZA", curso: "4to de Secundaria" },
    "15049860": { nombre: "ALEJANDRA", apellido: "QUISPE MAMANI", curso: "4to de Secundaria" },
    "15479403": { nombre: "LUZ NAYELLY", apellido: "QUISPE QUISPE", curso: "4to de Secundaria" },
    "15054000": { nombre: "RAQUEL WARA", apellido: "ROQUE MENDOZA", curso: "4to de Secundaria" },
    "13966969": { nombre: "SHODIN ALWA", apellido: "SILLERICO FERNANDEZ", curso: "4to de Secundaria" },
    "15447429": { nombre: "ZEYLA JHANELA", apellido: "TORREZ ROJAS", curso: "4to de Secundaria" },
    "12668648": { nombre: "ANGELES ARACELY", apellido: "TOVAR BOLIVAR", curso: "4to de Secundaria" },

    //5to de Secundaria
    "15433023": { nombre: "DEIVID MANUEL", apellido: "CANAVIRI ESPINOZA", curso: "5to de Secundaria" },
    "14643788": { nombre: "LISED", apellido: "CASAS RAMOS", curso: "5to de Secundaria" },
    "16229387": { nombre: "LAURA NOELIA", apellido: "CHINO COYO", curso: "5to de Secundaria" },
    "12861693": { nombre: "CAMILA EDURNE", apellido: "CHOQUE CUTIPA", curso: "5to de Secundaria" },
    "14537581": { nombre: "JOEL MANUEL", apellido: "COARITE CHAMBILLA", curso: "5to de Secundaria" },
    "13121449": { nombre: "CRISTOPHER MANUEL", apellido: "ESCOBAR OMONTE", curso: "5to de Secundaria" },
    "14005594": { nombre: "WARA ESTER", apellido: "ESPEJO GUTIERREZ", curso: "5to de Secundaria" },
    "13760384": { nombre: "VAYOLETH KAEL", apellido: "FLORES VARGAS", curso: "5to de Secundaria" },
    "10938045": { nombre: "JHAMIL EDGAR", apellido: "GUZMAN COHARITE", curso: "5to de Secundaria" },
    "14645148": { nombre: "ANDREA", apellido: "HINOJOSA QUISPE", curso: "5to de Secundaria" },
    "16263855": { nombre: "CLARA", apellido: "MAMANI LIMA", curso: "5to de Secundaria" },
    "14644824": { nombre: "JHORDY MARVIN", apellido: "MAMANI MARIN", curso: "5to de Secundaria" },
    "15069646": { nombre: "NOEL FIDEL", apellido: "MAYTA MAMANI", curso: "5to de Secundaria" },
    "12803282": { nombre: "DIETMAR RAYNARD", apellido: "MICHEL SOTO", curso: "5to de Secundaria" },
    "14006584": { nombre: "MAYA ANGELA", apellido: "PATZI CASTILLO", curso: "5to de Secundaria" },
    "14006654": { nombre: "MAYA MAYRA", apellido: "PATZI CASTILLO", curso: "5to de Secundaria" },
    "12864319": { nombre: "YAIR ROGER", apellido: "PAUCARA COSME", curso: "5to de Secundaria" },
    "14426906": { nombre: "RIVER CRISTIAN", apellido: "PAUCARA ILLANES", curso: "5to de Secundaria" },
    "14108639": { nombre: "YERKO", apellido: "PEREZ POMA", curso: "5to de Secundaria" },
    "10078682": { nombre: "MARIANELA", apellido: "RAMIREZ MENDOZA", curso: "5to de Secundaria" },
    "15087156": { nombre: "ARTURO ANDRES", apellido: "ROQUE MENDOZA", curso: "5to de Secundaria" },
    "15786673": { nombre: "EDDY", apellido: "VARGAS CHAMBILLA", curso: "5to de Secundaria" },
    "12734905": { nombre: "ANGELO WILLIAMS", apellido: "VARGAS MAMANI", curso: "5to de Secundaria" },
    "1234567": { nombre: "MALENA PIA", apellido: "GAMARRA BROTON", curso: "5to de Secundaria" },

    //6to de Secundaria
    "13492936": { nombre: "ALEXIS SANTIAGO", apellido: "ALVARADO CARVAJAL", curso: "6to de Secundaria" },
    "11089147": { nombre: "YAMIL DEYMAR", apellido: "CASTILLO FLORES", curso: "6to de Secundaria" },
    "14879257": { nombre: "ANGEL", apellido: "CHAMBI GUTIERREZ", curso: "6to de Secundaria" },
    "13757364": { nombre: "MAYRA DANETZA", apellido: "CHOQUETARQUI ERGUETA", curso: "6to de Secundaria" },
    "16515023": { nombre: "YHENY KEILA", apellido: "ESPEJO CHAVEZ", curso: "6to de Secundaria" },
    "13280044": { nombre: "EDSON DIEGO", apellido: "FERRANO MOLLO", curso: "6to de Secundaria" },
    "8483392": { nombre: "FERNANDO ISRAEL", apellido: "HUALLPARA CRUZ", curso: "6to de Secundaria" },
    "8484185": { nombre: "ANELIZ", apellido: "LOPEZ CACHI", curso: "6to de Secundaria" },
    "12960769": { nombre: "DIEGO LEONEL", apellido: "LUCANA LLANQUECHOQUE", curso: "6to de Secundaria" },
    "14007089": { nombre: "NATALIA LILIANA", apellido: "MENDOZA AMORAGA", curso: "6to de Secundaria" },
    "10921323": { nombre: "ISRAEL", apellido: "PAUCARA MAMANI", curso: "6to de Secundaria" },
    "15377311": { nombre: "ANAHI", apellido: "QUINO QUISBERT", curso: "6to de Secundaria" },
    "14644329": { nombre: "ELVIS PABLO", apellido: "QUISPE LIMACHI", curso: "6to de Secundaria" },
    "15049845": { nombre: "MARIANA", apellido: "QUISPE MAMANI", curso: "6to de Secundaria" },
    "12481018": { nombre: "CLIVER ADEMAR", apellido: "QUISPE PAUCARA", curso: "6to de Secundaria" },
    "14107870": { nombre: "DANNA MARICELA", apellido: "QUISPE POMA", curso: "6to de Secundaria" },
    "14304279": { nombre: "DANER", apellido: "QUISPE QUISPE", curso: "6to de Secundaria" },
    "14645393": { nombre: "DELIA JHOSELIN", apellido: "RAMOS PAUCARA", curso: "6to de Secundaria" },
    "15231181": { nombre: "MUKTI RAMIRO", apellido: "REYES RIVEROS", curso: "6to de Secundaria" },
    "15432390": { nombre: "DEIVIS ALEXANDER", apellido: "SOLAR ALBA", curso: "6to de Secundaria" },
    "13120783": { nombre: "ANA CAROLINA", apellido: "SUXO CACERES", curso: "6to de Secundaria" },
    "15056707": { nombre: "NATALIA", apellido: "VALVERDE SANCHEZ", curso: "6to de Secundaria" },
    "16883042": { nombre: "SHARIE MILAGROS", apellido: "VARGAS ROJAS", curso: "6to de Secundaria" },
    "13642808": { nombre: "JAZMINE ABIGAIL", apellido: "VELASCO ULO", curso: "6to de Secundaria" },
    "12961057": { nombre: "ARIEL WILSON", apellido: "YARARI QUISPE", curso: "6to de Secundaria" },
};
// ===============================
// INICIALIZAR EVENTOS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    // 👇 LIMPIAR logout (IMPORTANTE)
    sessionStorage.removeItem("logout");

    // 👇 LIMPIAR FORMULARIO SI VIENE DEL HISTORIAL
    window.addEventListener("pageshow", function (event) {
        if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
            
            limpiarInputs(); // limpia contraseña
            limpiarMensaje(); // limpia mensaje

            const user = document.getElementById("username");
            if (user) user.value = "";
        }
    });
    // LOGIN FORM
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            login();
        });
    }
    // AUTOLOGIN (si ya inició sesión y está en index.html)
    const data = localStorage.getItem("estudiante");
    // Solo redirige si viene de navegación normal (no desde logout)
    if (data && window.location.pathname.includes("index.html")) {
        if (!sessionStorage.getItem("logout")) {
            window.location.href = "menu.html";
        }
    }

    // MOSTRAR DATOS SI HAY SESIÓN
    if (data) {
        mostrarPerfilHeader();
    }

    // DROPDOWN PERFIL
    const toggle = document.getElementById("dropdownToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.getElementById("dropdownMenu").classList.toggle("active");
        });
    }

});

// ===============================
// LOGIN
// ===============================
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    limpiarMensaje();

    if (!username || !password) return mostrarMensaje("Complete todos los campos", "red");
    if (!/^[0-9]+$/.test(username)) return mostrarMensaje("Solo números en el CI", "red");
    if (username !== password) return mostrarMensaje("El usuario y contraseña deben ser iguales", "red");

    const estudiante = estudiantes[username];
    if (!estudiante) return mostrarMensaje("CI no registrado", "red");

    // GUARDAR DATOS EN LOCALSTORAGE
    const datos = {
        ci: username,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        nombreCompleto: estudiante.nombre + " " + estudiante.apellido,
        curso: estudiante.curso
    };
    localStorage.setItem("estudiante", JSON.stringify(datos));

    mostrarMensaje("Ingreso correcto...", "green");

    setTimeout(() => window.location.href = "menu.html", 800);
}

// ===============================
// MOSTRAR PERFIL EN HEADER Y DROPDOWN
// ===============================
function mostrarPerfilHeader() {
    const data = JSON.parse(localStorage.getItem("estudiante"));
    if (!data) {
        if (!window.location.pathname.includes("index.html")) window.location.href = "index.html";
        return;
    }

    const nombreCompleto = data.nombre + " " + data.apellido;

    // PERFIL HEADER
    const studentName = document.getElementById("student-name");
    if (studentName) studentName.textContent = data.nombre;

    const nombreSpan = document.getElementById("nombreCompleto");
    if (nombreSpan) nombreSpan.textContent = nombreCompleto;

    const cursoHeader = document.getElementById("course-name");
    if (cursoHeader) cursoHeader.textContent = data.curso;

    // BIENVENIDA O CONTENIDO CENTRAL
    const nombrePrincipal = document.getElementById("nombrePrincipal");
    if (nombrePrincipal) nombrePrincipal.textContent = "Estudiante: " + nombreCompleto;

    const cursoPrincipal = document.getElementById("cursoPrincipal");
    if (cursoPrincipal) cursoPrincipal.textContent = data.curso;

    // EN CALIFICACION O OTRAS PÁGINAS CON OTROS ELEMENTOS
    const studentNameMain = document.getElementById("student-name-main");
    if (studentNameMain) studentNameMain.textContent = nombreCompleto;

    const courseNameMain = document.getElementById("course-name-main");
    if (courseNameMain) courseNameMain.textContent = data.curso;
}

// ===============================
// MENSAJES
// ===============================
function mostrarMensaje(texto, color) {
    const mensaje = document.getElementById("mensaje");
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.style.color = color;
    }
}
function limpiarMensaje() {
    const mensaje = document.getElementById("mensaje");
    if (mensaje) mensaje.textContent = "";
}

// ===============================
// LIMPIAR INPUTS
// ===============================
function limpiarInputs() {
    const password = document.getElementById("password");
    if (password) password.value = "";
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
// MOSTRAR / OCULTAR CONTRASEÑA
// ===============================
function togglePasswordVisibility() {
    const input = document.getElementById("password");
    const eyeOpen = document.getElementById("eyeOpen");
    const eyeClose = document.getElementById("eyeClose");

    if (input.type === "password") {
        input.type = "text";
        eyeOpen.style.display = "none";
        eyeClose.style.display = "inline";
    } else {
        input.type = "password";
        eyeOpen.style.display = "inline";
        eyeClose.style.display = "none";
    }
}

// ===============================
// SCROLL MENÚ
// ===============================
function scrollMenu(valor) {
    const menu = document.getElementById("menuScroll");
    if (menu) menu.scrollLeft += valor;
}

// ===============================
// CARRUSEL PUBLICIDAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".publicidad img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let index = 0;
    let interval = setInterval(showNext, 4000);

    function showSlide(n) {
        slides.forEach((img, i) => {
            img.classList.remove("active");
            if (i === n) img.classList.add("active");
        });
    }

    function showNext() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    function showPrev() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    nextBtn.addEventListener("click", () => {
        showNext();
        resetTimer();
    });

    prevBtn.addEventListener("click", () => {
        showPrev();
        resetTimer();
    });

    function resetTimer() {
        clearInterval(interval);
        interval = setInterval(showNext, 4000);
    }
});

// ===============================
// RESALTAR PÁGINA ACTIVA EN MENU
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#menuScroll a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("activo");
        } else {
            link.classList.remove("activo");
        }
    });
});
// ===============================
// MENÚ LATERAL (MÓVIL)
// ===============================
function toggleMenu() {

    const paginaActual = window.location.pathname;

    if (paginaActual.includes("lateral.html")) {
        const volver = localStorage.getItem("ultimaPagina") || "menu.html";
        window.location.href = volver;
    } else {
        localStorage.setItem("ultimaPagina", paginaActual);
        window.location.href = "lateral.html";
    }
}
//PARA SALIR CON TECLADO
// ===============================
// BLOQUEAR BOTÓN ATRÁS (MEJORADO)
// ===============================
(function () {

    const data = localStorage.getItem("estudiante");
    const currentPage = window.location.pathname.split("/").pop();

    // No aplicar en login ni lateral
    if (!data || currentPage === "index.html" || currentPage === "lateral.html") return;

    // 👇 IMPORTANTE: limpiar antes de agregar
    window.onpopstate = null;

    history.pushState(null, null, location.href);

    window.onpopstate = function () {

        const salir = confirm("¿Estás seguro que deseas salir del sistema?");

        if (salir) {
            localStorage.removeItem("estudiante");
            window.location.href = "index.html";
        } else {
            history.pushState(null, null, location.href);
        }
    };

})();
