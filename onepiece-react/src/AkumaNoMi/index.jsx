import { useState, useEffect } from "react"
import "./style.css"

function traduzirTipo(tipo) {
  const mapa = {
    Paramecia: "Paramecia",
    Logia: "Logia",
    Zoan: "Zoan",
    "Zoan Mythique": "Zoan Mítico",
    "Zoan Ancient": "Zoan Antigo",
    "Zoan ancienne": "Zoan Antigo",
    "Zoan mythique": "Zoan Mítico",
  }
  return mapa[tipo] || tipo || "—"
}

function corTipo(tipo) {
  if (!tipo) return "#64748b"
  const t = tipo.toLowerCase()
  if (t.includes("logia"))              return "#f59e0b"
  if (t.includes("mythique") || t.includes("mítico")) return "#8b5cf6"
  if (t.includes("ancienne") || t.includes("antigo")) return "#10b981"
  if (t.includes("zoan"))               return "#22c55e"
  if (t.includes("paramecia"))          return "#3b82f6"
  return "#64748b"
}

function Frutas() {
  const [frutas,     setFrutas]     = useState([])
  const [selecionada, setSelecionada] = useState(null)
  const [busca,      setBusca]      = useState("")
  const [filtroTipo, setFiltroTipo] = useState("Todos")

  useEffect(() => {
    fetch("https://api.api-onepiece.com/v2/fruits/en")
      .then((res) => res.json())
      .then((data) => setFrutas(data))
      .catch(() => alert("Erro ao carregar frutas"))
  }, [])

  const tipos = ["Todos", ...new Set(frutas.map((f) => f.type).filter(Boolean))]

  const filtradas = frutas.filter((f) => {
    const matchBusca = f.name.toLowerCase().includes(busca.toLowerCase())
    const matchTipo  = filtroTipo === "Todos" || f.type === filtroTipo
    return matchBusca && matchTipo
  })

  return (
    <div className="container">
      <div className="header">
        <h1>🍎 Akuma no Mi</h1>
        <p>Total: {frutas.length} frutas catalogadas</p>
      </div>

      <input
        className="busca-input"
        type="text"
        placeholder="Buscar fruta..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* FILTRO POR TIPO */}
      <div className="filtros-tipo">
        {tipos.map((t) => (
          <button
            key={t}
            className={`filtro-btn ${filtroTipo === t ? "ativo" : ""}`}
            style={
              filtroTipo === t && t !== "Todos"
                ? { borderColor: corTipo(t), color: corTipo(t), background: corTipo(t) + "20" }
                : {}
            }
            onClick={() => setFiltroTipo(t)}
          >
            {traduzirTipo(t)}
          </button>
        ))}
      </div>

      {/* DETALHE */}
      {selecionada && (
        <div className="info-card">
          <button className="fechar-btn" onClick={() => setSelecionada(null)}>✕ Fechar</button>
          {selecionada.filename && (
            <img src={selecionada.filename} alt={selecionada.name} width="140" />
          )}
          <h2>{selecionada.name}</h2>
          {selecionada.roman_name && (
            <p><strong>Nome japonês:</strong> {selecionada.roman_name}</p>
          )}
          <p>
            <strong>Tipo:</strong>{" "}
            <span
              className="tipo-tag"
              style={{
                background: corTipo(selecionada.type) + "20",
                color: corTipo(selecionada.type),
              }}
            >
              {traduzirTipo(selecionada.type)}
            </span>
          </p>
          {selecionada.description && (
            <p><strong>Descrição:</strong> {selecionada.description}</p>
          )}
        </div>
      )}

      {/* LISTA */}
      <div className="lista">
        {filtradas.map((f) => (
          <div className="card" key={f.id}>
            {f.filename && (
              <img
                src={f.filename}
                alt={f.name}
                className="fruta-mini"
                onError={(e) => { e.target.style.display = "none" }}
              />
            )}
            <div className="card-info">
              <p>{f.name}</p>
              {f.roman_name && <p className="card-sub">{f.roman_name}</p>}
            </div>
            {f.type && (
              <span
                className="tipo-tag"
                style={{ background: corTipo(f.type) + "20", color: corTipo(f.type) }}
              >
                {traduzirTipo(f.type)}
              </span>
            )}
            <button onClick={() => setSelecionada(f)}>Ver mais</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Frutas