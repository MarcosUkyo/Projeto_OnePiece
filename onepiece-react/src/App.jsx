import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App(){
  return(
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Arcos">Arcos do Anime</Link>
        <Link to="/Personagens">Personagens</Link>
        <Link to="/AkumaNoMi">Akumas No mi</Link>
      </nav>

      <hr/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Arcos" element={<Arcos/>}/>
        <Route path="/Personagens" element={<Personagens/>}/>
        <Route path="/AkumaNoMi" element={<AkumaNoMi/>}/>
      </Routes>
    </div>
  )
}
export default App
