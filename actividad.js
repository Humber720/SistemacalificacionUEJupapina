document.addEventListener("DOMContentLoaded", () => {
    const estudiante = JSON.parse(localStorage.getItem("estudiante"));

    if (!estudiante) return;

    const curso = estudiante.curso.toLowerCase();

    const mapaCursos = {
        "1ro": "primero",
        "2do": "segundo",
        "3ro": "tercero",
        "4to": "cuarto",
        "5to": "quinto",
        "6to": "sexto"
    };

    // Ocultar todo
    document.querySelectorAll(".curso-contenido")
        .forEach(e => e.style.display = "none");

    // Mostrar solo el curso correspondiente
    for (let key in mapaCursos) {
        if (curso.includes(key)) {
            document.querySelectorAll("." + mapaCursos[key])
                .forEach(e => e.style.display = "block");
        }
    }
});


