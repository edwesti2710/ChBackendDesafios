console.log('Conectado xd');
const serverSocket = io('http://localhost:8081')


const btnEnviar = document.getElementById('btnEnviar')

btnEnviar.addEventListener('click', () => {
    const inputAutor = document.querySelector('#inputAutor')
    const inputMensaje = document.querySelector('#inputMensaje')

    if (inputAutor && inputMensaje) {
        const autor = inputAutor.value
        const mensaje = inputMensaje.value
        serverSocket.emit('nuevoMensaje', { autor, mensaje })
    }
    // alert('No me hagas clic pendejo!');
})

serverSocket.on('actualizarMensajes', mensajes => {
    const divMensajes = document.querySelector('#mensajes')
    if (divMensajes) {
        divMensajes.innerHTML = JSON.stringify(mensajes)
    }
})

