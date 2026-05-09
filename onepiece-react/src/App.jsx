import { useState } from "react"
import Home from "./Home/index.jsx"
import Personagens from "./Personagens/index.jsx"
import Frutas from "./AkumaNoMi/index.jsx"
import Arcos from "./Arcos/index.jsx"
import "./App.css"

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
