import { Router } from 'express';
import { CartManager } from '../CartManager.js';

const cartManager = new CartManager('./src/db/carts.json')

export const cartsRouter = Router();


cartsRouter.get('/', async (req, res) => {
    const queryParams = req.query;
    const allCarts = await cartManager.getCarts()
    const resultado = [];

    if (queryParams.limit) {
        for (let product = 0; product <= queryParams.limit - 1; product++) {
            if (allProducts[product]) {
                resultado.push(allProducts[product]);
            }
        }
        res.json(resultado);
    } else {
        res.json(allCarts)
    }
})

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart(req.body)
        res.json(newCart)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const cartId = req.params.cid
    try {
        const cart = await cartManager.getCartByID(cartId)
        res.json(cart.products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    console.log(cartId);
    const productId = req.params.pid
    console.log(productId);
    try {
        const newProds = await cartManager.addProductsToCart(cartId, req.body, productId)
        res.json(newProds)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

// cartsRouter.delete('/:pid', async (req, res) => {
//     try {
//         const deletedProduct = await productManager.deleteProduct(req.params.pid)
//         res.json(deletedProduct)
//     } catch (error) {
//         res.status(404).json({ error: error.message })
//     }
// })