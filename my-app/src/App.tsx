//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
  <div className="site-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">Hiro Studio</div>
          <nav className="nav">
            <a href="#">Inicio</a>
            <a href="#">Resultados</a>
            <a href="#">Acerca De</a>
            <a href="#" className="cta">Iniciar Sesion</a>
          </nav>
        </div>
      </header>

      <main className="container hero">
        <section className="hero-text">
          <h1>
            Realza tu belleza,
            <br />
            <span className="accent">siéntete único</span>
          </h1>
          <p className="lead">
            En Hiro Studio ofrecemos tratamientos faciales y
             rutinas personalizadas para mantener tu piel sana, hidratada y hermosa.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#">Agenda cita</a>
            <a className="btn btn-ghost" href="#">Ver tratamientos</a>
          </div>
        </section>

        <section className="hero-media">
          <div className="media-wrap">
            <img src="https://tse4.mm.bing.net/th/id/OIP.OWdz9YZlvABA6MYYGiksTQHaFF?rs=1&pid=ImgDetMain&o=7&rm=3" alt="hero" />
          </div>
        </section>
      </main>
      </div>

    </>
  )
}

export default App
