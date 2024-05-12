document.addEventListener("DOMContentLoaded", function() {
    var formulario = document.getElementById("registroForm");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Realiza la validación del formulario
        if (validarFormulario()) {
            formulario.submit(); // Envía el formulario si la validación es exitosa
        }
    });

    function validarFormulario() {
        var nombre = document.getElementById("nombre").value.trim();
        var apellido = document.getElementById("apellido").value.trim();
        var email = document.getElementById("email").value.trim();
        var edad = document.getElementById("edad").value;
        var genero = document.getElementById("genero").value;
        var contrasena = document.getElementById("contrasena").value.trim();
        var confirmarContrasena = document.getElementById("confirmarContrasena").value.trim();
        var captcha = document.querySelector(".g-recaptcha-response").value.trim();

        // Validación básica
        if (nombre.length < 5) {
            alert("El nombre debe tener al menos 5 caracteres.");
            return false;
        }

        if (apellido.length < 5) {
            alert("El apellido debe tener al menos 5 caracteres.");
            return false;
        }

        if (email.length < 5) {
            alert("El email debe tener al menos 5 caracteres.");
            return false;
        }

        if (edad < 10 || edad > 120) {
            alert("La edad debe estar entre 10 y 120 años.");
            return false;
        }

        if (contrasena.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            return false;
        }

        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return false;
        }

        // Validación del reCAPTCHA
        if (!captcha) {
            alert("Por favor, completa el reCAPTCHA.");
            return false;
        }

        // Si todas las validaciones pasan, retorna true
        return true;
    }
});


//mongodb+srv://Mantis:hv218g5tOpJ6rFYA@mantis.ptscjte.mongodb.net/
//mongodb+srv://Mantis:<password>@mantis.ptscjte.mongodb.net/