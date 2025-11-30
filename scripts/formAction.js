const NACIONALIDADES_ACEPTADAS = [
  { key: "AU", name: "Australia" },
  { key: "BR", name: "Brasil" },
  { key: "CA", name: "Canadá" },
  { key: "CH", name: "Suiza" },
  { key: "DE", name: "Alemania" },
  { key: "DK", name: "Dinamarca" },
  { key: "ES", name: "España" },
  { key: "FI", name: "Finlandia" },
  { key: "FR", name: "Francia" },
  { key: "GB", name: "Reino Unido" },
  { key: "IE", name: "Irlanda" },
  { key: "IN", name: "India" },
  { key: "IR", name: "Irán" },
  { key: "MX", name: "México" },
  { key: "NL", name: "Países Bajos" },
  { key: "NO", name: "Noruega" },
  { key: "NZ", name: "Nueva Zelanda" },
  { key: "RS", name: "Serbia" },
  { key: "TR", name: "Turquía" },
  { key: "UA", name: "Ucrania" },
  { key: "US", name: "Estados Unidos" },
];

window.onload = function () {
  const form = document.getElementsByTagName("form");
  const inputs = form[0].getElementsByTagName("input");
  const selects = form[0].getElementsByTagName("select");

  for (let input of inputs) {
    input.onfocus = resaltarDesresaltar;

    input.addEventListener("blur", resaltarDesresaltar);
  }

  for (let select of selects) {
    select.onfocus = resaltarDesresaltar;

    select.addEventListener("blur", resaltarDesresaltar);
  }

  llenarNacionalidad();
};

function llenarNacionalidad() {
  const nacionalidad = document.getElementById("nationality");

  for (let { key, name } of NACIONALIDADES_ACEPTADAS) {
    const option = document.createElement("option");
    option.value = key;
    option.innerHTML = name;
    nacionalidad.appendChild(option);
  }
}

function resaltar(evento) {
  evento.target.classList.add("selected");
}

function noResaltar(evento) {
  const clase = evento.target.classList.contains("selected");
  if (clase) {
    evento.target.classList.remove("selected");
  }
}

//segunda forma con label epico (aunque no supe con las labels del checkbox :( )
function resaltarDesresaltar(evento) {
  const elemento = evento.target;
  elemento.classList.toggle("selected");
  const label = document.querySelector(`label[for="${elemento.id}"]`);

  if (label) {
    label.classList.toggle("label-selected");
  }
}

//tarea extra validaciones a tiempo real
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const submitBtn = document.getElementById("submit-btn");

  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const photo = document.getElementById("photo");
  const gender = document.getElementById("gender");
  const nationality = document.getElementById("nationality");

  const campos = [firstName, lastName, email, photo, gender, nationality];

  //validador
  campos.forEach((campo) => {
    campo.addEventListener("input", validarFormulario);
    campo.addEventListener("change", validarFormulario);
  });

  //no se puede enviar el form si los campos no estan bien
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!submitBtn.disabled) {
      window.location.href = "its-a-match.html";
    }
  });

  validarFormulario();
});

//validar texto
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

function validarNombre(evento) {
  const input = evento.target;
  const valor = input.value.trim();

  if (valor === "") {
    mostrarError(input, "Por favor, rellena este campo.");
    return false;
  }

  if (!REGEX_NOMBRE.test(valor)) {
    mostrarError(input, "Solo se permiten letras y acentos.");
    return false;
  }

  limpiarError(input);
  return true;
}

function validarCorreo(evento) {
  const input = evento.target;
  const valor = input.value.trim();

  if (valor === "") {
    mostrarError(input, "Por favor, rellena este campo.");
    return false;
  }

  //simplemente valida que tenga @
  if (!valor.includes("@") || !valor.includes(".")) {
    mostrarError(input, "Introduce un correo válido.");
    return false;
  }

  limpiarError(input);
  return true;
}

function validarVacio(evento) {
  const input = evento.target;
  const valor = input.value.trim();

  if (valor === "") {
    mostrarError(input, "Por favor, rellena este campo.");
    return false;
  }

  limpiarError(input);
  return true;
}

//validar
function validarFormulario() {
  const firstNameValid = validarNombre({
    target: document.getElementById("first-name"),
  });
  const lastNameValid = validarNombre({
    target: document.getElementById("last-name"),
  });
  const emailValid = validarCorreo({
    target: document.getElementById("email"),
  });
  const photoValid = validarVacio({ target: document.getElementById("photo") });
  const genderValid = validarVacio({
    target: document.getElementById("gender"),
  });
  const nationalityValid = validarVacio({
    target: document.getElementById("nationality"),
  });

  const esValido =
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    photoValid &&
    genderValid &&
    nationalityValid;

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = !esValido;
}

//errores que ve el usuario
function mostrarError(input, mensaje) {
  input.classList.add("input-error");

  if (
    input.nextElementSibling &&
    input.nextElementSibling.classList.contains("error-msg")
  ) {
    input.nextElementSibling.textContent = mensaje;
    return;
  }

  const msg = document.createElement("p");
  msg.classList.add("error-msg");
  msg.textContent = mensaje;
  input.insertAdjacentElement("afterend", msg);
}

function limpiarError(input) {
  input.classList.remove("input-error");

  if (
    input.nextElementSibling &&
    input.nextElementSibling.classList.contains("error-msg")
  ) {
    input.nextElementSibling.remove();
  }
}
