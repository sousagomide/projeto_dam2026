import { useState, useEffect } from 'react'
import './App.css'
import Cabecalho from './components/Cabecalho'
import Lista from './components/Lista'
import Formulario from './components/Formulario'

function App() {
  const [jogos, setJogos] = useState([])
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/jogos')
    .then(response => response.json())
    .then(dados => setJogos(dados))
  }, [])

  function adicionarJogo(novoJogo) {
    setJogos([...jogos, novoJogo])
    setMostrarForm(false)
  }

  return (
    <>
      <Cabecalho />
      {mostrarForm ? (
        <Formulario onCancelar={() => setMostrarForm(false)} onSalvar={adicionarJogo}/>
      ) : (
        <>
          <div className="container text-end botao">
            <button className="btn btn-primary" onClick={() => setMostrarForm(true)}>Adicionar Jogo</button>
          </div>
          <Lista jogos={jogos} />  
        </>
      )}
    </>
  )
}

export default App
