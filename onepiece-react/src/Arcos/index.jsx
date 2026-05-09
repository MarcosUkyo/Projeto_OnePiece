import { useState, useEffect } from "react"
import "./style.css"

function Arcos() {
  const [arcos, setArcos] = useState([])

  useEffect(() => {
    /* scroll ao entrar na página */
    window.scrollTo({ top: 0, behavior: "smooth" })

    fetch("https://api.api-onepiece.com/v2/sagas/en")
      .then((r) => r.json())
      .then((data) => setArcos(data))
      .catch(() => alert("Erro ao carregar arcos"))
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h1>🗺️ Arcos &amp; Sagas</h1>
        <p>Total: {arcos.length} sagas</p>
      </div>

      <div className="lista">
        {arcos.map((a) => (
          <div className="card card-arco" key={a.id}>
            <div className="arco-numero">Saga {a.saga_number}</div>
            <h2 className="arco-titulo">{a.title}</h2>
            <div className="arco-dados">
              <span>📖 Capítulos: {a.saga_chapitre}</span>
              <span>📚 Volumes: {a.saga_volume}</span>
              <span>📺 Episódios: {a.saga_episode}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Arcos