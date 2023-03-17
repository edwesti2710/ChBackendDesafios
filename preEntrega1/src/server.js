import express from "express";
import { apiRouter } from "./routers/apiRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080

app.use('/api', apiRouter)

const server = app.listen(PORT)