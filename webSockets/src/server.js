import express from 'express';
import { Server as SocketIOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import { PORT } from './config.js';
import { FileManager } from './FileManager.js';

const mensajesManager = new FileManager('./localStorage/mensajes.json');

const app = express();
app.engine('handlebars', engine());
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'));

const httpServer = app.listen(PORT, () => { console.log('Conexión a travéz del puerto ' + PORT) })

const io = new SocketIOServer(httpServer)


// Manejador/controlador de nuevos mensajes
io.on('connection', async clientSocket => {
    console.log(`Nuevo Cliente Conectado! socket id: ${clientSocket.id}`);

    clientSocket.on('nuevoMensaje', async mensaje => {
        console.table(mensaje)
        console.log(`datos recibidos del usuario: ${clientSocket.id}`)
        await mensajesManager.guardarCosa({
            fecha: new Date().toLocaleString(),
            ...mensaje
        })
        io.sockets.emit('actualizarMensajes', await mensajesManager.buscarCosas())
    })
    io.sockets.emit('actualizarMensajes', await mensajesManager.buscarCosas())
})


// Front End
app.get('/realtimeproducts', async (req, res) => {
    const mensajes = await mensajesManager.buscarCosas()
    // res.send('<h1>Nuevo Cliente</h1>')
    res.render('mensajes', {
        hayMensajes: mensajes.length > 0,
        mensajes
    })
})
