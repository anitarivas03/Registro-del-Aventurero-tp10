// -------------------- OBTENER ELEMENTOS --------------------
const questions = [
    document.getElementById('question1'),
    document.getElementById('question2'),
    document.getElementById('question3'),
    document.getElementById('question4'),
    document.getElementById('question5'),
    document.getElementById('question6'),
    document.getElementById('question7'),
    document.getElementById('question8'),
    document.getElementById('question9'),
    document.getElementById('question10')
];

// Campos de entrada
const nombreInput = document.getElementById('nombrePersonaje');
const razaSelect = document.getElementById('raza');
const claseSelect = document.getElementById('clase');
const reinoInput = document.getElementById('reinoOrigen');
const armaInput = document.getElementById('armaPrincipal');
const registroInput = document.getElementById('registroNum');
const vidaInput = document.getElementById('puntosVida');
const batallasInput = document.getElementById('batallasGanadas');
const fechaNacInput = document.getElementById('fechaNacimiento');
const fechaAventInput = document.getElementById('fechaAventura');

// Divs de errores
const errorNombre = document.getElementById('errorNombre');
const errorRaza = document.getElementById('errorRaza');
const errorClase = document.getElementById('errorClase');
const errorReino = document.getElementById('errorReino');
const errorArma = document.getElementById('errorArma');
const errorRegistro = document.getElementById('errorRegistro');
const errorVida = document.getElementById('errorVida');
const errorBatallas = document.getElementById('errorBatallas');
const errorFechaNac = document.getElementById('errorFechaNac');
const errorFechaAvent = document.getElementById('errorFechaAvent');

// Botones
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');
const btnReset = document.getElementById('btnReset');
const buttonsPanel = document.getElementById('buttonsPanel');
const successContainer = document.getElementById('successMessageContainer');

// Estado
let currentIndex = 0;
let completed = false;
let lockedFields = [false, false, false, false, false, false, false, false, false, false];

// ---------- FUNCIONES DE VALIDACIÓN (RETORNAN true/false) ----------
function validarNombre() {
    const valor = nombreInput.value.trim();
    const regex = /^[A-Za-zÀ-ÿñÑ\s]+$/;
    let isValid = false;
    let msg = "";
    if (valor === "") {
        msg = "❌ El nombre no puede estar vacío.";
        applyBorderStyle(nombreInput, 'empty');
    } else if (valor.length < 3) {
        msg = "❌ El nombre debe tener al menos 3 caracteres.";
        applyBorderStyle(nombreInput, 'invalid');
    } else if (!regex.test(valor)) {
        msg = "❌ Solo se permiten letras, acentos y ñ.";
        applyBorderStyle(nombreInput, 'invalid');
    } else {
        isValid = true;
        msg = "";
        applyBorderStyle(nombreInput, 'valid');
    }
    errorNombre.innerHTML = msg ? ` ${msg}` : "";
    return isValid;
}

function validarRaza() {
    const val = razaSelect.value;
    let isValid = false;
    if (val === "") {
        errorRaza.innerHTML = ` Debes seleccionar una raza válida.`;
        applyBorderStyle(razaSelect, 'empty');
    } else {
        isValid = true;
        errorRaza.innerHTML = "";
        applyBorderStyle(razaSelect, 'valid');
    }
    return isValid;
}

function validarClase() {
    const val = claseSelect.value;
    let isValid = false;
    if (val === "") {
        errorClase.innerHTML = ` Debes seleccionar una clase válida.`;
        applyBorderStyle(claseSelect, 'empty');
    } else {
        isValid = true;
        errorClase.innerHTML = "";
        applyBorderStyle(claseSelect, 'valid');
    }
    return isValid;
}

function validarReino() {
    const valor = reinoInput.value.trim();
    const regex = /^[A-Za-zÀ-ÿñÑ\s]+$/;
    let isValid = false;
    if (valor === "") {
        errorReino.innerHTML = ` El reino no puede estar vacío.`;
        applyBorderStyle(reinoInput, 'empty');
    } else if (valor.length < 3) {
        errorReino.innerHTML = ` Mínimo 3 caracteres.`;
        applyBorderStyle(reinoInput, 'invalid');
    } else if (!regex.test(valor)) {
        errorReino.innerHTML = ` Solo letras, acentos y ñ.`;
        applyBorderStyle(reinoInput, 'invalid');
    } else {
        isValid = true;
        errorReino.innerHTML = "";
        applyBorderStyle(reinoInput, 'valid');
    }
    return isValid;
}

function validarArma() {
    const valor = armaInput.value.trim();
    const regex = /^[A-Za-zÀ-ÿñÑ\s]+$/;
    let isValid = false;
    if (valor === "") {
        errorArma.innerHTML = ` El arma no puede estar vacía.`;
        applyBorderStyle(armaInput, 'empty');
    } else if (valor.length < 3) {
        errorArma.innerHTML = ` Mínimo 3 caracteres.`;
        applyBorderStyle(armaInput, 'invalid');
    } else if (!regex.test(valor)) {
        errorArma.innerHTML = `Solo letras y acentos.`;
        applyBorderStyle(armaInput, 'invalid');
    } else {
        isValid = true;
        errorArma.innerHTML = "";
        applyBorderStyle(armaInput, 'valid');
    }
    return isValid;
}

function validarRegistro() {
    const valor = registroInput.value.trim();
    let isValid = false;
    if (valor === "") {
        errorRegistro.innerHTML = ` Campo requerido.`;
        applyBorderStyle(registroInput, 'empty');
    } else if (isNaN(valor) || !/^\d+$/.test(valor)) {
        errorRegistro.innerHTML = ` Solo números (isNaN aplicado).`;
        applyBorderStyle(registroInput, 'invalid');
    } else if (valor.length !== 6) {
        errorRegistro.innerHTML = ` Debe tener exactamente 6 dígitos.`;
        applyBorderStyle(registroInput, 'invalid');
    } else {
        isValid = true;
        errorRegistro.innerHTML = "";
        applyBorderStyle(registroInput, 'valid');
    }
    return isValid;
}

function validarPuntosVida() {
    const valor = vidaInput.value.trim();
    let isValid = false;
    if (valor === "") {
        errorVida.innerHTML = ` Puntos de vida requeridos.`;
        applyBorderStyle(vidaInput, 'empty');
    } else if (isNaN(valor) || !/^\d+$/.test(valor)) {
        errorVida.innerHTML = ` Debe ser un número válido.`;
        applyBorderStyle(vidaInput, 'invalid');
    } else {
        const num = Number(valor);
        if (num < 1 || num > 999) {
            errorVida.innerHTML = ` Rango permitido: 1 a 999.`;
            applyBorderStyle(vidaInput, 'invalid');
        } else {
            isValid = true;
            errorVida.innerHTML = "";
            applyBorderStyle(vidaInput, 'valid');
        }
    }
    return isValid;
}

function validarBatallas() {
    const valor = batallasInput.value.trim();
    let isValid = false;
    if (valor === "") {
        errorBatallas.innerHTML = ` Campo obligatorio.`;
        applyBorderStyle(batallasInput, 'empty');
    } else if (isNaN(valor) || !/^\d+$/.test(valor)) {
        errorBatallas.innerHTML = ` Debe ser un número entero.`;
        applyBorderStyle(batallasInput, 'invalid');
    } else {
        const num = Number(valor);
        if (num < 0) {
            errorBatallas.innerHTML = ` No pueden ser batallas negativas.`;
            applyBorderStyle(batallasInput, 'invalid');
        } else {
            isValid = true;
            errorBatallas.innerHTML = "";
            applyBorderStyle(batallasInput, 'valid');
        }
    }
    return isValid;
}

function validarFechaNacimiento() {
    const fechaStr = fechaNacInput.value;
    let isValid = false;
    if (!fechaStr) {
        errorFechaNac.innerHTML = ` Selecciona una fecha.`;
        applyBorderStyle(fechaNacInput, 'empty');
        return false;
    }
    const fechaNac = new Date(fechaStr);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesDiff = hoy.getMonth() - fechaNac.getMonth();
    if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    if (edad >= 18) {
        isValid = true;
        errorFechaNac.innerHTML = "";
        applyBorderStyle(fechaNacInput, 'valid');
    } else {
        errorFechaNac.innerHTML = ` El personaje debe ser mayor de 18 años.`;
        applyBorderStyle(fechaNacInput, 'invalid');
    }
    return isValid;
}

function validarFechaAventura() {
    const fechaStr = fechaAventInput.value;
    let isValid = false;
    if (!fechaStr) {
        errorFechaAvent.innerHTML = ` Ingresa una fecha.`;
        applyBorderStyle(fechaAventInput, 'empty');
        return false;
    }
    const fechaAvent = new Date(fechaStr);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaAvent <= hoy) {
        isValid = true;
        errorFechaAvent.innerHTML = "";
        applyBorderStyle(fechaAventInput, 'valid');
    } else {
        errorFechaAvent.innerHTML = ` La fecha no puede ser futura.`;
        applyBorderStyle(fechaAventInput, 'invalid');
    }
    return isValid;
}

// Aplicar estilos de borde
function applyBorderStyle(element, status) {
    element.classList.remove('input-valid', 'input-invalid', 'input-empty');
    if (status === 'valid') element.classList.add('input-valid');
    else if (status === 'invalid') element.classList.add('input-invalid');
    else if (status === 'empty') element.classList.add('input-empty');
}

// Array de validadores
const validators = [
    validarNombre, validarRaza, validarClase, validarReino, validarArma,
    validarRegistro, validarPuntosVida, validarBatallas, validarFechaNacimiento, validarFechaAventura
];

// Bloquear/desbloquear campos
function lockField(index, locked) {
    const inputs = [nombreInput, razaSelect, claseSelect, reinoInput, armaInput, registroInput, vidaInput, batallasInput, fechaNacInput, fechaAventInput];
    if (locked) {
        inputs[index].disabled = true;
        lockedFields[index] = true;
    } else {
        inputs[index].disabled = false;
        lockedFields[index] = false;
    }
}

// Actualizar visibilidad de preguntas
function actualizarVisibilidadPreguntas() {
    for (let i = 0; i < questions.length; i++) {
        if (i === currentIndex) {
            questions[i].classList.remove('hidden-question');
        } else {
            questions[i].classList.add('hidden-question');
        }
    }
}

// Actualizar estado de botones
function actualizarBotones() {
    btnBack.disabled = (currentIndex === 0);
    if (completed) {
        btnBack.disabled = true;
        btnNext.disabled = true;
        btnReset.disabled = false;
    } else {
        btnNext.disabled = false;
        btnReset.disabled = false;
    }
}

// Avanzar a la siguiente pregunta
function avanzarPregunta() {
    if (completed) return;
    const isValid = validators[currentIndex]();
    if (isValid) {
        lockField(currentIndex, true);
        if (currentIndex + 1 < questions.length) {
            currentIndex++;
            actualizarVisibilidadPreguntas();
            actualizarBotones();
            if (lockedFields[currentIndex] === true) {
                lockField(currentIndex, false);
            }
        } else {
            finalizarRegistroExitoso();
        }
    }
}

// Retroceder a la pregunta anterior
function retrocederPregunta() {
    if (completed) return;
    if (currentIndex > 0) {
        lockField(currentIndex, false);
        currentIndex--;
        lockField(currentIndex, false);
        actualizarVisibilidadPreguntas();
        actualizarBotones();
        const errDivs = [errorNombre, errorRaza, errorClase, errorReino, errorArma, errorRegistro, errorVida, errorBatallas, errorFechaNac, errorFechaAvent];
        errDivs[currentIndex].innerHTML = "";
        const allFields = [nombreInput, razaSelect, claseSelect, reinoInput, armaInput, registroInput, vidaInput, batallasInput, fechaNacInput, fechaAventInput];
        allFields[currentIndex].classList.remove('input-valid', 'input-invalid', 'input-empty');
    }
}

// Finalizar registro exitoso
function finalizarRegistroExitoso() {
    for (let i = 0; i < 10; i++) {
        lockField(i, true);
    }
    completed = true;
    buttonsPanel.style.display = "none";
    const nombre = nombreInput.value.trim();
    const raza = razaSelect.value;
    const clase = claseSelect.value;
    const cartelHTML = `
        <div class="success-banner">
            <p><strong>Registro exitoso, ${nombre}!</strong> ✨📜</p>
            <p> Tu leyenda comienza hoy. ¡Que la Gran Alianza guíe tus pasos, ${clase} de los ${raza}! ⭐</p>
            <p>¡El mundo necesita héroes como tú! </p>
        </div>
    `;
    successContainer.innerHTML = cartelHTML;
    actualizarBotones();
}

// Reiniciar todo el formulario
function reiniciarTodo() {
    if (completed) {
        successContainer.innerHTML = "";
        buttonsPanel.style.display = "flex";
        completed = false;
    }
    const allInputs = [nombreInput, razaSelect, claseSelect, reinoInput, armaInput, registroInput, vidaInput, batallasInput, fechaNacInput, fechaAventInput];
    allInputs.forEach(inp => {
        if (inp.tagName === 'SELECT') inp.value = "";
        else if (inp.type === 'date') inp.value = "";
        else inp.value = "";
        inp.disabled = false;
        inp.classList.remove('input-valid', 'input-invalid', 'input-empty');
    });
    const erroresDivs = [errorNombre, errorRaza, errorClase, errorReino, errorArma, errorRegistro, errorVida, errorBatallas, errorFechaNac, errorFechaAvent];
    erroresDivs.forEach(div => div.innerHTML = "");
    lockedFields.fill(false);
    currentIndex = 0;
    actualizarVisibilidadPreguntas();
    actualizarBotones();
    completed = false;
    buttonsPanel.style.display = "flex";
    successContainer.innerHTML = "";
}

// Eventos
btnNext.addEventListener('click', avanzarPregunta);
btnBack.addEventListener('click', retrocederPregunta);
btnReset.addEventListener('click', reiniciarTodo);

// Limpiar errores al escribir en campos desbloqueados
const allDynamicInputs = [nombreInput, razaSelect, claseSelect, reinoInput, armaInput, registroInput, vidaInput, batallasInput, fechaNacInput, fechaAventInput];
allDynamicInputs.forEach((input, idx) => {
    input.addEventListener('input', () => {
        if (!lockedFields[idx] && !completed) {
            const errDivs = [errorNombre, errorRaza, errorClase, errorReino, errorArma, errorRegistro, errorVida, errorBatallas, errorFechaNac, errorFechaAvent];
            errDivs[idx].innerHTML = "";
            input.classList.remove('input-invalid', 'input-empty', 'input-valid');
        }
    });
});

// Inicialización
reiniciarTodo();