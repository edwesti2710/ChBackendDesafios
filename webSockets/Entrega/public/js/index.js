console.log('Conectado xd');
const serverSocket = io('http://localhost:8080')

const btnEnviar = document.getElementById('btnEnviar')

btnEnviar.addEventListener('click', () => {
    const newProduct = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        price: document.querySelector('#price').value,
        status: document.querySelector('#status').value,
        category: document.querySelector('#category').value,
        // thumbnail: document.querySelector('#title').value || [],
        code: document.querySelector('#code').value,
        stock: document.querySelector('#stock').value
    }
    if (newProduct) {
        serverSocket.emit('nuevoProducto', newProduct)
    }
    for (const key in newProduct) {
        document.getElementById(key).value = ''
    }
})

serverSocket.on('actualizarProductos', productos => {
    const divProductos = document.querySelector('#productos')
    if (divProductos) {
        // divProductos.innerHTML = JSON.stringify(productos)
        console.log('Actualizacñion en tiempo real recibida');
    }
})

