//Mostrar comunas de acuerdo a region//
// Diccionario de comunas por región
const comunasPorRegion = {
    "1": ["Arica", "Camarones", "Putre", "General Lagos"],
    "2": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
    "3": ["Antofagasta", "Mejillones", "Sierra Gorda"],
    "4": ["Copiapó", "Caldera", "Tierra Amarilla"],
    "5": ["La Serena", "Coquimbo", "Ovalle"],
    "6": ["Valparaíso", "Viña del Mar", "Concón", "Quilpué"],
    "7": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "8": ["Rancagua", "San Fernando", "Machalí"],
    "9": ["Talca", "Maule", "Curicó"],
    "10": ["Chillán", "Ñuble", "Bulnes"],
    "11": ["Concepción", "Talcahuano", "Hualpén"],
    "12": ["Temuco", "Villarrica", "Pucón"],
    "13": ["Valdivia", "La Unión", "Paillaco"],
    "14": ["Puerto Montt", "Puerto Varas", "Chaitén"],
    "15": ["Coyhaique", "Aysén"],
    "16": ["Punta Arenas", "Puerto Natales"]
};

// Elementos del DOM
const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

// Evento para actualizar comunas al cambiar región
selectRegion.addEventListener("change", () => {
    const regionSeleccionada = selectRegion.value;

    // Limpiar comunas actuales
    selectComuna.innerHTML = '<option value="" selected disabled>Seleccione comuna</option>';

    if (comunasPorRegion[regionSeleccionada]) {
        comunasPorRegion[regionSeleccionada].forEach(comuna => {
            const option = document.createElement("option");
            option.value = comuna.toLowerCase().replace(/ /g, "_"); // valor en minúscula y sin espacios
            option.text = comuna;
            selectComuna.appendChild(option);
        });
    }
});



//Verificadores//
document.getElementById("nombre").addEventListener("keyup",()=>{
    var numero=document.getElementById("nombre").value.length;
    if(numero < 5 && numero >0 || numero > 15)
    {
        document.getElementById("nombre").classList.add("is-invalid");
        document.getElementById("nombre").classList.remove("is-valid");
        document.getElementById("parrafo_1").innerHTML = "El nombre debe tener entre 5 y 15 caracteres."
        document.getElementById("parrafo_1").style.color = "red"
    }
    else if(numero == 0)
    {
        document.getElementById("nombre").classList.remove("is-invalid");
        document.getElementById("nombre").classList.remove("is-valid");
        document.getElementById("parrafo_1").innerHTML = "";
    }
    else
    {
        document.getElementById("nombre").classList.add("is-valid");
        document.getElementById("nombre").classList.remove("is-invalid");
        document.getElementById("parrafo_1").innerHTML = "El nombre es válido."
        document.getElementById("parrafo_1").style.color = "green"
    }
});


document.getElementById("correo").addEventListener("keyup", () => {
    var correo = document.getElementById("correo").value;
    var parrafo = document.getElementById("parrafo_2"); // Asegúrate de tener un <p id="parrafo_2"></p>
    var valido = correo.endsWith("@gmail.com") || correo.endsWith("@duocuc.cl") || correo.endsWith("@profesor.duoc.cl");

    if (correo.length === 0) {
        // Si no hay texto, quitar clases y borrar mensaje
        document.getElementById("correo").classList.remove("is-valid", "is-invalid");
        parrafo.innerHTML = "";
    } 
    else if (!valido) {
        // Si no termina en los dominios correctos
        document.getElementById("correo").classList.add("is-invalid");
        document.getElementById("correo").classList.remove("is-valid");
        parrafo.innerHTML = "El correo debe terminar en @gmail.com, @duocuc.cl o @profesor.duoc.cl";
        parrafo.style.color = "red";
    } 
    else {
        // Si el correo es válido
        document.getElementById("correo").classList.add("is-valid");
        document.getElementById("correo").classList.remove("is-invalid");
        parrafo.innerHTML = "Correo válido";
        parrafo.style.color = "green";
    }
});


document.getElementById("contrasena").addEventListener("keyup", () => {
    var pass = document.getElementById("contrasena").value;
    var parrafo = document.getElementById("parrafo_3"); // Asegúrate de tener un <p id="parrafo_pass"></p>

    // Expresiones regulares para validar
    var tieneMayuscula = /[A-Z]/.test(pass);  // Al menos una letra mayúscula
    var tieneNumero = /[0-9]/.test(pass);     // Al menos un número

    if (pass.length === 0) {
        // Si no hay texto, quitar clases y borrar mensaje
        document.getElementById("contrasena").classList.remove("is-valid", "is-invalid");
        parrafo.innerHTML = "";
    } 
    else if (!tieneMayuscula || !tieneNumero) {
        // Si no cumple con al menos una mayúscula y un número
        document.getElementById("contrasena").classList.add("is-invalid");
        document.getElementById("contrasena").classList.remove("is-valid");
        parrafo.innerHTML = "La contraseña debe tener al menos una letra mayúscula y un número";
        parrafo.style.color = "red";
    } 
    else {
        // Si la contraseña es válida
        document.getElementById("contrasena").classList.add("is-valid");
        document.getElementById("contrasena").classList.remove("is-invalid");
        parrafo.innerHTML = "Contraseña válida";
        parrafo.style.color = "green";
    }
});





// Validación de la contraseña principal
document.getElementById("contrasena").addEventListener("keyup", () => {
    var pass = document.getElementById("contrasena").value;
    var parrafo = document.getElementById("parrafo_3"); // Mensaje para contraseña principal

    var tieneMayuscula = /[A-Z]/.test(pass);  // Al menos una letra mayúscula
    var tieneNumero = /[0-9]/.test(pass);     // Al menos un número

    if (pass.length === 0) {
        document.getElementById("contrasena").classList.remove("is-valid", "is-invalid");
        parrafo.innerHTML = "";
    } 
    else if (!tieneMayuscula || !tieneNumero) {
        document.getElementById("contrasena").classList.add("is-invalid");
        document.getElementById("contrasena").classList.remove("is-valid");
        parrafo.innerHTML = "La contraseña debe tener al menos una letra mayúscula y un número";
        parrafo.style.color = "red";
    } 
    else {
        document.getElementById("contrasena").classList.add("is-valid");
        document.getElementById("contrasena").classList.remove("is-invalid");
        parrafo.innerHTML = "Contraseña válida";
        parrafo.style.color = "green";
    }

    // También validamos la confirmación si ya tiene valor
    validarConfirmacion();
});

// Validación del campo de confirmación
document.getElementById("confi_contrasena").addEventListener("keyup", validarConfirmacion);

function validarConfirmacion() {
    var pass = document.getElementById("contrasena").value;
    var conf = document.getElementById("confi_contrasena").value;
    var parrafoConf = document.getElementById("parrafo_4"); // Mensaje para confirmación

    if (conf.length === 0) {
        document.getElementById("confi_contrasena").classList.remove("is-valid", "is-invalid");
        parrafoConf.innerHTML = "";
    } 
    else if (conf !== pass) {
        document.getElementById("confi_contrasena").classList.add("is-invalid");
        document.getElementById("confi_contrasena").classList.remove("is-valid");
        parrafoConf.innerHTML = "Las contraseñas no coinciden";
        parrafoConf.style.color = "red";
    } 
    else {
        document.getElementById("confi_contrasena").classList.add("is-valid");
        document.getElementById("confi_contrasena").classList.remove("is-invalid");
        parrafoConf.innerHTML = "Contraseña confirmada correctamente";
        parrafoConf.style.color = "green";
    }
}







//BOTON REGISTRAR//
const botonRegistrar = document.getElementById("btnRegistrar");
const mensajeGeneral = document.getElementById("parrafo_5");

botonRegistrar.addEventListener("click", () => {
    let errores = false;

    // Validar Nombre
    const nombre = document.getElementById("nombre");
    if (!nombre.classList.contains("is-valid")) errores = true;

    // Validar Correo
    const correo = document.getElementById("correo");
    if (!correo.classList.contains("is-valid")) errores = true;

    // Validar Contraseña
    const contrasena = document.getElementById("contrasena");
    if (!contrasena.classList.contains("is-valid")) errores = true;

    // Validar Confirmación de Contraseña
    const confContrasena = document.getElementById("confi_contrasena");
    if (!confContrasena.classList.contains("is-valid")) errores = true;

    // Validar Región
    const region = document.getElementById("region");
    if (region.value === "" || region.value === null) errores = true;

    // Validar Comuna
    const comuna = document.getElementById("comuna");
    if (comuna.value === "" || comuna.value === null) errores = true;

    // Mostrar mensaje
    if (errores) {
        mensajeGeneral.innerHTML = "Hay errores en el llenado del cuestionario. Por favor, revisa los campos.";
        mensajeGeneral.style.color = "red";
    } else {
        mensajeGeneral.innerHTML = "Formulario enviado correctamente!";
        mensajeGeneral.style.color = "green";
    }
});