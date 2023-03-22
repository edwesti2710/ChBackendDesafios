import { Router } from 'express';

export const personasRouter = Router();
personasRouter.get('/', (req, res, next) => {
    // Middleware
    console.log('Entre  paersonasRouter y despues llega el get');
    next()
}
 ,(req, res) => { res.json({app: 'api/personas'}); });
personasRouter.post('/', (req, res) => { res.json({}); });
personasRouter.put('/', (req, res) => { res.json({}); });
personasRouter.delete('/', (req, res) => { res.json({}); });
