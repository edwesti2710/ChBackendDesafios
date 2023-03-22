import express from 'express';
import { ProductManager } from './ProductManager.js';
const productManager = new ProductManager('./db/products.json')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    const allProducts = await productManager.getProducts()
    res.json(allProducts)
})
app.get('/products/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductByID(req.params.pid)
        res.json(product)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})
app.post('/products', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.json(newProduct)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})
app.put('/products/:pid', async (req, res) => {
    try {
        const newProps = await productManager.updateProduct(Number(req.params.pid), req.body)
        res.json(newProps)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

app.delete('/products/:pid', async (req, res) => {
    try {
        const deletedProduct = await productManager.deleteProduct(Number(req.params.pid))
        res.json(deletedProduct)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

const server = app.listen(8081)