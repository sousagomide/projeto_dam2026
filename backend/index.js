const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()

app.use(cors())
app.use(express.json())

// Cadastra um novo registro
app.post('/jogos', async (req, res) => {
    const {titulo, plataforma, genero, nota, zerado} = req.body
    const resultado = await pool.query(
        'INSERT INTO catalogojogos (titulo, plataforma, genero, nota, zerado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [titulo, plataforma, genero, nota, zerado]
    )
    res.json(resultado.rows[0])
})

// Lista todos os registros
app.get('/jogos', async (req, res) => {
    const resultado = await pool.query('SELECT * FROM catalogojogos ORDER BY id')
    res.json(resultado.rows)
})

// Busca um registro pelo id
app.get('/jogos/:id', async (req, res) => {
    const {id} = req.params
    const resultado = await pool.query('SELECT * FROM catalogojogos WHERE id = $1', [id])
    res.json(resultado.rows[0])
})

// Altera um registro existente
app.put('/jogos/:id', async (req, res) => {
    const {id} = req.params
    const {titulo, plataforma, genero, nota, zerado} = req.body
    const resultado = await pool.query(
        'UPDATE catalogojogos SET titulo = $1, plataforma = $2, genero = $3, nota = $4, zerado = $5 WHERE id = $6 RETURNING *',
        [titulo, plataforma, genero, nota, zerado, id]
    )
    res.json(resultado.rows[0])
})

// Exclui um registro
app.delete('/jogos/:id', async (req, res) => {
    const {id} = req.params
    const resultado = await pool.query('DELETE FROM catalogojogos WHERE id = $1', [id])
    res.json(resultado.rows[0])
})

app.listen(3000, () => console.log('API rodando na porta 3000'))