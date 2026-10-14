import { useState } from 'react'
import './Formulario.css'

function Formulario({ onSalvar, onCancelar }) {

    const [jogo, setJogo] = useState({
        titulo: '',
        plataforma: '',
        genero: '',
        nota: '',
        zerado: false
    })

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setJogo({...jogo, [name]: type === 'checkbox' ? checked : value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/jogos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jogo)
        })
        .then(response => response.json())
        .then(jogoSalvo => onSalvar(jogoSalvo))
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input type="text" className="form-control" id="titulo" name="titulo" value={jogo.titulo} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="plataforma" className="form-label">Plataforma</label>
                    <select id="plataforma" name="plataforma" className="form-select" value={jogo.plataforma} onChange={handleChange}>
                        <option value="">Selecione uma plataforma</option>
                        <option value="PS3">PlayStation 3</option>
                        <option value="PS4">PlayStation 4</option>
                        <option value="PS5">PlayStation 5</option>
                        <option value="Xbox 360">Xbox 360</option>
                        <option value="Xbox One">Xbox One</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="PC">PC</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="genero" className="form-label">Gênero</label>
                    <input type="text" className="form-control" id="genero" name="genero" value={jogo.genero} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="nota" className="form-label">Nota</label>
                    <input type="text" className="form-control" id="nota" name="nota" value={jogo.nota} onChange={handleChange} />
                </div>
                <div className="form-check mb-3">
                    <input type="checkbox" id="zerado" name="zerado" className="form-check-input" checked={jogo.zerado} onChange={handleChange} />
                    <label htmlFor="zerado" className="form-check-label">Zerado?</label>
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default Formulario