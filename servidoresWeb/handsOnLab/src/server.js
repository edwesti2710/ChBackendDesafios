import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frase = 'Frase Inicial'
app.get('/api/frase', async (req, res) => {
    res.json({ frase: frase })
    console.log(req.query);
})

app.get('/api/palabras/:pos', async (req, res) => {
    const splitted = frase.split(' ')
    res.json({ buscada: splitted[req.params.pos - 1] })
})

app.post('/api/palabras', async (req, res) => {
    console.log(req.body.palabra);
    const newFrase = `${frase} ${req.body.palabra}`
    const splitted = newFrase.split(' ')
    const wordIndex = splitted.findIndex(word => word === req.body.palabra)
    res.json({ agregada: req.body.palabra, pos: wordIndex + 1, frase: newFrase })
})

app.put('/api/palabras/:pos', async (req, res) => {
    const pos = req.params.pos
    const arrayNewFrase = frase.split(' ')
    const oldWord = splitted[pos - 1]
    const newWord = req.body.palabra
    arrayNewFrase[pos - 1] = newWord
    const newFrase = arrayNewFrase.join(' ')
    res.json({ actualizada: newWord, anterior: oldWord, frase: frase, nuevaFrase: newFrase })
})
app.delete('/api/palabras/:pos', async (req, res) => {
    const pos = req.params.pos;
    const arrayNewFrase = frase.split(' ')
    arrayNewFrase.splice(pos - 1, 1)
    const newFrase = arrayNewFrase.join(' ')
    res.json({oldfrase: frase, frase: newFrase})
})
const server = app.listen(8080)
