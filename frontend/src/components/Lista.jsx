import './Lista.css'

function Lista({ jogos }) {

    return (
        <div className="container">
            <div className="lista">
                <div className="lista-grade lista-cabecalho">
                    <span>TITULO</span>
                    <span>PLATAFORMA</span>
                    <span>GENERO</span>
                    <span className="text-center">NOTA</span>
                    <span className="text-center">ZERADO</span>
                    <span className="text-center">AÇÕES</span>
                </div>
                <div className="lista-corpo">
                    {jogos.map(e => (
                        <div key={e.id} className="lista-grade lista-linha">
                            <span>{e.titulo}</span>
                            <span>{e.plataforma}</span>
                            <span>{e.genero}</span>
                            <span className="text-center">{e.nota}</span>
                            <span className="text-center">
                                {e.zerado ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle"></i>}
                            </span>
                            <div className="d-flex justify-content-center gap-3">
                                <i className="bi bi-pencil"></i>
                                <i className="bi bi-trash"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Lista