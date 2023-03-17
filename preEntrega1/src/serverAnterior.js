import express from 'express';
import { ProductManager } from './ProductManager.js';


const productManager = new ProductManager('./db/products.json')

const app = express();
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/products', async (req, res) => {
    const queryParams = req.query;
    const allProducts = await productManager.getProducts()
    const resultado = [];

    if (queryParams.limit) {
        console.log('limite detectado');
        for (let product = 0; product <= queryParams.limit - 1; product++) {
            if (allProducts[product]) {
                resultado.push(allProducts[product]);
            }
        }
        res.json(resultado);
    } else {
        console.log('sin limite');
        res.json(allProducts)
    }
})

app.get('/products/:pid', async (req, res) => {
    const idOfProduct = Number(req.params.pid)
    const product = await productManager.getProductByID(idOfProduct)

    if (isNaN(idOfProduct) || !product) {
        // Así le podrias enviar el codigo de estado al usuario, pero no es lo óptimo
        // res.json({ status: 400 , message: 'Este producto no existe' })
        // Lo ideal seria mandar el codigo de estado para que el navegador lo interprete:
        res.status(400).json({message: 'Este producto no existe' })
    } else {
        res.json(product)
    }

})


const server = app.listen(8080)