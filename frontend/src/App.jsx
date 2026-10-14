import { useState, useEffect } from 'react'
import './App.css'
import Cabecalho from './components/Cabecalho'
import Lista from './components/Lista'

function App() {
  const [jogos, setJogos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/jogos')
    .then(response => response.json())
    .then(dados => setJogos(dados))
  }, [])

  return (
    <>
      <Cabecalho />
      <Lista jogos={jogos} />
    </>
  )
}

export default App
