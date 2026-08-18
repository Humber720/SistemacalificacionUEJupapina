// =====================================================
// AUTOEVALUACIÓN - INTEGRACIÓN CON LA PLATAFORMA
// =====================================================


// =====================================================
// CONFIGURACIÓN
// =====================================================

const URL_AUTOEVALUACION =
"https://script.google.com/macros/s/AKfycbzT7zLYaB6IpwFAbMHf0_eqyCVKBY7-Q1sjBsEr70rDjJ8bA9_PAp1oOYUv1V0XX0o/exec";


// =====================================================
// ABRIR VENTANA CI
// =====================================================

function abrirVentanaCI() {

  const modal =
    document.getElementById("modalCI");

  const input =
    document.getElementById("ciEstudiante");

  const mensaje =
    document.getElementById("mensajeCI");


  if (!modal) return;


  // Limpiar mensaje

  if (mensaje) {

    mensaje.textContent = "";
    mensaje.style.color = "";

  }


  // ===================================================
  // OBTENER ESTUDIANTE DESDE LA PLATAFORMA
  // ===================================================

  let estudiante = null;


  try {

    const datosGuardados =
      localStorage.getItem("estudiante");


    if (datosGuardados) {

      estudiante =
        JSON.parse(datosGuardados);

    }

  }

  catch (error) {

    console.error(
      "Error leyendo estudiante:",
      error
    );

  }


  // ===================================================
  // BUSCAR CI EN LOS DATOS GUARDADOS
  // ===================================================

  let ci = "";


  if (estudiante) {

    ci =
      estudiante.ci ||
      estudiante.CI ||
      estudiante.carnet ||
      estudiante.usuario ||
      "";

  }


  // ===================================================
  // SI menu.js GUARDA EL CI DIRECTAMENTE
  // ===================================================

  if (!ci) {

    ci =
      localStorage.getItem("ci") ||
      localStorage.getItem("CI") ||
      localStorage.getItem("carnet") ||
      "";

  }


  // ===================================================
  // MOSTRAR CI
  // ===================================================

  if (input) {

    input.value =
      String(ci).trim();

  }


  // ===================================================
  // MOSTRAR VENTANA
  // ===================================================

  modal.style.display = "flex";

}


// =====================================================
// CERRAR VENTANA CI
// =====================================================

function cerrarVentanaCI() {

  const modal =
    document.getElementById("modalCI");


  if (modal) {

    modal.style.display = "none";

  }

}


// =====================================================
// BUSCAR / VERIFICAR CI
// =====================================================

async function buscarCI() {

  const input =
    document.getElementById("ciEstudiante");

  const mensaje =
    document.getElementById("mensajeCI");


  if (!input || !mensaje) return;


  const ci =
    input.value.trim();


  // ===================================================
  // VALIDAR CI
  // ===================================================

  if (!ci) {

    mensaje.textContent =
      "⚠️ No se pudo identificar el CI del estudiante.";

    mensaje.style.color =
      "#e74c3c";

    return;

  }


  // ===================================================
  // MOSTRAR CARGANDO
  // ===================================================

  mensaje.textContent =
    "🔎 Verificando estudiante...";

  mensaje.style.color =
    "#3498db";


  try {


    // =================================================
    // CONSULTAR GOOGLE SHEETS
    // =================================================

    const respuesta =
      await fetch(
        URL_AUTOEVALUACION +
        "?accion=buscar&ci=" +
        encodeURIComponent(ci)
      );


    if (!respuesta.ok) {

      throw new Error(
        "Error HTTP: " +
        respuesta.status
      );

    }


    const datos =
      await respuesta.json();


    console.log(
      "Respuesta Autoevaluación:",
      datos
    );


    // =================================================
    // ESTUDIANTE NO ENCONTRADO
    // =================================================

    if (
      !datos ||
      datos.encontrado === false ||
      datos.error
    ) {

      mensaje.textContent =
        "❌ CI no encontrado.";

      mensaje.style.color =
        "#e74c3c";

      return;

    }


    // =================================================
    // ESTUDIANTE ENCONTRADO
    // =================================================

    mensaje.textContent =
      "✅ Estudiante verificado correctamente.";

    mensaje.style.color =
      "#27ae60";


    // =================================================
    // OBTENER DATOS DE GOOGLE SHEETS
    // =================================================

    const ciEncontrado =
      datos.ci || ci;


    const nombreEncontrado =
      datos.nombre || "";


    const cursoEncontrado =
      datos.curso || "";

    // =================================================
    // VERIFICAR SI YA REALIZÓ LA AUTOEVALUACIÓN
    // =================================================

    if (datos.yaRespondio === true) {

      mensaje.textContent =
        "⚠️ Este estudiante ya realizó la autoevaluación.";

      mensaje.style.color =
        "#e67e22";

      return;

    }

    console.log(
      "CI encontrado:",
      ciEncontrado
    );

    console.log(
      "Nombre encontrado:",
      nombreEncontrado
    );

    console.log(
      "Curso encontrado:",
      cursoEncontrado
    );


    // =================================================
    // GUARDAR CI
    // =================================================

    localStorage.setItem(
      "autoevaluacionCI",
      String(ciEncontrado)
    );


    // =================================================
    // GUARDAR ESTUDIANTE COMPLETO
    // =================================================

    localStorage.setItem(
      "autoevaluacionEstudiante",
      JSON.stringify({

        ci:
          ciEncontrado,

        nombre:
          nombreEncontrado,

        curso:
          cursoEncontrado

      })
    );


    // =================================================
    // ABRIR AUTOEVALUACIÓN
    // =================================================

    setTimeout(
      function () {

        cerrarVentanaCI();

        abrirAutoevaluacion(
          ciEncontrado,
          nombreEncontrado,
          cursoEncontrado
        );

      },
      500
    );


  }

  catch (error) {

    console.error(
      "Error verificando CI:",
      error
    );


    mensaje.textContent =
      "❌ No se pudo conectar con el servidor.";

    mensaje.style.color =
      "#e74c3c";

  }

}


// =====================================================
// ABRIR AUTOEVALUACIÓN
// =====================================================
// AQUÍ SE ENVÍAN CI + NOMBRE + CURSO
// AL ARCHIVO autoevaluacion.html
// =====================================================

function abrirAutoevaluacion(
  ci,
  nombre,
  curso
) {

  const modal =
    document.getElementById(
      "modalAutoevaluacion"
    );


  const iframe =
    document.getElementById(
      "iframeAutoevaluacion"
    );


  if (!modal || !iframe) return;


  // ===================================================
  // ASEGURAR QUE LOS DATOS EXISTAN
  // ===================================================

  ci =
    String(ci || "").trim();


  nombre =
    String(nombre || "").trim();


  curso =
    String(curso || "").trim();


  // ===================================================
  // CREAR PARÁMETROS
  // ===================================================

  const parametros =
    new URLSearchParams();


  parametros.set(
    "ci",
    ci
  );


  parametros.set(
    "nombre",
    nombre
  );


  parametros.set(
    "curso",
    curso
  );


  // ===================================================
  // CREAR URL DEL FORMULARIO
  // ===================================================

  const urlFormulario =
    "autoevaluacion.html?" +
    parametros.toString();


  console.log(
    "URL formulario:",
    urlFormulario
  );


  // ===================================================
  // ABRIR FORMULARIO
  // ===================================================

  iframe.src =
    urlFormulario;


  modal.style.display =
    "flex";

}


// =====================================================
// CERRAR AUTOEVALUACIÓN
// =====================================================

function cerrarAutoevaluacion() {

  const modal =
    document.getElementById(
      "modalAutoevaluacion"
    );


  const iframe =
    document.getElementById(
      "iframeAutoevaluacion"
    );


  if (modal) {

    modal.style.display =
      "none";

  }


  // Limpiar iframe

  if (iframe) {

    iframe.src = "";

  }

}


// =====================================================
// CERRAR MODAL AL HACER CLIC AFUERA
// =====================================================

window.addEventListener(
  "click",
  function (event) {

    const modal =
      document.getElementById(
        "modalCI"
      );


    if (
      modal &&
      event.target === modal
    ) {

      cerrarVentanaCI();

    }

  }
);

// =====================================================
// AUTOEVALUACIONES.JS
// CARGAR CI, NOMBRE Y CURSO
// =====================================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    // =================================================
    // LEER DATOS RECIBIDOS EN LA URL
    // =================================================

    const parametros =
      new URLSearchParams(
        window.location.search
      );


    const ci =
      parametros.get("ci") || "";


    const nombre =
      parametros.get("nombre") || "";


    const curso =
      parametros.get("curso") || "";


    // =================================================
    // CAMPOS DEL FORMULARIO
    // =================================================

    const campoCI =
      document.getElementById("ci");


    const campoNombre =
      document.getElementById("nombre");


    const campoCurso =
      document.getElementById("curso");


    // =================================================
    // COLOCAR CI
    // =================================================

    if (campoCI) {

      campoCI.value =
        ci;

    }


    // =================================================
    // COLOCAR NOMBRE
    // =================================================

    if (campoNombre) {

      campoNombre.value =
        nombre;

    }


    // =================================================
    // COLOCAR CURSO
    // =================================================

    if (campoCurso) {

      campoCurso.value =
        curso;

    }


    // =================================================
    // COMPROBACIÓN
    // =================================================

    console.log(
      "=================================="
    );

    console.log(
      "DATOS DEL ESTUDIANTE"
    );

    console.log(
      "CI:",
      ci
    );

    console.log(
      "NOMBRE:",
      nombre
    );

    console.log(
      "CURSO:",
      curso
    );

    console.log(
      "=================================="
    );

  }
);
// =====================================================
// ENVIAR AUTOEVALUACIÓN
// =====================================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const formulario =
      document.getElementById("formulario");

    if (!formulario) return;


    formulario.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        // =================================================
        // CAMPOS
        // =================================================

        const ci =
          document.getElementById("ci")?.value.trim() || "";

        const nombre =
          document.getElementById("nombre")?.value.trim() || "";

        const curso =
          document.getElementById("curso")?.value.trim() || "";


        // =================================================
        // OBTENER RESPUESTAS
        // =================================================

        const p1 =
          document.querySelector(
            'input[name="p1"]:checked'
          )?.value;

        const p2 =
          document.querySelector(
            'input[name="p2"]:checked'
          )?.value;

        const p3 =
          document.querySelector(
            'input[name="p3"]:checked'
          )?.value;

        const p4 =
          document.querySelector(
            'input[name="p4"]:checked'
          )?.value;

        const p5 =
          document.querySelector(
            'input[name="p5"]:checked'
          )?.value;


        // =================================================
        // VALIDAR
        // =================================================

        if (
          !ci ||
          !nombre ||
          !curso
        ) {

          alert(
            "No se encontraron los datos del estudiante."
          );

          return;

        }


        if (
          p1 === undefined ||
          p2 === undefined ||
          p3 === undefined ||
          p4 === undefined ||
          p5 === undefined
        ) {

          alert(
            "Debe responder todas las preguntas."
          );

          return;

        }


        // =================================================
        // BOTÓN
        // =================================================

        const boton =
          document.getElementById("btnEnviar");

        const spinner =
          document.getElementById("spinner");


        if (boton) {

          boton.disabled = true;

          boton.textContent =
            "Guardando...";

        }


        if (spinner) {

          spinner.style.display =
            "inline-block";

        }


        try {


          // ===============================================
          // PREPARAR DATOS
          // ===============================================

          const datos = {

            ci: ci,

            nombre: nombre,

            curso: curso,

            p1: p1,

            p2: p2,

            p3: p3,

            p4: p4,

            p5: p5

          };


          console.log(
            "Enviando autoevaluación:",
            datos
          );


          // ===============================================
          // ENVIAR A APPS SCRIPT
          // ===============================================

          const parametros =
            new URLSearchParams();


          parametros.append(
            "ci",
            ci
          );

          parametros.append(
            "nombre",
            nombre
          );

          parametros.append(
            "curso",
            curso
          );

          parametros.append(
            "p1",
            p1
          );

          parametros.append(
            "p2",
            p2
          );

          parametros.append(
            "p3",
            p3
          );

          parametros.append(
            "p4",
            p4
          );

          parametros.append(
            "p5",
            p5
          );


          const respuesta =
            await fetch(
              URL_AUTOEVALUACION,
              {

                method: "POST",

                body: parametros

              }
            );


          if (!respuesta.ok) {

            throw new Error(
              "Error HTTP: " +
              respuesta.status
            );

          }


          const resultado =
            await respuesta.json();


          console.log(
            "Respuesta servidor:",
            resultado
          );


          // ===============================================
          // YA RESPONDIÓ
          // ===============================================

          if (
            resultado.yaRespondio === true &&
            resultado.guardado === false
          ) {

            mostrarModalResultado(
              resultado.mensaje ||
              "Este estudiante ya realizó la autoevaluación.",
              null
            );

            return;

          }


          // ===============================================
          // ERROR
          // ===============================================

          if (
            resultado.ok !== true ||
            resultado.guardado !== true
          ) {

            throw new Error(
              resultado.mensaje ||
              "No se pudo guardar la autoevaluación."
            );

          }


          // ===============================================
          // ÉXITO
          // ===============================================

          const puntaje =
            resultado.puntaje;


          mostrarModalResultado(
            "✅ ¡Formulario enviado correctamente!",
            puntaje
          );


          // ===============================================
          // BLOQUEAR FORMULARIO
          // ===============================================

          formulario
            .querySelectorAll(
              "input"
            )
            .forEach(
              function (input) {

                input.disabled =
                  true;

              }
            );


          if (boton) {

            boton.disabled =
              true;

            boton.textContent =
              "Enviado ✓";

          }


        }

        catch (error) {

          console.error(
            "Error enviando autoevaluación:",
            error
          );


          alert(
            "❌ No se pudo guardar la autoevaluación.\n\n" +
            error.message
          );


          if (boton) {

            boton.disabled =
              false;

            boton.textContent =
              "Guardar y Enviar";

          }

        }

        finally {

          if (spinner) {

            spinner.style.display =
              "none";

          }

        }

      }
    );

  }
);

// =====================================================
// MOSTRAR MODAL
// =====================================================

function mostrarModalResultado(
  mensaje,
  puntaje
) {

  const modal =
    document.getElementById("modal");

  const modalMensaje =
    document.getElementById("modal-mensaje");

  const puntajeValor =
    document.getElementById("puntaje-valor");

  const modalPuntaje =
    document.getElementById("modal-puntaje");


  if (!modal) return;


  // =================================================
  // MENSAJE
  // =================================================

  if (modalMensaje) {

    modalMensaje.textContent =
      mensaje;

  }


  // =================================================
  // PUNTAJE
  // =================================================

  if (
    puntaje !== null &&
    puntaje !== undefined
  ) {

    if (puntajeValor) {

      puntajeValor.textContent =
        puntaje;

    }

    if (modalPuntaje) {

      modalPuntaje.style.display =
        "block";

    }

  }

  else {

    if (modalPuntaje) {

      modalPuntaje.style.display =
        "none";

    }

  }


  // =================================================
  // MOSTRAR
  // =================================================

  modal.style.display =
    "flex";

}

// =====================================================
// BOTÓN CERRAR MODAL
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

  const cerrarModal =
    document.getElementById("cerrar-modal");

  const modal =
    document.getElementById("modal");


  if (cerrarModal) {

    cerrarModal.addEventListener(
      "click",
      function () {

        if (modal) {

          modal.style.display = "none";

        }

      }
    );

  }

});


// =====================================================
// BOTÓN DESCARGAR PDF
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

  const botonPDF =
    document.getElementById("descargarPDF");


  if (!botonPDF) return;


  botonPDF.addEventListener(
    "click",
    function () {

      generarPDF();

    }
  );

});


// =====================================================
// GENERAR PDF
// =====================================================

function generarPDF() {

  try {

    // =================================================
    // VERIFICAR jsPDF
    // =================================================

    if (
      typeof window.jspdf === "undefined"
    ) {

      alert(
        "❌ No se pudo cargar la biblioteca PDF."
      );

      return;

    }


    const {
      jsPDF
    } = window.jspdf;


    const doc =
      new jsPDF();


    // =================================================
    // DATOS DEL ESTUDIANTE
    // =================================================

    const ci =
      document.getElementById("ci")?.value || "";

    const nombre =
      document.getElementById("nombre")?.value || "";

    const curso =
      document.getElementById("curso")?.value || "";


    // =================================================
    // RESPUESTAS
    // =================================================

    const p1 =
      document.querySelector(
        'input[name="p1"]:checked'
      )?.value || "";

    const p2 =
      document.querySelector(
        'input[name="p2"]:checked'
      )?.value || "";

    const p3 =
      document.querySelector(
        'input[name="p3"]:checked'
      )?.value || "";

    const p4 =
      document.querySelector(
        'input[name="p4"]:checked'
      )?.value || "";

    const p5 =
      document.querySelector(
        'input[name="p5"]:checked'
      )?.value || "";


    // =================================================
    // CONVERTIR RESPUESTA A TEXTO
    // =================================================

    function textoRespuesta(valor) {

      if (valor === "1") {

        return "Sí";

      }

      if (valor === "0.5") {

        return "A veces";

      }

      if (valor === "0") {

        return "No";

      }

      return "";

    }


    // =================================================
    // CALCULAR PUNTAJE
    // =================================================

    const puntaje =
      Math.round(
        Number(p1) +
        Number(p2) +
        Number(p3) +
        Number(p4) +
        Number(p5)
      );


    // =================================================
    // ENCABEZADO
    // =================================================

    doc.setFontSize(16);

    doc.text(
      "AUTOEVALUACIÓN - 2DO TRIMESTRE",
      105,
      20,
      {
        align: "center"
      }
    );


    doc.setFontSize(13);

    doc.text(
      "EDUCACIÓN MUSICAL",
      105,
      29,
      {
        align: "center"
      }
    );


    doc.setFontSize(10);

    doc.text(
      "Prof. Humberto Yupanqui C.",
      105,
      37,
      {
        align: "center"
      }
    );


    // =================================================
    // DATOS DEL ESTUDIANTE
    // =================================================

    doc.setFontSize(11);

    doc.text(
      "DATOS DEL ESTUDIANTE",
      14,
      50
    );


    doc.setFontSize(10);

    doc.text(
      "CI: " + ci,
      14,
      59
    );

    doc.text(
      "Nombre: " + nombre,
      14,
      67
    );

    doc.text(
      "Curso: " + curso,
      14,
      75
    );


    // =================================================
    // TABLA
    // =================================================

    if (
      typeof doc.autoTable === "function"
    ) {

      doc.autoTable({

        startY: 85,

        head: [
          [
            "Pregunta",
            "Respuesta",
            "Valor"
          ]
        ],

        body: [

          [
            "P1",
            textoRespuesta(p1),
            p1
          ],

          [
            "P2",
            textoRespuesta(p2),
            p2
          ],

          [
            "P3",
            textoRespuesta(p3),
            p3
          ],

          [
            "P4",
            textoRespuesta(p4),
            p4
          ],

          [
            "P5",
            textoRespuesta(p5),
            p5
          ]

        ]

      });

    }


    // =================================================
    // PUNTAJE
    // =================================================

    const posicionY =
      doc.lastAutoTable
        ? doc.lastAutoTable.finalY + 15
        : 110;


    doc.setFontSize(14);

    doc.text(
      "PUNTAJE OBTENIDO: " + puntaje + " / 5",
      105,
      posicionY,
      {
        align: "center"
      }
    );


    // =================================================
    // FECHA
    // =================================================

    const fecha =
      new Date();


    const fechaTexto =
      fecha.toLocaleDateString(
        "es-BO"
      );


    doc.setFontSize(9);

    doc.text(
      "Fecha: " + fechaTexto,
      105,
      posicionY + 10,
      {
        align: "center"
      }
    );


    // =================================================
    // PIE
    // =================================================

    doc.setFontSize(9);

    doc.text(
      "Autoevaluación de Educación Musical - 2do Trimestre 2026",
      105,
      285,
      {
        align: "center"
      }
    );


    // =================================================
    // NOMBRE DEL ARCHIVO
    // =================================================

    const nombreArchivo =
      "Autoevaluacion_" +
      ci +
      "_2do_Trimestre_2026.pdf";


    // =================================================
    // DESCARGAR
    // =================================================

    doc.save(
      nombreArchivo
    );

  }

  catch (error) {

    console.error(
      "Error generando PDF:",
      error
    );


    alert(
      "❌ No se pudo generar el PDF.\n\n" +
      error.message
    );

  }

}
