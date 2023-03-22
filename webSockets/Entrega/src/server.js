import express from 'express';
import { Server as SocketIOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import { PORT } from './config.js';
import { ProductManager } from './ProductManager.js';

const productsManager = new ProductManager('./db/products.json');

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

    clientSocket.on('nuevoProducto', async producto => {
        console.table('Recibi el producto')
        console.log(`datos recibidos del usuario: ${clientSocket.id}`)
        await productsManager.addProduct(producto)
        io.sockets.emit('actualizarProductos', await productsManager.getProducts())
    })
    io.sockets.emit('actualizarProductos', await productsManager.getProducts())
})


// Front End
app.get('/realtimeproducts', async (req, res) => {
    const products = await productsManager.getProducts()
    console.log(products);
    // res.send('<h1>Nuevo Cliente</h1>')
    res.render('realTimeProducts', {
        hayProductos: products.length > 0,
        products
    })
})
