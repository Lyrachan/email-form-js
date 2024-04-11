document.addEventListener('DOMContentLoaded', function () {

    // Configuring form fields to be stored and sended
    const email = {
        email: '',
        asunto: '',
        mensaje: '',
        correoadicional: ''
    }

        // Adding a new input section
    // Input label
    const inputOpcionalTexto = document.createElement('label');
    inputOpcionalTexto.classList.add('font-regular', 'font-medium');
    inputOpcionalTexto.setAttribute('for', 'destinatario-adicional');
    inputOpcionalTexto.textContent = 'Destinatario adicional (opcional)';

    //Input field
    const inputOpcionalCampo = document.createElement('textarea');
    inputOpcionalCampo.setAttribute('id', 'destinatario-adicional');
    inputOpcionalCampo.setAttribute('placeholder', "Email destino, ej: mk@empresa2.com");
    inputOpcionalCampo.setAttribute('type', 'email');
    inputOpcionalCampo.setAttribute('name', 'correoadicional');
    inputOpcionalCampo.classList.add('border', 'border-gray-300', 'px-3', 'py-2', 'rounded-lg', 'h-36');

    // Creating div
    const divInputOpcional = document.createElement('div');
    divInputOpcional.classList.add('flex', 'flex-col', 'space-y-2');
    divInputOpcional.appendChild(inputOpcionalTexto);
    divInputOpcional.appendChild(inputOpcionalCampo);

    
    
    // Select user interface elements
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]'); // specific button
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    // Inserting HTML div element at the end of formulario
    // It's important to add it to the DOM before trying to get the element
    formulario.insertBefore(divInputOpcional, formulario.children[3]);
    const inputCorreoOpcional = document.querySelector('#destinatario-adicional');

    // console.log(inputCorreoOpcional);

    // Code testing
    // console.log(inputEmail, inputAsunto, inputMensaje);

    // Event assign for input reading when the 'blur' event occurs
    // As second paramether 'validar' function goes without perenthesis, cause it's a reference,
    // otherwise, it'd be called directly as a function when loading the site
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    inputCorreoOpcional.addEventListener('blur', validar);
    // (It can be 'input' instead of 'blur', for a real-time experience)

    formulario.addEventListener('submit', enviarEmail);

    // Event for reset button. Note that it establishes a function as a seconde parameter,
    // instead of calling it from an outer declaration
    btnReset.addEventListener('click', function(event) {
        event.preventDefault(); // It's default action is a GET HTTPS request
        // On a button, adding a preventDefault can help to change it's function

        resetFormulario();
    });

    // Send Email button features
    function enviarEmail(event) {
        event.preventDefault();

        spinner.classList.add('flex'); // flexbox to aling-center on screen
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            // The form input parameters reset after the 3000ms timeout ends
            resetFormulario();

            // Alert
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center',
            'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);
                setTimeout(() => {
                    alertaExito.remove();
                }, 3000);
        }, 3000);            
    };

    // callback
    function validar(event) {
        // Traversing the DOM
        // console.log(event.target.parentElement);
        // This identifies the element containing the inputs
        // event.target.parentElement corresponds to the input parent

        if(event.target.value.trim() === '') {
            // 
            mostrarAlerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail();
            return;
            // return stops the code execution
        };

        if (event.target.id === 'email' && !validarEmail(event.target.value)) {
            mostrarAlerta('El email no es válido', event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail();
            return;
        }

        // if mostrarAlerta() doesn't execute, then limpiarAlerta acts, clearing the alert message
        limpiarAlerta(event.target.parentElement);

        // Assigning values
        email[event.target.name] = event.target.value.trim().toLowerCase();
        // console.log(email); // Checking code

        comprobarEmail();
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
    };

    function comprobarEmail() {
        // Validating input in fields
        if ( Object.values(email).includes('') ) {
            btnSubmit.classList.add('opacity-50');
             btnSubmit.disabled = true;
        } else {
            // Removing the "disabled" attribute, and the "opacity" style
             btnSubmit.classList.remove('opacity-50');
             btnSubmit.disabled = false;
        }
    };

    function resetFormulario() {
        // Restarting object after sending
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    };
});

// Desafío opcional: Añadir un campo opcional (email de destinatario adicional), con validaciones en input. Máx 20 min