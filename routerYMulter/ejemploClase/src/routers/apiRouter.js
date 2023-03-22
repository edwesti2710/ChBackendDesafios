import express, {Router} from 'express';
import { personasRouter } from './personasRouter.js';
import { ventasRouter } from './ventasRouter.js';

export const apiRouter = Router();

apiRouter.use((req, res, next) => {
    console.log('Cargando apiRouter');
    next()
})

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({extended: true}))

apiRouter.use('/personas', personasRouter);

apiRouter.use('/ventas', ventasRouter);