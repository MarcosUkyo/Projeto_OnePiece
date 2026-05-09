import { useState, useEffect } from "react"
import "./style.css"

/* ─── HELPERS ──────────────────────────────────────── */

/* Jikan usa formato "Sobrenome, Nome" → converte para "Nome Sobrenome" */
function formatarNome(nome) {
  if (!nome) return "—"
  const partes = nome.split(", ")
  return partes.length === 2 ? `${partes[1]} ${partes[0]}` : nome
}

function traduzirRole(role) {
  const mapa = { Main: "Principal", Supporting: "Secundário", Background: "Coadjuvante" }
  return mapa[role] || role || "—"
}

function corRole(role) {
  if (role === "Main")       return { bg: "rgba(239,68,68,0.15)",  cor: "#ef4444" }
  if (role === "Supporting") return { bg: "rgba(59,130,246,0.15)", cor: "#3b82f6" }
  return                            { bg: "rgba(100,116,139,0.15)",cor: "#94a3b8" }
}

/* ─── COMPONENTE ───────────────────────────────────── */
function Personagens() {
  const [lista,      setLista]      = useState([])
  const [detalhe,    setDetalhe]    = useState(null)
  const [loadLista,  setLoadLista]  = useState(true)
  const [loadDetail, setLoadDetail] = useState(false)
  const [busca,      setBusca]      = useState("")
  const [filtro,     setFiltro]     = useState("Todos")
  const [cache,      setCache]      = useState({})

  /* busca lista ao montar */
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime/21/characters")
      .then((r) => {
        if (!r.ok) throw new Error(r.status)
        return r.json()
      })
      .then((json) => {
        /* ordena por favoritos decrescente */
        const ordenados = (json.data || []).sort(
          (a, b) => (b.character.favorites || 0) - (a.character.favorites || 0)
        )
        setLista(ordenados)
      })
      .catch(() => alert("Erro ao carregar personagens. Tente recarregar a página."))
      .finally(() => setLoadLista(false))
  }, [])

  /* abre detalhe buscando dados extras da Jikan */
  function abrirDetalhe(item) {
    window.scrollTo({ top: 0, behavior: "smooth" })
    const id = item.character.mal_id

    /* usa cache se já buscou antes */
    if (cache[id]) {
      setDetalhe({ base: item, extra: cache[id] })
      return
    }

    setDetalhe({ base: item, extra: null })
    setLoadDetail(true)

    /* pequeno delay para respeitar rate limit da Jikan (3 req/s) */
    setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/characters/${id}`)
        .then((r) => {
          if (!r.ok) throw new Error(r.status)
          return r.json()
        })
        .then((json) => {
          const extra = json.data || {}
          setCache((prev) => ({ ...prev, [id]: extra }))
          setDetalhe((prev) => ({ ...prev, extra }))
        })
        .catch(() => {}) /* falha silenciosa — mostra dados básicos */
        .finally(() => setLoadDetail(false))
    }, 400)
  }

  function fecharDetalhe() {
    setDetalhe(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /* filtros */
  const roles = ["Todos", "Main", "Supporting"]

  const filtrados = lista.filter((item) => {
    const nome = formatarNome(item.character.name).toLowerCase()
    const matchBusca = nome.includes(busca.toLowerCase())
    const matchRole  = filtro === "Todos" || item.role === filtro
    return matchBusca && matchRole
  })

  /* ── RENDER ── */
  return (
    <div className="container">

      {/* CABEÇALHO */}
      <div className="header">
        <h1>👤 Personagens</h1>
        <p>Total: {lista.length} personagens carregados</p>
      </div>

      {/* BUSCA */}
      <input
        className="busca-input"
        type="text"
        placeholder="Buscar personagem..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* FILTRO POR PAPEL */}
      <div className="filtros-tipo">
        {roles.map((r) => {
          const { bg, cor } = corRole(r)
          return (
            <button
              key={r}
              className={`filtro-btn ${filtro === r ? "ativo" : ""}`}
              style={filtro === r && r !== "Todos" ? { borderColor: cor, color: cor, background: bg } : {}}
              onClick={() => setFiltro(r)}
            >
              {r === "Todos" ? "Todos" : traduzirRole(r)}
            </button>
          )
        })}
      </div>

      {/* CARD DE DETALHE */}
      {detalhe && (
        <div className="info-card">
          <button className="fechar-btn" onClick={fecharDetalhe}>✕ Fechar</button>

          <div className="detalhe-topo">

            {/* IMAGEM */}
            <div className="detalhe-img-wrap">
              <img
                src={
                  detalhe.extra?.images?.jpg?.image_url ||
                  detalhe.base.character.images?.jpg?.image_url ||
                  ""
                }
                alt={formatarNome(detalhe.base.character.name)}
                className="detalhe-img"
                onError={(e) => { e.target.src = ""; e.target.style.display = "none" }}
              />
            </div>

            {/* DADOS */}
            <div className="detalhe-dados">
              <h2>{formatarNome(detalhe.base.character.name)}</h2>

              {detalhe.extra?.name_kanji && (
                <p><strong>Nome japonês:</strong> {detalhe.extra.name_kanji}</p>
              )}

              {detalhe.extra?.nicknames?.length > 0 && (
                <p><strong>Apelidos:</strong> {detalhe.extra.nicknames.join(" · ")}</p>
              )}

              <p>
                <strong>Papel:</strong>{" "}
                <span
                  className="role-badge"
                  style={{
                    background: corRole(detalhe.base.role).bg,
                    color: corRole(detalhe.base.role).cor,
                  }}
                >
                  {traduzirRole(detalhe.base.role)}
                </span>
              </p>

              {detalhe.base.character.favorites > 0 && (
                <p>
                  <strong>Popularidade:</strong>{" "}
                  ♥ {detalhe.base.character.favorites.toLocaleString("pt-BR")} favoritos no MyAnimeList
                </p>
              )}

              {/* Dublador japonês */}
              {detalhe.base.voice_actors?.length > 0 && (() => {
                const jp = detalhe.base.voice_actors.find((v) => v.language === "Japanese")
                return jp ? (
                  <p><strong>Dublador (JP):</strong> {formatarNome(jp.person.name)}</p>
                ) : null
              })()}

              {/* Carregando detalhes */}
              {loadDetail && (
                <p className="load-text">⏳ Buscando detalhes…</p>
              )}

              {/* Bio */}
              {detalhe.extra?.about && (
                <div className="about-box">
                  <strong>Sobre:</strong>
                  <p>{detalhe.extra.about.slice(0, 500)}{detalhe.extra.about.length > 500 ? "…" : ""}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CARREGANDO LISTA */}
      {loadLista && (
        <div className="loading-msg">
          <span className="spinner-small" />
          <p>Carregando personagens…</p>
        </div>
      )}

      {/* LISTA */}
      {!loadLista && filtrados.length === 0 && (
        <p className="sem-resultado">Nenhum personagem encontrado.</p>
      )}

      <div className="lista">
        {filtrados.map((item) => {
          const { bg, cor } = corRole(item.role)
          return (
            <div className="card" key={item.character.mal_id}>

              <img
                src={item.character.images?.jpg?.small_image_url || item.character.images?.jpg?.image_url || ""}
                alt={formatarNome(item.character.name)}
                className="card-avatar"
                onError={(e) => { e.target.style.display = "none" }}
              />

              <div className="card-info">
                <p>{formatarNome(item.character.name)}</p>
                <p className="card-sub">{traduzirRole(item.role)}</p>
              </div>

              {item.character.favorites > 0 && (
                <span className="fav-count">♥ {item.character.favorites.toLocaleString("pt-BR")}</span>
              )}

              <span
                className="role-badge"
                style={{ background: bg, color: cor }}
              >
                {traduzirRole(item.role)}
              </span>

              <button onClick={() => abrirDetalhe(item)}>Ver mais</button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Personagens