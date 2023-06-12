let pHorario = document.getElementById('horario');
let socket = io()

// HORARIO
socket.on('actualizarHorario', (horario) => {
    console.log('Escuchando Desde el Horario pa');

    pHorario.innerHTML = horario;
})
