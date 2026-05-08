import { useState, useEffect } from "react"
import "./App.css"

/* ── PÁGINA: HOME ─────────────────────────────────── */
function Home({ setPage }) {
  return (
    <div className="home-container">
      <h1>☠ One Piece Wiki</h1>
      <p>Explore o universo de One Piece!</p>

      <div className="home-cards">
        <div className="home-card" onClick={() => setPage("personagens")}>
          <h2>👤 Personagens</h2>
          <p>Conheça os personagens do universo</p>
        </div>
        <div className="home-card" onClick={() => setPage("frutas")}>
          <h2>🍎 Akuma no Mi</h2>
          <p>Descubra as frutas do diabo</p>
        </div>
        <div className="home-card" onClick={() => setPage("arcos")}>
          <h2>🗺 Arcos</h2>
          <p>Explore as sagas da série</p>
        </div>
      </div>
    </div>
  )
}

/* ── PÁGINA: PERSONAGENS ──────────────────────────── */
function Personagens() {
  const [personagens, setPersonagens] = useState([])
  const [selecionado, setSelecionado] = useState(null)
  const [busca, setBusca] = useState("")

  useEffect(() => {
    fetch("https://api.api-onepiece.com/v2/characters/en")
      .then((res) => res.json())
      .then((data) => setPersonagens(data))
      .catch(() => alert("Erro ao carregar personagens"))
  }, [])

  const filtrados = personagens.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="container">
      <div className="header">
        <h1>👤 Personagens</h1>
        <p>Total: {personagens.length} personagens</p>
      </div>

      <input
        className="busca-input"
        type="text"
        placeholder="Buscar personagem..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {selecionado && (
        <div className="info-card">
          <button className="fechar-btn" onClick={() => setSelecionado(null)}>✕ Fechar</button>
          <h2>{selecionado.name}</h2>
          <p><strong>Função:</strong> {selecionado.job}</p>
          <p><strong>Status:</strong> {selecionado.status}</p>
          <p><strong>Idade:</strong> {selecionado.age}</p>
          <p><strong>Tamanho:</strong> {selecionado.size}</p>
          <p><strong>Recompensa:</strong> {selecionado.bounty} Berries</p>
          {selecionado.crew && <p><strong>Crew:</strong> {selecionado.crew.name}</p>}
          {selecionado.fruit && <p><strong>Akuma no Mi:</strong> {selecionado.fruit.name}</p>}
        </div>
      )}

      <div className="lista">
        {filtrados.map((p) => (
          <div className="card" key={p.id}>
            <p>{p.name}</p>
            <p className="card-sub">{p.job}</p>
            <button onClick={() => setSelecionado(p)}>Ver mais</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── PÁGINA: FRUTAS ───────────────────────────────── */
function Frutas() {
  const [frutas, setFrutas] = useState([])
  const [selecionada, setSelecionada] = useState(null)
  const [busca, setBusca] = useState("")

  useEffect(() => {
    fetch("https://api.api-onepiece.com/v2/fruits/en")
      .then((res) => res.json())
      .then((data) => setFrutas(data))
      .catch(() => alert("Erro ao carregar frutas"))
  }, [])

  const filtradas = frutas.filter((f) =>
    f.name.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="container">
      <div className="header">
        <h1>🍎 Akuma no Mi</h1>
        <p>Total: {frutas.length} frutas</p>
      </div>

      <input
        className="busca-input"
        type="text"
        placeholder="Buscar fruta..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {selecionada && (
        <div className="info-card">
          <button className="fechar-btn" onClick={() => setSelecionada(null)}>✕ Fechar</button>
          {selecionada.filename && (
            <img src={selecionada.filename} alt={selecionada.name} width="150" />
          )}
          <h2>{selecionada.name}</h2>
          <p><strong>Tipo:</strong> {selecionada.type}</p>
          <p><strong>Nome Japonês:</strong> {selecionada.roman_name}</p>
          <p><strong>Descrição:</strong> {selecionada.description}</p>
        </div>
      )}

      <div className="lista">
        {filtradas.map((f) => (
          <div className="card" key={f.id}>
            {f.filename && (
              <img src={f.filename} alt={f.name} width="60" height="60"
                style={{ objectFit: "contain" }}
              />
            )}
            <p>{f.name}</p>
            <p className="card-sub">{f.type}</p>
            <button onClick={() => setSelecionada(f)}>Ver mais</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── PÁGINA: ARCOS ────────────────────────────────── */
function Arcos() {
  const [arcos, setArcos] = useState([])

  useEffect(() => {
    fetch("https://api.api-onepiece.com/v2/sagas/en")
      .then((res) => res.json())
      .then((data) => setArcos(data))
      .catch(() => alert("Erro ao carregar arcos"))
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h1>🗺 Arcos & Sagas</h1>
        <p>Total: {arcos.length} sagas</p>
      </div>

      <div className="lista">
        {arcos.map((a) => (
          <div className="card card-arco" key={a.id}>
            <p className="arco-numero">Saga {a.saga_number}</p>
            <h2>{a.title}</h2>
            <p><strong>Capítulos:</strong> {a.saga_chapitre}</p>
            <p><strong>Volumes:</strong> {a.saga_volume}</p>
            <p><strong>Episódios:</strong> {a.saga_episode}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── APP PRINCIPAL ────────────────────────────────── */
function App() {
  const [page, setPage] = useState("home")

  return (
    <div>
      <nav className="navbar">
        <span className="nav-logo" onClick={() => setPage("home")}>☠ ONE PIECE</span>
        <div className="nav-links">
          <button className={page === "home"        ? "active" : ""} onClick={() => setPage("home")}>Home</button>
          <button className={page === "personagens" ? "active" : ""} onClick={() => setPage("personagens")}>Personagens</button>
          <button className={page === "frutas"      ? "active" : ""} onClick={() => setPage("frutas")}>Akuma no Mi</button>
          <button className={page === "arcos"       ? "active" : ""} onClick={() => setPage("arcos")}>Arcos</button>
        </div>
      </nav>

      {page === "home"        && <Home setPage={setPage} />}
      {page === "personagens" && <Personagens />}
      {page === "frutas"      && <Frutas />}
      {page === "arcos"       && <Arcos />}
    </div>
  )
}

export default App
