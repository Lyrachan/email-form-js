document.addEventListener('DOMContentLoaded', function () {

    // Select user interface elements
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');

    // Code testing
    // console.log(inputEmail, inputAsunto, inputMensaje);

    // Event assign for input reading when the 'blur' event occurs
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    // callback
    function validar(event) {
        if(event.target.value.trim() === '') {
            mostrarAlerta();
        } else {
            console.log('hay algo en la casilla');
        }   
    };

    function mostrarAlerta() {
        // Generating HTML alert
        const error = document.createElement('H3');
        error.textContent = 'Hubo un error...';

        // Code testing in console
        console.log(error.outerHTML);
    };
});