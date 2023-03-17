import { Router } from 'express';

export const cartsRouter = Router();
cartsRouter.get('/', (req, res) => {
    res.send('<h1>API CARTS</h1>');
});
