document.getElementById("fullname").addEventListener("keyup",()=>{
    var numero = document.getElementById("fullname").value.length;

    if(numero > 100)
    {
        console.log("invalido");
        document.getElementById("fullname").classList.add("is-invalid");
        document.getElementById("fullname").classList.remove("is-valid");

        document.getElementById("parrafo_1").innerHTML = "El nombre debe tener menos de 100 caracteres."
        document.getElementById("parrafo_1").style.color = "red"
    }
    else if(numero == 0)
    {
        document.getElementById("fullname").classList.remove("is-invalid");
        document.getElementById("fullname").classList.remove("is-valid");
        document.getElementById("parrafo_1").innerHTML = "";
    }
    else
    {
        console.log("valido");
        document.getElementById("fullname").classList.add("is-valid");
        document.getElementById("fullname").classList.remove("is-invalid");

        document.getElementById("parrafo_1").innerHTML = "";
    }
})












document.getElementById("email").addEventListener("keyup", () => {
    const correoInput = document.getElementById("email");
    const correo = correoInput.value;
    const parrafo = document.getElementById("parrafo_2");

    // Posición de la arroba
    const atIndex = correo.indexOf("@");

    // Condiciones de dominio permitidos
    const valido = correo.endsWith("@gmail.com") ||
                   correo.endsWith("@duocuc.cl") ||
                   correo.endsWith("@profesor.duoc.cl");

    if (correo.length === 0) {
        // Si no hay texto, quitar validaciones y mensaje
        correoInput.classList.remove("is-valid", "is-invalid");
        parrafo.innerHTML = "";
    } 
    else if (correo.length > 100 || atIndex <= 0) {
        // Inválido por largo o por no tener texto antes del @
        correoInput.classList.add("is-invalid");
        correoInput.classList.remove("is-valid");
        parrafo.innerHTML = "El correo no puede superar 100 caracteres y debe tener al menos un caracter antes de @.";
        parrafo.style.color = "red";
    } 
    else if (!valido) {
        // Inválido por dominio incorrecto
        correoInput.classList.add("is-invalid");
        correoInput.classList.remove("is-valid");
        parrafo.innerHTML = "El correo debe terminar en @gmail.com, @duocuc.cl o @profesor.duoc.cl";
        parrafo.style.color = "red";
    }
    else {
        // Válido
        correoInput.classList.add("is-valid");
        correoInput.classList.remove("is-invalid");
        parrafo.innerHTML = "";
    }
});












document.getElementById("message").addEventListener("keyup",()=>{
    var numero = document.getElementById("message").value.length;
    const parrafo = document.getElementById("parrafo_3");

    if(numero > 500)
    {
        console.log("invalido");
        document.getElementById("message").classList.add("is-invalid");
        document.getElementById("message").classList.remove("is-valid");

        parrafo.innerHTML = "El mensaje no puede superar los 500 caracteres.";
        parrafo.style.color = "red";
    }
    else
    {
        console.log("valido");
        document.getElementById("message").classList.add("is-valid");
        document.getElementById("message").classList.remove("is-invalid");
        parrafo.innerHTML = "";
    }
})