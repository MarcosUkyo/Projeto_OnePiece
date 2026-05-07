import { useState } from "react"
import "./style.css"

const AkumaList = [
  { id: 1, nome: "Gum-Gum Fruit" },
  { id: 2, nome: "Fruit of Fragmentation" },
  { id: 3, nome: "Fruit Glisse-Glisse" },
  { id: 4, nome: "Kilo-Kilo Fruit" },
  { id: 5, nome: "Fruit Boum-Boum" }
]

function AkumaNoMi() {
  const [akumaGlobal, setAkumaGlobal] = useState(null)

  const getAkumaData = (idAkumaNoMi) => {

    const uri = `https://api.api-onepiece.com/v2/fruits/en/${idAkumaNoMi}`

    fetch(uri)
      .then((res) => res.json())
      .then((json) => {

        const akumaFetch = {
          nome: json.name,
          descricao: json.description,
          tipo: json.type,
          imagem: json.filename
        }

        setAkumaGlobal(akumaFetch)

        console.log(akumaFetch)
      })
      .catch(() => {
        alert("Não foi possível acessar os dados da Akuma no Mi")
      })
  }

  return (
    <div className="container">

      <div className="header">
        <h1>Lista de Akuma no Mi</h1>
        <p>Faça a sua escolha!</p>
      </div>

      {akumaGlobal && (
        <div className="pokemon-info">

          <h2>Nome: {akumaGlobal.nome}</h2>

          <p>
            <strong>Tipo:</strong> {akumaGlobal.tipo}
          </p>

          <p>
            <strong>Descrição:</strong> {akumaGlobal.descricao}
          </p>

          <img
            src={akumaGlobal.imagem}
            alt={akumaGlobal.nome}
            width="200"
          />
        </div>
      )}

      {AkumaList.map((item) => (
        <div className="card" key={item.id}>

          <p>{item.nome}</p>

          <button onClick={() => getAkumaData(item.id)}>
            Saiba mais
          </button>

        </div>
      ))}

    </div>
  )
}

export default AkumaNoMi