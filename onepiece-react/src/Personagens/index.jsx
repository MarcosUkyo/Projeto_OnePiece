import { useState, useEffect } from "react"
import "./style.css"

/* ── TRADUÇÕES ── */
function traduzirStatus(status) {
  const mapa = {
    vivant: "Vivo",
    living: "Vivo",
    alive: "Vivo",
    mort: "Morto",
    dead: "Morto",
    unknown: "Desconhecido",
    inconnu: "Desconhecido",
  }
  return mapa[(status || "").toLowerCase()] || status || "—"
}

function traduzirCargo(job) {
  const mapa = {
    Captain: "Capitão",
    "Vice-Captain": "Vice-Capitão",
    Navigator: "Navegadora",
    Cook: "Cozinheiro",
    Sniper: "Atirador",
    Doctor: "Médico",
    Archaeologist: "Arqueóloga",
    Musician: "Músico",
    Helmsman: "Timoneiro",
    Shipwright: "Carpinteiro naval",
    "First mate": "Primeiro Imediato",
    Admiral: "Almirante",
    "Vice Admiral": "Vice-Almirante",
    Commander: "Comandante",
    Pirate: "Pirata",
    Marine: "Marinheiro",
    Warlord: "Shichibukai",
    Emperor: "Yonko",
    Empress: "Imperatriz",
    Swordsman: "Espadachim",
    Fighter: "Lutador",
    Assassin: "Assassino",
  }
  return mapa[job] || job || "—"
}

function formatarIdade(age) {
  if (!age) return "—"
  return age.replace(" ans", " anos").replace(" ans", " ano")
}

function formatarNomeCrew(crew) {
  if (!crew) return null
  // usa o roman_name (japonês) se disponível, senão o nome
  return crew.roman_name || crew.name || null
}

/* ── COMPONENTE ── */
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

      {/* DETALHE DO PERSONAGEM */}
      {selecionado && (
        <div className="info-card">
          <button className="fechar-btn" onClick={() => setSelecionado(null)}>
            ✕ Fechar
          </button>

          <h2>{selecionado.name}</h2>

          <p><strong>Cargo:</strong> {traduzirCargo(selecionado.job)}</p>
          <p><strong>Status:</strong> {traduzirStatus(selecionado.status)}</p>
          <p><strong>Idade:</strong> {formatarIdade(selecionado.age)}</p>
          <p><strong>Altura:</strong> {selecionado.size || "—"}</p>
          <p><strong>Aniversário:</strong> {selecionado.birthday || "—"}</p>
          <p><strong>Recompensa:</strong> {selecionado.bounty ? `${selecionado.bounty} Berries` : "Sem recompensa"}</p>

          {selecionado.crew && (
            <p><strong>Tripulação:</strong> {formatarNomeCrew(selecionado.crew)}</p>
          )}

          {selecionado.fruit && (
            <div className="fruta-destaque">
              <p><strong>🍎 Akuma no Mi:</strong> {selecionado.fruit.name}</p>
              <p className="fruta-tipo">{selecionado.fruit.type}</p>
              {selecionado.fruit.filename && (
                <img
                  src={selecionado.fruit.filename}
                  alt={selecionado.fruit.name}
                  width="100"
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* LISTA */}
      <div className="lista">
        {filtrados.map((p) => (
          <div className="card" key={p.id}>
            <div className="card-info">
              <p>{p.name}</p>
              <p className="card-sub">{traduzirCargo(p.job)}</p>
            </div>
            <span className={`status-badge status-${(p.status || "").toLowerCase()}`}>
              {traduzirStatus(p.status)}
            </span>
            <button onClick={() => setSelecionado(p)}>Ver mais</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Personagens
