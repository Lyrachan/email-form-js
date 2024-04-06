document.addEventListener('DOMContentLoaded', function () {

    // Select user interface elements
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    // Code testing
    // console.log(inputEmail, inputAsunto, inputMensaje);

    // Event assign for input reading when the 'blur' event occurs
    // As second paramether 'validar' function goes without perenthesis, cause it's a reference,
    // otherwise, it'd be called directly as a function when loading the site
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    // callback
    function validar(event) {
        // Traversing the DOM
        // console.log(event.target.parentElement);
        // This identifies the element containing the inputs
        // event.target.parentElement corresponds to the input parent

        if(event.target.value.trim() === '') {
            // 
            mostrarAlerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
            return;
            // return stops the code execution
        };

        if (event.target.id === 'email' && !validarEmail(event.target.value)) {
            mostrarAlerta('El email no es válido', event.target.parentElement);
            return;
        }

        // if mostrarAlerta() doesn't execute, then limpiarAlerta acts, clearing the alert message
        limpiarAlerta(event.target.parentElement);
    };

    function mostrarAlerta(mensaje, referencia) {
        // 'mensaje' stands for the HTML element to render, 'referencia' for the place of the event

        // Check if an alert exists
        // As limpiarAlerta() exists, this codelines are optional, it can be called right here
        // limpiarAlerta(referencia);
        
        const alert = referencia.querySelector('.alert');
        // console.log for checking if alert exists
        // console.log(alert);
        if (alert) {
            // This removes the element with the 'alert' class specified for the error message
            alert.remove();
        };

        // Generating HTML alert
        const error = document.createElement('H3');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'alert'); // (like with bootstrap)

        // Code testing in console
        // console.log(error.outerHTML);  

        // Injecting error in form
        // It appends a child to the input parent element (corresponding to 'referencia'),
        // so the siblings are 'input' and the h3 element in 'mostrarAlerta' ('mensaje' parameter)
        referencia.appendChild(error);
    };

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.alert')
        if(alerta) {
            alerta.remove();
        }
    };

    function validarEmail(email) {
        // Regular expresion. Used to search for a pattern in a string.
        // This one is for an email validation
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
        // It is key to return the variable value (true/false) when doing the .test method

        // The .test method searches for a match between a regular expression and a specified string
    }

});