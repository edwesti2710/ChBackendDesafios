import { Router } from 'express';
import { ProductManager } from '../ProductManager.js';


const productManager = new ProductManager('./src/db/products.json')
export const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const queryParams = req.query;
    const allProducts = await productManager.getProducts()
    const resultado = [];

    if (queryParams.limit) {
        for (let product = 0; product <= queryParams.limit - 1; product++) {
            if (allProducts[product]) {
                resultado.push(allProducts[product]);
            }
        }
        res.json(resultado);
    } else {
        res.json(allProducts)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.json(newProduct)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const idOfProduct = req.params.pid
    const product = await productManager.getProductByID(idOfProduct)

    if (!idOfProduct || !product) {
        res.status(400).json({ error: error.message })
    } else {
        res.json(product)
    }

})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const newProps = await productManager.updateProduct(req.params.pid, req.body)
        res.json(newProps)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const deletedProduct = await productManager.deleteProduct(req.params.pid)
        res.json(deletedProduct)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})