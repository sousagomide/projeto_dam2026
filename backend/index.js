const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/jogos', async (req, res) => {
    const {titulo, plataforma, genero, nota, zerado} = req.body
    const resultado = await pool.query(
        'INSERT INTO catalogojogos (titulo, plataforma, genero, nota, zerado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [titulo, plataforma, genero, nota, zerado]
    )
    res.json(resultado.rows[0])
})

app.get('/jogos', async (req, res) => {
    const resultado = await pool.query('SELECT * FROM catalogojogos ORDER BY id')
    res.json(resultado.rows)
})

app.listen(3000, () => console.log('API rodando na porta 3000'))