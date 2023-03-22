import express from 'express';
import { webRouter } from './routers/webRouter.js';
import { apiRouter } from './routers/apiRouter.js';

const app = express();

app.use( (req, res, next) => {
    console.log(req.url);
    next();
})

app.use('/', webRouter)

app.use( (req, res, next) => {
    console.log('Pase web Router');
    next();
})
app.use('/api', apiRouter)

// console.log(webRouter);

const PORT = 8080
const server = app.listen(PORT, () => { console.log(`Escuchando en el puerto ${PORT}`); })