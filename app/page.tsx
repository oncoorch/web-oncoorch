import { ContactForm } from '../components/ContactForm';
import { MotionController } from '../components/MotionController';

const modules = [
  ['01', 'Registro del Paciente', 'Una entrada unica, trazable y conectada para cada caso oncologico.'],
  ['02', 'Gestion Clinica', 'Planes, atencion y seguimiento longitudinal en una vista coherente.'],
  ['03', 'Ensayos Clinicos', 'Evaluacion y enrolamiento de pacientes con criterios visibles y seguros.'],
  ['04', 'Comite Multidisciplinario', 'Casos, evidencia y recomendaciones reunidos para decidir en equipo.'],
  ['05', 'Registro de Cancer', 'Datos validados para comprender incidencia, resultados y necesidades.'],
  ['06', 'Asistente Clinico IA', 'Evidencia contextual que apoya, sin reemplazar, el juicio clinico.'],
];

const engine = [
  ['01', 'Detectar', 'Senales y disparadores'],
  ['02', 'Comprender', 'Datos y contexto'],
  ['03', 'Decidir', 'Logica y evidencia'],
  ['04', 'Coordinar', 'Recursos y atencion'],
  ['∞', 'Aprender', 'Resultados y mejora'],
];

export default function HomePage() {
  return (
    <main>
      <MotionController />
      <a className="skip-link" href="#contenido">Ir al contenido</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Onco-Orch, inicio">
          <strong>ONCO-ORCH</strong>
          <span>ORQUESTACION CLINICA INTELIGENTE</span>
        </a>
        <nav aria-label="Navegacion principal">
          <a href="#solucion">Solucion</a>
          <a href="#modulos">Modulos</a>
          <a href="#impacto">Impacto</a>
          <a href="#proposito">Nuestra vision</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="site-header__actions">
          <a className="intranet" href="https://admin.oncoorch.com" rel="noopener noreferrer">Intranet</a>
          <a className="button button--small" href="https://app.oncoorch.com" rel="noopener noreferrer">Acceso clientes</a>
        </div>
      </header>

      <div id="contenido">
        <section className="hero" id="inicio">
          <div className="hero__copy reveal">
            <p className="eyebrow">ONCO-ORCH / INTELIGENCIA CLINICA EN MOVIMIENTO</p>
            <h1>Cada minuto cuenta.<br />Cada paso debe<br />estar conectado.</h1>
            <p className="hero__lead">Una plataforma inteligente que integra informacion, coordina decisiones y acompana a la persona desde la deteccion hasta la supervivencia.</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#solucion">Explorar la solucion</a>
              <a className="button button--ghost" href="#modulos">Conocer los 6 modulos</a>
            </div>
            <p className="trust-line">CENTRADO EN LA PERSONA · INTEROPERABLE · SEGURO · AUDITABLE</p>
          </div>
          <div className="hero__art reveal" aria-label="Red clinica conectada">
            <div className="hero__visual" aria-hidden="true">
              <span className="node node--one" />
              <span className="node node--two" />
              <span className="node node--three" />
              <span className="node node--four" />
              <span className="pulse" />
            </div>
            <div className="hero__art-caption"><span>Del conocimiento clinico</span><strong>a la inteligencia conectada.</strong></div>
          </div>
        </section>

        <section className="problem section" id="solucion">
          <p className="eyebrow reveal">EL PROBLEMA NO ES LA FALTA DE ESFUERZO. ES LA FRAGMENTACION.</p>
          <div className="problem__grid">
            <div className="reveal"><h2>Una persona no deberia perderse entre resultados, referencias y silencios.</h2><p>Onco-Orch convierte puntos aislados en un ciclo clinico continuo: detecta, interpreta, coordina y aprende sin apartar al profesional de la decision.</p></div>
            <ol className="journey reveal">
              <li><span>01</span><div><strong>Senal clinica</strong><p>Un hallazgo, sintoma o resultado activa el flujo correcto.</p></div></li>
              <li><span>02</span><div><strong>Decision conectada</strong><p>Datos, guias y contexto convergen en la siguiente accion.</p></div></li>
              <li><span>03</span><div><strong>Continuidad visible</strong><p>Cada derivacion, alerta y resultado permanece trazable.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="modules section" id="modulos">
          <div className="section-heading reveal"><h2>Seis modulos.<br />Un solo pulso clinico.</h2><p>Cada espacio resuelve una responsabilidad completa. Juntos convierten el continuo oncologico en una experiencia coordinada, medible y humana.</p></div>
          <div className="module-grid">{modules.map(([number, title, description]) => <article className="module-card reveal" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
        </section>

        <section className="engine section">
          <p className="eyebrow reveal">EL MOTOR DE ORQUESTACION</p>
          <h2 className="reveal">Del dato a la accion.<br />De la accion al aprendizaje.</h2>
          <p className="engine__lead reveal">Un ciclo cerrado combina reglas clinicas, guias, interoperabilidad y validacion humana para recomendar el siguiente paso y aprender de cada resultado.</p>
          <ol className="engine__flow">{engine.map(([number, title, detail], index) => <li className={`reveal engine-step engine-step--${index + 1}`} key={title}><span>{number}</span><div><strong>{title}</strong><small>{detail}</small></div></li>)}</ol>
        </section>

        <section className="impact section" id="impacto"><h2 className="reveal">Disenada para que el sistema<br />acompane, no interrumpa.</h2><div className="impact__grid"><article className="reveal"><span>CONTINUIDAD</span><p>El caso permanece visible desde la sospecha hasta el seguimiento.</p></article><article className="reveal"><span>DECISION</span><p>La evidencia llega al momento y al equipo que la necesita.</p></article><article className="reveal"><span>CAPACIDAD</span><p>La red puede comprender demanda, recursos y desempeno para mejorar.</p></article></div></section>

        <section className="purpose section" id="proposito"><p className="eyebrow reveal">NUESTRO PROPOSITO</p><h2 className="reveal">Tender un puente entre ciencia, datos, tecnologia y practica clinica.</h2><div className="purpose__grid"><article className="reveal"><span>MISION</span><p>Fortalecer la atencion, la toma de decisiones y las capacidades del sistema con soluciones basadas en evidencia.</p></article><article className="reveal"><span>VISION</span><p>Un futuro donde cada decision sea informada, oportuna, segura, equitativa y orientada a la calidad.</p></article></div></section>

        <section className="contact section" id="contacto"><div className="contact__copy reveal"><p className="eyebrow">CONVERSEMOS</p><h2>La proxima historia clinica mejor coordinada puede empezar aqui.</h2><p>Cuentenos sobre su red, institucion o desafio. Dejamos este espacio abierto mientras formalizamos nuestra identidad juridica.</p><div className="socials"><a href="https://facebook.com/oncoorch" rel="noopener noreferrer">Facebook</a><a href="https://instagram.com/oncoorch" rel="noopener noreferrer">Instagram</a><a href="https://x.com/oncoorch" rel="noopener noreferrer">X</a><span>@oncoorch</span><a href="https://tiktok.com/@oncomodo" rel="noopener noreferrer">TikTok @oncomodo</a></div></div><div className="reveal"><ContactForm /></div></section>
      </div>

      <footer><a className="brand" href="#inicio"><strong>ONCO-ORCH</strong></a><div><a href="https://app.oncoorch.com" rel="noopener noreferrer">Acceso clientes</a><a href="https://admin.oncoorch.com" rel="noopener noreferrer">Intranet</a></div><small>© 2026 Onco-Orch. Orquestacion clinica inteligente para el continuo oncologico.</small></footer>
    </main>
  );
}
