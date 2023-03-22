import { Router } from 'express';

export const webRouter = Router();

webRouter.use((req, res, next) => {
    console.log('Cargando webRouter');
    next()
})

webRouter.get('/', (req, res) => { res.send('<h1>Inicio</h1>'); });
webRouter.get('/personas', (req, res) => { res.send('<h1>Personas</h1>'); });
webRouter.get('/ventas', (req, res) => { res.send('<h1>Ventas</h1>'); });