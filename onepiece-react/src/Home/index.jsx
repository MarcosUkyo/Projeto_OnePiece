import "./style.css"

function Home({ setPage }) {
  return (
    <div className="home-container">

      {/* HERO com a imagem de fundo */}
      <div className="home-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-pre">☠ Grand Line · New World ☠</p>
          <h1 className="hero-titulo">ONE PIECE</h1>
          <p className="hero-sub">
            Explore o universo de Monkey D. Luffy e a tripulação do Chapéu de Palha
            rumo ao maior tesouro do mundo.
          </p>
          <button className="hero-btn" onClick={() => setPage("personagens")}>
            Explorar Agora ⚓
          </button>
        </div>
      </div>

      {/* CARDS de navegação */}
      <div className="home-cards">
        <div className="home-card" onClick={() => setPage("personagens")}>
          <span className="card-icone">👤</span>
          <h2>Personagens</h2>
          <p>786 personagens do universo de One Piece</p>
        </div>

        <div className="home-card" onClick={() => setPage("frutas")}>
          <span className="card-icone">🍎</span>
          <h2>Akuma no Mi</h2>
          <p>Descubra as frutas do diabo e seus poderes</p>
        </div>

        <div className="home-card" onClick={() => setPage("arcos")}>
          <span className="card-icone">🗺️</span>
          <h2>Arcos & Sagas</h2>
          <p>Explore todas as sagas da série</p>
        </div>
      </div>

      {/* QUOTE */}
      <div className="home-quote">
        <blockquote>"People's dreams... never end!"</blockquote>
        <cite>— Marshall D. Teach (Barba Negra)</cite>
      </div>

    </div>
  )
}

export default Home