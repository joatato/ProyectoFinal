let socket = io();
let divMensajes = document.querySelector('#mensajes')
let textMensaje = document.querySelector('#mensaje')

textMensaje.focus()

textMensaje.addEventListener('keyup', (evento) => {
    if (evento.keyCode == 13) {
        if (evento.target.value.trim() != '') {
            socket.emit('mensaje', {
                emisor: nombre,
                mensaje: evento.target.value
            })
            textMensaje.value = ''
            textMensaje.focus()
        }
    }
})

socket.on('hola', (objeto) => {
    console.log(`${objeto.emisor} dice ${objeto.mensaje}`)

    objeto.mensajes.forEach(el => {
        divMensajes.innerHTML += `<br><div class='mensaje'><strong>>${el.emisor}</strong> dice <i>${el.mensaje}</i></div>`
    });
    divMensajes.scrollTop = divMensajes.scrollHeight;

    socket.emit('respuestaAlSaludo', {
        emisor: nombre,
        mensaje: `Hola, desde el Frontend`
    })
})

socket.on('nuevoUsuario', (usuario) => {
    Swal.fire({
        text: `${usuario} se ha conectado...!!!`,
        toast: true,
        position: "top-right"
    })
})

socket.on('nuevoMensaje', (mensaje) => {
    divMensajes.innerHTML += `<br><div class='mensaje'><strong>${mensaje.emisor}</strong> dice <i>${mensaje.mensaje}</i></div>`

    divMensajes.scrollTop = divMensajes.scrollHeight;
})


socket.on('nuevoHeroe', (objeto) => {
    divMensajes.innerHTML += `<br>Se ha creado el heroe<strong> ${objeto.heroe.nombre}</strong>`
})

